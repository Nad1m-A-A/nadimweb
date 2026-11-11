"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/fade-in";
import SectionTitle from "@/components/ui/section-title";
import { infoItems } from "@/data/info";

export default function InfoSection() {
  return (
    <section
      id="info"
      className="section inner-section min-h-[calc(100vh-var(--header-h)+3.5rem)]"
    >
      <div className="app_container">
        <SectionTitle>Info</SectionTitle>

        <div className="relative">
          <dl className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {infoItems.map((item, index) => (
              <FadeIn key={item.title} delay={0.3 + index * 0.05}>
                <dt className="text-label text-muted">{item.title}</dt>
                <dd className="mt-1 text-lead text-foreground">
                  {"href" in item ? (
                    <a
                      href={item.href}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="underline-offset-4 transition-all hover:text-accent hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </dd>
              </FadeIn>
            ))}
          </dl>

          <Image
            src="/uae-map.png"
            alt="United Arab Emirates"
            width={1200}
            height={600}
            className="w-120 object-cover object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-0 md:top-15 md:-translate-x-1/4 opacity-10"
          />
        </div>
      </div>
    </section>
  );
}
