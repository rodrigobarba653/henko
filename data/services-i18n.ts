import { Language } from "./i18n";

export interface Service {
  slug: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  headline: string;
  description: string;
  sectionTitle: string;
  items: Array<{
    title: string;
    description: string;
    bulletPoints?: Array<{
      label: string;
      icon?: string;
    }>;
    personalization?: {
      heading: string;
      description: string;
      bulletPoints: Array<{
        label: string;
        icon: string;
      }>;
    };
  }>;
}

export const servicesTranslations: Record<Language, Service[]> = {
  en: [
    {
      slug: "biohacking",
      heading: "Biohacking (Recovery)",
      subheading: "Science-Backed Restoration",
      imageUrl: "/images/biohacking.jpg",
      headline: "Recalibrate Your System.",
      description:
        "Performance is only as good as your recovery. Our Recovery Lab uses medical-grade technology to reduce inflammation, boost mitochondrial health, and reset your nervous system.",
      sectionTitle: "The Rituals",
      items: [
        {
          title: "Cold Plunge",
          description:
            "Forge mental resilience and trigger metabolic health through controlled thermal shock.",
        },
        {
          title: "Infrared Sauna",
          description:
            "Detoxify at a cellular level and improve cardiovascular health with deep-penetrating heat.",
        },
        {
          title: "Hyperbaric Chamber",
          description:
            "Saturate your body with pure oxygen to accelerate tissue repair and cognitive function.",
        },
        {
          title: "Compression Therapy",
          description:
            "Flush out toxins and improve lymphatic drainage with precision air-pressure technology.",
        },
      ],
    },
    {
      slug: "fitness",
      heading: "Fitness",
      subheading: "Mindful Movement, Powerful Results",
      imageUrl: "/images/fitness.jpg",
      headline: "Strength in Intent.",
      description:
        "Forget the grind. Our classes are designed to build a body that is as functional as it is aesthetic. Guided by elite instructors, we focus on alignment, breath, and sustainable power.",
      sectionTitle: "The Disciplines",
      items: [
        {
          title: "Yoga",
          description:
            "Flow with purpose. Balance strength and flexibility while grounding your energy.",
        },
        {
          title: "Pilates",
          description:
            "Core-centric movement to create long, lean muscle and postural integrity.",
        },
        {
          title: "Functional Training",
          description:
            "Real-world strength sessions designed to improve longevity and daily performance.",
        },
        {
          title: "Meditation & Breathwork",
          description:
            "Cultivate inner calm, enhance focus, and reduce stress through guided mindfulness practices.",
        },
        {
          title: "Barre",
          description:
            "High-intensity, low-impact sculpting that fuses ballet-inspired movements with isometric strength.",
        },
      ],
    },
    {
      slug: "spa-beauty",
      heading: "Spa & Beauty",
      subheading: "Conscious Indulgence",
      imageUrl: "/images/spa.jpg",
      headline: "Holistic Rejuvenation.",
      description:
        "Where luxury meets therapy. Our Spa menu is curated to release deep-seated tension and restore your natural glow using premium, toxin-free products.",
      sectionTitle: "Signature Services",
      items: [
        {
          title: "Recovery & Decompression Massage",
          description:
            "Targeted deep-tissue work to release myofascial restrictions and sports-related tension.",
          personalization: {
            heading: "Personalize Your Experience",
            description: "Select your preferences to personalize your massage experience.",
            bulletPoints: [
              { label: "Music Therapy", icon: "mdi:music" },
              { label: "Aromatherapy", icon: "mdi:flower" },
              { label: "Massage Pressure", icon: "mdi:hand-back-left" },
              { label: "Oil or Cream", icon: "mdi:water" },
              { label: "Tea Selection", icon: "mdi:cup" },
            ],
          },
        },
        {
          title: "Relaxation Ritual",
          description:
            "A sensory journey designed to lower cortisol and induce a state of pure bliss.",
        },
        {
          title: "Face Yoga & Sculpting",
          description:
            "Natural lifting techniques that tone facial muscles and boost collagen for a non-invasive glow.",
        },
      ],
    },
  ],
  es: [
    {
      slug: "biohacking",
      heading: "Biohacking (Recuperación)",
      subheading: "Restauración Basada en la Ciencia",
      imageUrl: "/images/biohacking.jpg",
      headline: "Recalibra Tu Sistema.",
      description:
        "El rendimiento es tan bueno como tu recuperación. Nuestro Laboratorio de Recuperación utiliza tecnología de grado médico para reducir la inflamación, potenciar la salud mitocondrial y resetear tu sistema nervioso.",
      sectionTitle: "Los Rituales",
      items: [
        {
          title: "Inmersión en Frío",
          description:
            "Forja resiliencia mental y activa la salud metabólica a través de choque térmico controlado.",
        },
        {
          title: "Sauna Infrarroja",
          description:
            "Desintoxica a nivel celular y mejora la salud cardiovascular con calor de penetración profunda.",
        },
        {
          title: "Cámara Hiperbárica",
          description:
            "Satura tu cuerpo con oxígeno puro para acelerar la reparación de tejidos y la función cognitiva.",
        },
        {
          title: "Terapia de Compresión",
          description:
            "Elimina toxinas y mejora el drenaje linfático con tecnología de presión de aire de precisión.",
        },
      ],
    },
    {
      slug: "fitness",
      heading: "Fitness",
      subheading: "Movimiento Consciente, Resultados Poderosos",
      imageUrl: "/images/fitness.jpg",
      headline: "Fuerza en la Intención.",
      description:
        "Olvídate del esfuerzo excesivo. Nuestras clases están diseñadas para construir un cuerpo tan funcional como estético. Guiados por instructores de élite, nos enfocamos en alineación, respiración y poder sostenible.",
      sectionTitle: "Las Disciplinas",
      items: [
        {
          title: "Yoga",
          description:
            "Fluye con propósito. Equilibra fuerza y flexibilidad mientras conectas tu energía.",
        },
        {
          title: "Pilates",
          description:
            "Movimiento centrado en el core para crear músculo largo, delgado e integridad postural.",
        },
        {
          title: "Entrenamiento Funcional",
          description:
            "Sesiones de fuerza del mundo real diseñadas para mejorar la longevidad y el rendimiento diario.",
        },
        {
          title: "Meditación y Trabajo Respiratorio",
          description:
            "Cultiva la calma interior, mejora el enfoque y reduce el estrés a través de prácticas guiadas de atención plena.",
        },
        {
          title: "Barre",
          description:
            "Esculpido de alta intensidad y bajo impacto que fusiona movimientos inspirados en ballet con fuerza isométrica.",
        },
      ],
    },
    {
      slug: "spa-beauty",
      heading: "Spa y Belleza",
      subheading: "Indulgencia Consciente",
      imageUrl: "/images/spa.jpg",
      headline: "Rejuvenecimiento Holístico.",
      description:
        "Donde el lujo se encuentra con la terapia. Nuestro menú de Spa está curado para liberar tensión profunda y restaurar tu brillo natural usando productos premium libres de toxinas.",
      sectionTitle: "Servicios Signature",
      items: [
        {
          title: "Masaje de Recuperación y Descompresión",
          description:
            "Trabajo de tejido profundo dirigido para liberar restricciones miofasciales y tensión relacionada con deportes.",
          personalization: {
            heading: "Personaliza Tu Experiencia",
            description: "Selecciona tus preferencias para personalizar tu experiencia de masaje.",
            bulletPoints: [
              { label: "Musicoterapia", icon: "mdi:music" },
              { label: "Aromaterapia", icon: "mdi:flower" },
              { label: "Presión del Masaje", icon: "mdi:hand-back-left" },
              { label: "Aceite o Crema", icon: "mdi:water" },
              { label: "Selección de Té", icon: "mdi:cup" },
            ],
          },
        },
        {
          title: "Ritual de Relajación",
          description:
            "Un viaje sensorial diseñado para reducir el cortisol e inducir un estado de pura dicha.",
        },
        {
          title: "Yoga Facial y Esculpido",
          description:
            "Técnicas de lifting natural que tonifican los músculos faciales y aumentan el colágeno para un brillo no invasivo.",
        },
      ],
    },
  ],
};
