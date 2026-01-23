export type Language = "en" | "es";

export interface Translations {
  // Common/Shared
  common: {
    nav: {
      concept: string;
      services: string;
      fuelShop: string;
      pilars: string;
      packages: string;
      booking: string;
    };
    buttons: {
      bookNow: string;
      includedServices: string;
    };
  };

  // Metadata
  metadata: {
    title: string;
    description: string;
  };

  // Homepage - Hero
  hero: {
    heading: string;
    subheading: string;
    buttonPrimary: string;
    buttonSecondary: string;
    imageAlt: string;
  };

  // Homepage - About Us
  aboutUs: {
    heading: string;
    body: string;
  };

  // Homepage - Experience
  experience: {
    heading: string;
    body: string;
    viewMore: string;
    cards: {
      biohacking: {
        heading: string;
        subheading: string;
        body: string;
        alt: string;
      };
      fitness: {
        heading: string;
        subheading: string;
        body: string;
        alt: string;
      };
      spaBeauty: {
        heading: string;
        subheading: string;
        body: string;
        alt: string;
      };
    };
  };

  // Homepage - Retail
  retail: {
    heading: string;
    body: string;
    cards: {
      shop: {
        heading: string;
        subheading: string;
        body: string;
        alt: string;
      };
      fuelBar: {
        heading: string;
        subheading: string;
        body: string;
        alt: string;
      };
    };
  };

  // Homepage - Pilars
  pilars: {
    heading: string;
    body: string;
    imageAlt: string;
    items: Array<{
      heading: string;
      subheading: string;
      body: string;
      iconAlt: string;
    }>;
  };

  // Packages Page
  packages: {
    heading: string;
    body: string;
    items: Array<{
      name: string;
      includedServices: string[];
      designFor: string;
    }>;
  };

  // Services are handled in services-i18n.ts

  // Footer
  footer: {
    contact: string;
    address: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    phone: string;
    email: string;
    instagram: string;
    facebook: string;
    logoAlt: string;
  };

  // Concept Section (separate from common)
  conceptSection: {
    heading: string;
    body: string;
    imageAlt: string;
  };

