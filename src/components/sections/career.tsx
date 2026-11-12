import CareerTabPanel from "@/components/sections/career-tab-panel";
import type { CareerTab } from "@/data/career-tabs";

type CareerProps = {
  tab: CareerTab;
  /** Sections after the first get the border divider line. */
  divided?: boolean;
};

export default function Career({
  tab,
  divided = false,
}: CareerProps) {
  return (
    <section
      id={tab.id}
      className={`section  ${divided ? "inner-section" : ""}`}
    >
      <div className="app_container">
        <CareerTabPanel tab={tab} />
      </div>
    </section>
  );
}
