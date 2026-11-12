import Career from "@/components/sections/career";
import { careerTabs } from "@/data/career-tabs";

export default function Careers() {
  return (
    <>
      {careerTabs.map((tab, index) => (
        <Career key={tab.id} tab={tab} divided={index > 0} />
      ))}
    </>
  );
}