  // Nav (separate from common)
  navSection: {
    logoAlt: string;
    menuToggle: string;
    menuClose: string;
    languageEnglish: string;
    languageSpanish: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      nav: {
        concept: "Concept",
        services: "Services",
        fuelShop: "Fuel & Shop",
        pilars: "Pilars",
        packages: "Packages",
        booking: "Booking",
      },
      buttons: {
        bookNow: "Book Now",
        includedServices: "Included Services",
      },
    },
    metadata: {
      title: "Henko | The Art of Living Better, Longer",
      description:
        "Where ancient wisdom meets cutting-edge biohacking. Optimize your path to longevity with our wellness programs.",
    },
    hero: {
      heading: "The Art of Living Better, Longer",
      subheading: "Where ancient wisdom meets cutting-edge biohacking.",
      buttonPrimary: "Book Now",
      buttonSecondary: "Meet Us",
      imageAlt: "Zen yoga and wellness",
    },
    aboutUs: {
      heading: "Evolution Starts Within.",
      body: "Welcome to Henko, a sanctuary where ancient wisdom meets cutting-edge biohacking. From high-performance fitness to deep cellular recovery, we provide the tools to master your biology and elevate your spirit.",
    },
    experience: {
      heading: "The Henko Experience",
      body: "A holistic approach to human optimization—where recovery, movement, and beauty work together to elevate performance, balance, and longevity.",
      viewMore: "View more",
      cards: {
        biohacking: {
          heading: "Biohacking (Recovery):",
          subheading: "Science-Backed Restoration",
          body: "Performance is only as good as your recovery. Our Recovery Lab uses medical-grade technology to reduce inflammation, boost mitochondrial health, and reset your nervous system.",
          alt: "Experience 1",
        },
        fitness: {
          heading: "Fitness:",
          subheading: "Mindful Movement, Powerful Results",
          body: "Forget the grind. Our classes are designed to build a body that is as functional as it is aesthetic. Guided by elite instructors, we focus on alignment, breath, and sustainable power.",
          alt: "Experience 2",
        },
        spaBeauty: {
          heading: "Spa & Beauty",
          subheading: "Conscious Indulgence",
          body: "Where luxury meets therapy. Our Spa menu is curated to release deep-seated tension and restore your natural glow using premium, toxin-free products.",
          alt: "Experience 3",
        },
      },
    },
    retail: {
      heading: "Retail & Fuel Bar",
      body: "Nourishment as a ritual. From bio-available supplements to functional blends, everything is crafted to fuel your body and elevate your daily routine.",
      cards: {
        shop: {
          heading: "Elements (Shop)",
          subheading: "Curated Longevity",
          body: "Take the Henko experience home. From physician-grade supplements to clean-beauty skincare, every product in our retail shop is vetted for purity and efficacy.",
          alt: "Elements (Shop)",
        },
        fuelBar: {
          heading: "Fuel Bar",
          subheading: "Alchemy in a Glass",
          body: "Nourish your recovery at our Juice & Frappé Bar. We blend organic, nutrient-dense ingredients with biohacking boosters like collagen, adaptogens, and clean protein to fuel your transformation.",
          alt: "Fuel Bar",
        },
      },
    },
    pilars: {
      heading: "Pilars",
      body: "Built on science and intention, our pillars guide every Henko experience—shaping how we move, recover, nourish, and evolve over time.",
      imageAlt: "Pilar",
      items: [
        {
          heading: "Cellular Vitality (Science)",
          subheading: "The Hyperbaric Chamber & Supplements.",
          body: "Real wellness starts at the cellular level. We provide the oxygen, nutrients, and environment needed to repair and rejuvenate your body from the inside out.",
          iconAlt: "Cellular Vitality",
        },
        {
          heading: "The Contrast Method (Recovery)",
          subheading: "Sauna & Cold Plunge.",
          body: "Growth happens at the edges. By mastering heat and cold, you build a resilient nervous system designed to handle modern stress with ease.",
          iconAlt: "The Contrast Method",
        },
        {
          heading: "Intuitive Motion (Body)",
          subheading: "Yoga, Pilates, and Functional.",
          body: "We don't believe in punishing the body. We focus on intelligent movement, biomechanics, and alignment to build strength without breaking you down.",
          iconAlt: "Intuitive Motion",
        },
        {
          heading: "Neuro-Architecture (Mind)",
          subheading: "Meditation & Breathwork.",
          body: "Designing a better brain. Through meditation and breathing protocols, we help rewire your response to stress, enhancing focus, creativity, and emotional balance.",
          iconAlt: "Neuro-Architecture",
        },
        {
          heading: "Aesthetic Alchemy (Beauty)",
          subheading: "Spa, Face Yoga & Retail.",
          body: "The Concept: Beauty is the reflection of internal health. Our spa and retail rituals nourish both skin and soul.",
          iconAlt: "Aesthetic Alchemy",
        },
        {
          heading: "The Longevity Legacy (Community)",
          subheading: "Long-term results & The Club Culture.",
          body: "We're not a fitness phase—we're a life partner. A sanctuary for high achievers committed to living better, longer.",
          iconAlt: "The Longevity Legacy",
        },
        {
          heading: "Elemental Nutrition (The Fuel)",
          subheading: "Bio-available nourishment as a ritual.",
          body: "Everything at the Fuel Bar and Henko Edit is chosen for purity—alchemy in a glass designed to support performance and recovery.",
          iconAlt: "Elemental Nutrition",
        },
      ],
    },
    packages: {
      heading: "Packages",
      body: "Choose the perfect package for your wellness journey. Each curated experience is designed to optimize your path to longevity.",
      items: [
        {
          name: "The Reset Ritual",
          includedServices: [
            "Functional Class",
            "Sauna",
            "Cold Plunge",
            "Post-workout Protein Frappé",
          ],
          designFor: "The High Performer",
        },
        {
          name: "The Longevity Path",
          includedServices: [
            "5 Hyperbaric Sessions",
            "5 Compression Therapy",
            "10% Shop Discount",
          ],
          designFor: "The Biohacker",
        },
        {
          name: "Glow & Flow",
          includedServices: [
            "Yoga or Barre Class",
            "Face Yoga",
            "Green Detox Juice",
          ],
          designFor: "The Beauty Enthusiast",
        },
        {
          name: "Ultimate Decompression",
          includedServices: [
            "Decompression Massage",
            "30 min Sauna",
            "Magnesium Supplement",
          ],
          designFor: "The Stressed Executive",
        },
        {
          name: "Henko 360 (Membership)",
          includedServices: [
            "Unlimited Fitness",
            "4 Recovery Sessions",
            "Monthly Spa Credit",
            "Shop Perks",
          ],
          designFor: "The Dedicated Member",
        },
      ],
    },
    footer: {
      contact: "Contact",
      address: "Address",
      addressLine1: "Oaxaca #96 int. 103",
      addressLine2: "Col. Roma Norte",
      addressLine3: "CDMX",
      addressLine4: "C.P. 06700",
      phone: "01 (55) 71587284",
      email: "info@henko.mx",
      instagram: "Instagram",
      facebook: "Facebook",
      logoAlt: "Henko Logo",
    },
    conceptSection: {
      heading: "The Concept",
      body: "At Henko, we don't just treat symptoms; we optimize human potential. Whether you seek peak physical performance, mental clarity, or a moment of profound stillness, your journey to longevity begins here.",
      imageAlt: "Concept",
    },
    navSection: {
      logoAlt: "Henko Logo",
      menuToggle: "Toggle menu",
      menuClose: "Close menu",
      languageEnglish: "EN",
      languageSpanish: "ES",
    },
  },
  es: {
    common: {
      nav: {
        concept: "Concepto",
        services: "Servicios",
        fuelShop: "Combustible y Tienda",
        pilars: "Pilares",
        packages: "Paquetes",
        booking: "Reservar",
      },
      buttons: {
        bookNow: "Reservar Ahora",
        includedServices: "Servicios Incluidos",
      },
    },
    metadata: {
      title: "Henko | El Arte de Vivir Mejor, Por Más Tiempo",
      description:
        "Donde la sabiduría antigua se encuentra con el biohacking de vanguardia. Optimiza tu camino hacia la longevidad con nuestros programas de bienestar.",
    },
    hero: {
      heading: "El Arte de Vivir Mejor, Por Más Tiempo",
      subheading: "Donde la sabiduría antigua se encuentra con el biohacking de vanguardia.",
      buttonPrimary: "Reservar Ahora",
      buttonSecondary: "Conócenos",
      imageAlt: "Yoga zen y bienestar",
    },
    aboutUs: {
      heading: "La Evolución Comienza Desde Adentro.",
      body: "Bienvenido a Henko, un santuario donde la sabiduría antigua se encuentra con el biohacking de vanguardia. Desde fitness de alto rendimiento hasta recuperación celular profunda, proporcionamos las herramientas para dominar tu biología y elevar tu espíritu.",
    },
    conceptSection: {
      heading: "El Concepto",
      body: "En Henko, no solo tratamos síntomas; optimizamos el potencial humano. Ya sea que busques máximo rendimiento físico, claridad mental o un momento de profunda quietud, tu viaje hacia la longevidad comienza aquí.",
      imageAlt: "Concepto",
    },
    navSection: {
      logoAlt: "Logo de Henko",
      menuToggle: "Alternar menú",
      menuClose: "Cerrar menú",
      languageEnglish: "EN",
      languageSpanish: "ES",
    },
    experience: {
      heading: "La Experiencia Henko",
      body: "Un enfoque holístico para la optimización humana—donde la recuperación, el movimiento y la belleza trabajan juntos para elevar el rendimiento, el equilibrio y la longevidad.",
      viewMore: "Ver más",
      cards: {
        biohacking: {
          heading: "Biohacking (Recuperación):",
          subheading: "Restauración Basada en la Ciencia",
          body: "El rendimiento es tan bueno como tu recuperación. Nuestro Laboratorio de Recuperación utiliza tecnología de grado médico para reducir la inflamación, potenciar la salud mitocondrial y resetear tu sistema nervioso.",
          alt: "Experiencia 1",
        },
        fitness: {
          heading: "Fitness:",
          subheading: "Movimiento Consciente, Resultados Poderosos",
          body: "Olvídate del esfuerzo excesivo. Nuestras clases están diseñadas para construir un cuerpo tan funcional como estético. Guiados por instructores de élite, nos enfocamos en alineación, respiración y poder sostenible.",
          alt: "Experiencia 2",
        },
        spaBeauty: {
          heading: "Spa y Belleza",
          subheading: "Indulgencia Consciente",
          body: "Donde el lujo se encuentra con la terapia. Nuestro menú de Spa está curado para liberar tensión profunda y restaurar tu brillo natural usando productos premium libres de toxinas.",
          alt: "Experiencia 3",
        },
      },
    },
    retail: {
      heading: "Tienda y Barra de Combustible",
      body: "La nutrición como ritual. Desde suplementos biodisponibles hasta mezclas funcionales, todo está diseñado para alimentar tu cuerpo y elevar tu rutina diaria.",
      cards: {
        shop: {
          heading: "Elementos (Tienda)",
          subheading: "Longevidad Curada",
          body: "Lleva la experiencia Henko a casa. Desde suplementos de grado médico hasta cuidado de la piel de belleza limpia, cada producto en nuestra tienda está verificado por pureza y eficacia.",
          alt: "Elementos (Tienda)",
        },
        fuelBar: {
          heading: "Barra de Combustible",
          subheading: "Alquimia en un Vaso",
          body: "Nutre tu recuperación en nuestro Bar de Jugos y Frappés. Mezclamos ingredientes orgánicos y densos en nutrientes con potenciadores de biohacking como colágeno, adaptógenos y proteína limpia para alimentar tu transformación.",
          alt: "Barra de Combustible",
        },
      },
    },
    pilars: {
      heading: "Pilares",
      body: "Construidos sobre ciencia e intención, nuestros pilares guían cada experiencia Henko—moldeando cómo nos movemos, recuperamos, nutrimos y evolucionamos con el tiempo.",
      imageAlt: "Pilar",
      items: [
        {
          heading: "Vitalidad Celular (Ciencia)",
          subheading: "La Cámara Hiperbárica y Suplementos.",
          body: "El bienestar real comienza a nivel celular. Proporcionamos el oxígeno, nutrientes y ambiente necesarios para reparar y rejuvenecer tu cuerpo desde adentro hacia afuera.",
          iconAlt: "Vitalidad Celular",
        },
        {
          heading: "El Método de Contraste (Recuperación)",
          subheading: "Sauna y Inmersión en Frío.",
          body: "El crecimiento ocurre en los límites. Al dominar el calor y el frío, construyes un sistema nervioso resiliente diseñado para manejar el estrés moderno con facilidad.",
          iconAlt: "El Método de Contraste",
        },
        {
          heading: "Movimiento Intuitivo (Cuerpo)",
          subheading: "Yoga, Pilates y Funcional.",
          body: "No creemos en castigar el cuerpo. Nos enfocamos en movimiento inteligente, biomecánica y alineación para construir fuerza sin romperte.",
          iconAlt: "Movimiento Intuitivo",
        },
        {
          heading: "Neuro-Arquitectura (Mente)",
          subheading: "Meditación y Trabajo Respiratorio.",
          body: "Diseñando un cerebro mejor. A través de protocolos de meditación y respiración, ayudamos a reconectar tu respuesta al estrés, mejorando el enfoque, creatividad y equilibrio emocional.",
          iconAlt: "Neuro-Arquitectura",
        },
        {
          heading: "Alquimia Estética (Belleza)",
          subheading: "Spa, Yoga Facial y Tienda.",
          body: "El Concepto: La belleza es el reflejo de la salud interna. Nuestros rituales de spa y tienda nutren tanto la piel como el alma.",
          iconAlt: "Alquimia Estética",
        },
        {
          heading: "El Legado de Longevidad (Comunidad)",
          subheading: "Resultados a largo plazo y La Cultura del Club.",
          body: "No somos una fase de fitness—somos un compañero de vida. Un santuario para personas de alto rendimiento comprometidas con vivir mejor, por más tiempo.",
          iconAlt: "El Legado de Longevidad",
        },
        {
          heading: "Nutrición Elemental (El Combustible)",
          subheading: "Nutrición biodisponible como ritual.",
          body: "Todo en la Barra de Combustible y Henko Edit se elige por pureza—alquimia en un vaso diseñada para apoyar el rendimiento y la recuperación.",
          iconAlt: "Nutrición Elemental",
        },
      ],
    },
    packages: {
      heading: "Paquetes",
      body: "Elige el paquete perfecto para tu viaje de bienestar. Cada experiencia curada está diseñada para optimizar tu camino hacia la longevidad.",
      items: [
        {
          name: "El Ritual de Reinicio",
          includedServices: [
            "Clase Funcional",
            "Sauna",
            "Inmersión en Frío",
            "Frappé de Proteína Post-Entrenamiento",
          ],
          designFor: "El Alto Rendimiento",
        },
        {
          name: "El Camino de Longevidad",
          includedServices: [
            "5 Sesiones Hiperbáricas",
            "5 Terapias de Compresión",
            "10% Descuento en Tienda",
          ],
          designFor: "El Biohacker",
        },
        {
          name: "Brillo y Fluidez",
          includedServices: [
            "Clase de Yoga o Barre",
            "Yoga Facial",
            "Jugo Verde Detox",
          ],
          designFor: "El Entusiasta de la Belleza",
        },
        {
          name: "Descompresión Ultimate",
          includedServices: [
            "Masaje de Descompresión",
            "Sauna 30 min",
            "Suplemento de Magnesio",
          ],
          designFor: "El Ejecutivo Estresado",
        },
        {
          name: "Henko 360 (Membresía)",
          includedServices: [
            "Fitness Ilimitado",
            "4 Sesiones de Recuperación",
            "Crédito Mensual de Spa",
            "Beneficios de Tienda",
          ],
          designFor: "El Miembro Dedicado",
        },
      ],
    },
    footer: {
      contact: "Contacto",
      address: "Dirección",
      addressLine1: "Oaxaca #96 int. 103",
      addressLine2: "Col. Roma Norte",
      addressLine3: "CDMX",
      addressLine4: "C.P. 06700",
      phone: "01 (55) 71587284",
      email: "info@henko.mx",
      instagram: "Instagram",
      facebook: "Facebook",
      logoAlt: "Logo de Henko",
    },
  },
};
