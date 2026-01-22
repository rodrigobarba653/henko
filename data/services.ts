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
  }>;
}

export const services: Service[] = [
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
];
