export type NavItem = {
  id: string;
  label: string;
};

export type TechGroup = {
  title: string;
  code: string;
  items: string[];
};

export type ProjectStatus = "online" | "pending";

export type Project = {
  name: string;
  code: string;
  description: string;
  features: string[];
  url?: string;
  status: ProjectStatus;
};

export type EducationItem = {
  title: string;
  institution?: string;
  description: string;
  status: string;
};

export const profile = {
  name: "Kevin Sequeira",
  role: "Desarrollador de aplicaciones y estudiante de ciberseguridad",
  summary:
    "Creo soluciones útiles, seguras y fáciles de usar: aplicaciones web pensadas para resolver problemas reales, con atención al detalle en la experiencia del usuario y en la protección de la información.",
};

export const navItems: NavItem[] = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "proyectos", label: "Proyectos" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];

export const about = {
  paragraphs: [
    "Mi perfil combina dos áreas que se complementan: el desarrollo de software y la ciberseguridad. Construyo aplicaciones web modernas y, al mismo tiempo, me formo para entender cómo se protegen, se monitorean y se defienden los sistemas.",
    "Esta visión híbrida me permite diseñar productos considerando la seguridad desde el inicio: control de accesos, autenticación, trazabilidad de la actividad y respaldos, sin sacrificar la claridad ni la facilidad de uso.",
    "Me interesa seguir creciendo en ambos campos, aprendiendo de forma constante y aplicando lo aprendido en proyectos propios.",
  ],
  pillars: [
    {
      title: "Desarrollo",
      description:
        "Aplicaciones web con Next.js, React y TypeScript, conectadas a bases de datos y desplegadas en la nube.",
    },
    {
      title: "Seguridad",
      description:
        "Formación en análisis de redes, monitoreo y administración de entornos Windows y Linux.",
    },
    {
      title: "Experiencia de usuario",
      description:
        "Interfaces limpias y claras, pensadas para que cualquier persona pueda usarlas sin fricción.",
    },
  ],
};

export const techGroups: TechGroup[] = [
  {
    title: "Desarrollo web",
    code: "DEV",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Datos y nube",
    code: "DATA",
    items: ["Supabase", "PostgreSQL", "Vercel", "Git"],
  },
  {
    title: "Sistemas",
    code: "SYS",
    items: ["Windows", "Linux", "PowerShell", "Active Directory"],
  },
  {
    title: "Ciberseguridad",
    code: "SEC",
    items: ["Nmap", "Wireshark", "Security Onion"],
  },
];

export const projects: Project[] = [
  {
    name: "Nexus Control Center",
    code: "NXS-01",
    description:
      "Plataforma privada para controlar aplicaciones, monitoreo, actividad, MFA y respaldos.",
    features: ["Aplicaciones", "Monitoreo", "Actividad", "MFA", "Respaldos"],
    url: "https://nexus-control-center-nine.vercel.app",
    status: "online",
  },
  {
    name: "CyberTwin",
    code: "CTW-02",
    description:
      "Plataforma de seguridad y exposición empresarial con activos, controles, incidentes, auditoría, remediación y simulador seguro.",
    features: [
      "Activos",
      "Controles",
      "Incidentes",
      "Auditoría",
      "Remediación",
      "Simulador seguro",
    ],
    status: "pending",
  },
  {
    name: "TurnoFácil",
    code: "TRF-03",
    description:
      "Plataforma de gestión de suscripciones y pagos manuales.",
    features: ["Suscripciones", "Pagos manuales"],
    status: "pending",
  },
];

export const education: EducationItem[] = [
  {
    title: "Analista Junior de Ciberseguridad",
    description:
      "Formación orientada al análisis de seguridad, monitoreo de redes y respuesta ante incidentes.",
    status: "En curso",
  },
  {
    title: "Cursos de Cisco",
    institution: "Cisco",
    description:
      "Cursos de redes y seguridad como complemento a la formación en ciberseguridad.",
    status: "En curso",
  },
];
