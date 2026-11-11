import CareerSection from "@/components/sections/career-section";
import { careerTabs } from "@/data/career-tabs";

export default function CareerSections() {
  return (
    <>
      {careerTabs.map((tab, index) => (
        <CareerSection key={tab.id} tab={tab} divided={index > 0} />
      ))}
    </>
  );
}
