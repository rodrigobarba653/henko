export interface Package {
  name: string;
  includedServices: string[];
  designFor: string;
}

export const packages: Package[] = [
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
];
