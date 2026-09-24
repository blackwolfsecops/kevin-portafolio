import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  return (
    <Section id="contacto">
      <SectionHeading
        index="05"
        title="Contacto"
        subtitle="¿Tienes una idea, un proyecto o una propuesta? Déjame un mensaje."
      />

      <div className="mx-auto max-w-2xl">
        <ContactForm />
      </div>
    </Section>
  );
}
