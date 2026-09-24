"use client";

import { useState, type FormEvent } from "react";
import { HudCard } from "@/components/ui/HudCard";

const inputClass =
  "w-full rounded border border-cyan/20 bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none transition-all focus:border-cyan focus:shadow-[0_0_16px_-4px_rgb(34_211_238/0.5)]";

const labelClass = "mb-2 block font-mono text-xs uppercase tracking-wider text-cyan";

/**
 * Formulario visual sin backend: no envía ni almacena datos.
 * Al enviarlo solo muestra un aviso en pantalla.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <HudCard className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Tu nombre"
              className={inputClass}
              onChange={() => setSubmitted(false)}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className={inputClass}
              onChange={() => setSubmitted(false)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Asunto
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="¿De qué quieres hablar?"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Escribe tu mensaje..."
            className={`${inputClass} resize-none`}
            onChange={() => setSubmitted(false)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded border border-cyan bg-cyan/10 px-6 py-3 font-mono text-sm uppercase tracking-wider text-cyan transition-all hover:bg-cyan hover:text-void hover:shadow-[0_0_24px_rgb(34_211_238/0.5)]"
        >
          Enviar mensaje
        </button>

        <p role="status" aria-live="polite" className="min-h-5 text-center font-mono text-xs">
          {submitted ? (
            <span className="text-violet">
              Formulario de demostración: el envío de mensajes aún no está habilitado.
            </span>
          ) : (
            <span className="text-muted/60">
              Este formulario es solo visual y no almacena información.
            </span>
          )}
        </p>
      </form>
    </HudCard>
  );
}
