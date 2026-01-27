import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";

type HeroCard = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
};

const cards: ReadonlyArray<HeroCard> = [
  {
    icon: "🌊",
    title: "Professional Guides",
    description: "Experienced, knowledgeable guides who share Kenya's rich maritime heritage.",
  },
  {
    icon: "⛵",
    title: "Safe & Comfortable",
    description: "Modern boats with all safety equipment and amenities for your comfort.",
  },
  {
    icon: "📸",
    title: "Unforgettable Views",
    description: "Stunning coastal scenery and opportunities for amazing memories.",
  },
  {
    icon: "⭐",
    title: "Trusted by Thousands",
    description: "4.8+ star average rating from over 1,000+ satisfied customers.",
  },
];

export function HeroCards() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.title} className="p-6 text-center">
              <div className="mb-4 text-4xl">{card.icon}</div>
              <Heading level="h3" size="md" className="mb-2">
                {card.title}
              </Heading>
              <p className="text-sm text-neutral-600">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
