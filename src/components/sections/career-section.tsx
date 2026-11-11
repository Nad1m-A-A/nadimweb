import CareerTabPanel from "@/components/sections/career-tab-panel";
import type { CareerTab } from "@/data/career-tabs";

type CareerSectionProps = {
  tab: CareerTab;
  /** Sections after the first get the accent divider line. */
  divided?: boolean;
  /** The last section is tall enough for its title to scroll right under the header. */
  last?: boolean;
};

export default function CareerSection({
  tab,
  divided = false,
  last = false,
}: CareerSectionProps) {
  return (
    <section
      id={tab.id}
      className={`section ${divided ? "inner-section" : ""} ${
        last ? "min-h-[calc(100vh-var(--header-h)+3.5rem)]" : ""
      }`}
    >
      <div className="app_container">
        <CareerTabPanel tab={tab} />
      </div>
    </section>
  );
}
