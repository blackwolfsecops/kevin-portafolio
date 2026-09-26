export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { max: 150 },
  message: { min: 10, max: 5000 },
} as const;

/**
 * Nombre del campo trampa anti-spam. Debe ser neutro: nombres como "website",
 * "url" o "company" los rellena el autocompletado del navegador.
 */
export const HONEYPOT_FIELD = "hp_check";

export type ContactField ="name" | "email" | "subject" | "message";

export type ContactInput = Record<ContactField, string>;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fields?: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Caracteres de control (incluye saltos de línea) no permitidos en campos de una línea.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Valida y normaliza los datos del formulario. Se usa en el servidor. */
export function validateContact(
  raw: unknown,
): { ok: true; data: ContactInput } | { ok: false; fields: ContactFieldErrors } {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const data: ContactInput = {
    name: asTrimmedString(body.name),
    email: asTrimmedString(body.email).toLowerCase(),
    subject: asTrimmedString(body.subject),
    message: asTrimmedString(body.message),
  };

  const fields: ContactFieldErrors = {};
  const { name, email, subject, message } = CONTACT_LIMITS;

  if (data.name.length < name.min || data.name.length > name.max) {
    fields.name = `El nombre debe tener entre ${name.min} y ${name.max} caracteres.`;
  } else if (CONTROL_CHARS.test(data.name)) {
    fields.name = "El nombre contiene caracteres no válidos.";
  }

  if (!data.email || data.email.length > email.max || !EMAIL_PATTERN.test(data.email)) {
    fields.email = "Ingresa un correo electrónico válido.";
  }

  if (data.subject.length > subject.max) {
    fields.subject = `El asunto no puede superar ${subject.max} caracteres.`;
  } else if (CONTROL_CHARS.test(data.subject)) {
    fields.subject = "El asunto contiene caracteres no válidos.";
  }

  if (data.message.length < message.min || data.message.length > message.max) {
    fields.message = `El mensaje debe tener entre ${message.min} y ${message.max} caracteres.`;
  }

  return Object.keys(fields).length > 0 ? { ok: false, fields } : { ok: true, data };
}
