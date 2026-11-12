import SectionTitle from "@/components/shared/ui/section-title";
import type { SectionProps } from "@/types/ui";

/** Page section shell: anchor, container and title. */
export default function Section({
  id,
  label,
  divided = true,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section ${divided ? "inner_section" : ""} ${className}`}
    >
      <div className="app_container">
        <SectionTitle>{label}</SectionTitle>
        {children}
      </div>
    </section>
  );
}
