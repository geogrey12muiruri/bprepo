import React from "react";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  value?: string;
  href?: string;
}

export function ContactCard({ icon, title, description, value, href }: ContactCardProps) {
  return (
    <Card className="group p-6 sm:p-7 md:p-8 text-center hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20">
      <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-300">
        {icon}
      </div>
      <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-white">
        {title}
      </Heading>
      {description && (
        <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {href ? (
        <a
          href={href}
          className="text-sm sm:text-base text-teal-400 font-semibold hover:text-teal-300 transition-colors inline-block break-all"
        >
          {value}
        </a>
      ) : value ? (
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          {value}
        </p>
      ) : null}
    </Card>
  );
}
