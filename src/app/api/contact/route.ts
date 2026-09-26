import { Resend } from "resend";
import { HONEYPOT_FIELD, validateContact, type ContactResponse } from "@/lib/contact";

// Tamaño máximo aceptado del cuerpo de la petición (bytes).
const MAX_BODY_BYTES = 16 * 1024;

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Faltan variables de entorno: RESEND_API_KEY, CONTACT_EMAIL o RESEND_FROM_EMAIL.",
    );
    return json({ ok: false, error: "El servicio de contacto no está disponible." }, 503);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Formato de petición no válido." }, 415);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "El mensaje es demasiado grande." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, error: "Formato de petición no válido." }, 400);
  }

  // Campo trampa: los usuarios reales no lo ven; si viene con datos, se descarta.
  // Nunca se responde como éxito: solo hay éxito cuando Resend confirma el envío.
  const honeypot = (payload as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    console.warn(`[contact] Envío descartado: el campo trampa "${HONEYPOT_FIELD}" llegó con datos.`);
    return json({ ok: false, error: "No se pudo enviar el mensaje." }, 400);
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return json(
      { ok: false, error: "Revisa los campos marcados.", fields: result.fields },
      422,
    );
  }

  const { name, email, subject, message } = result.data;

  const sendFailed = () =>
    json(
      { ok: false, error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde." },
      502,
    );

  let emailId: string;
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portafolio: ${subject || `Mensaje de ${name}`}`,
      // Solo texto plano: evita inyectar HTML con el contenido del visitante.
      text: [
        "Nuevo mensaje desde el formulario del portafolio.",
        "",
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Asunto: ${subject || "(sin asunto)"}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    if (error) {
      // error solo contiene name, message y statusCode; nunca la API key.
      console.error(
        `[contact] Resend rechazó el envío (status ${error.statusCode ?? "?"}, ${error.name}): ${error.message}`,
      );
      return sendFailed();
    }

    if (!data?.id) {
      console.error("[contact] Resend no devolvió error pero tampoco un id de correo; se trata como fallo.");
      return sendFailed();
    }

    emailId = data.id;
  } catch (err) {
    console.error(
      "[contact] Error inesperado al llamar a Resend:",
      err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    );
    return sendFailed();
  }

  console.info(`[contact] Correo aceptado por Resend. id=${emailId}`);
  return json({ ok: true }, 200);
}
