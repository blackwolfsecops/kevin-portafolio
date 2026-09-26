"use client";

import { useState, type FormEvent } from "react";
import { HudCard } from "@/components/ui/HudCard";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact";

const inputClass =
  "w-full rounded border border-cyan/20 bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none transition-all focus:border-cyan focus:shadow-[0_0_16px_-4px_rgb(34_211_238/0.5)] disabled:opacity-60 aria-[invalid=true]:border-red-400/60";

const labelClass = "mb-2 block font-mono text-xs uppercase tracking-wider text-cyan";

type Status = "idle" | "sending" | "success" | "error";

const GENERIC_ERROR = "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.";

/** Formulario de contacto: envía los datos a /api/contact, que usa Resend en el servidor. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  const sending = status === "sending";

  function clearFieldError(field: ContactField) {
    if (status === "success" || status === "error") setStatus("idle");
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (response.ok && result?.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      setStatus("error");
      if (result && !result.ok) {
        setErrorMessage(result.error);
        setFieldErrors(result.fields ?? {});
      } else {
        setErrorMessage(GENERIC_ERROR);
      }
    } catch {
      setStatus("error");
      setErrorMessage("No hay conexión. Revisa tu red e inténtalo de nuevo.");
    }
  }

  const fieldProps = (field: ContactField) => ({
    id: field,
    name: field,
    disabled: sending,
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
    onChange: () => clearFieldError(field),
    className: inputClass,
  });

  const fieldError = (field: ContactField) =>
    fieldErrors[field] && (
      <p id={`${field}-error`} className="mt-1.5 text-xs text-red-400">
        {fieldErrors[field]}
      </p>
    );

  return (
    <HudCard className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5" aria-busy={sending}>
        {/* Campo trampa anti-spam: oculto para personas y excluido del autocompletado. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={HONEYPOT_FIELD}>No completar este campo</label>
          <input
            id={HONEYPOT_FIELD}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            data-1p-ignore
            data-lpignore="true"
            data-bwignore
            data-form-type="other"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nombre
            </label>
            <input
              {...fieldProps("name")}
              type="text"
              required
              minLength={CONTACT_LIMITS.name.min}
              maxLength={CONTACT_LIMITS.name.max}
              autoComplete="name"
              placeholder="Tu nombre"
            />
            {fieldError("name")}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Correo
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              required
              maxLength={CONTACT_LIMITS.email.max}
              autoComplete="email"
              placeholder="tu@correo.com"
            />
            {fieldError("email")}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Asunto
          </label>
          <input
            {...fieldProps("subject")}
            type="text"
            maxLength={CONTACT_LIMITS.subject.max}
            placeholder="¿De qué quieres hablar?"
          />
          {fieldError("subject")}
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Mensaje
          </label>
          <textarea
            {...fieldProps("message")}
            required
            rows={5}
            minLength={CONTACT_LIMITS.message.min}
            maxLength={CONTACT_LIMITS.message.max}
            placeholder="Escribe tu mensaje..."
            className={`${inputClass} resize-none`}
          />
          {fieldError("message")}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="flex w-full items-center justify-center gap-3 rounded border border-cyan bg-cyan/10 px-6 py-3 font-mono text-sm uppercase tracking-wider text-cyan transition-all hover:bg-cyan hover:text-void hover:shadow-[0_0_24px_rgb(34_211_238/0.5)] disabled:cursor-wait disabled:hover:bg-cyan/10 disabled:hover:text-cyan disabled:hover:shadow-none"
        >
          {sending && (
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-cyan/30 border-t-cyan"
            />
          )}
          {sending ? "Enviando..." : "Enviar mensaje"}
        </button>

        <p role="status" aria-live="polite" className="min-h-5 text-center font-mono text-xs">
          {status === "success" && (
            <span className="text-cyan">
              Mensaje enviado correctamente. Gracias por escribir, te responderé pronto.
            </span>
          )}
          {status === "error" && <span className="text-red-400">{errorMessage}</span>}
        </p>
      </form>
    </HudCard>
  );
}
