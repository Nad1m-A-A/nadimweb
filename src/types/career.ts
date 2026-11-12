import type { Project } from "@/types/project";

export type Concern = {
  label: string;
  text: string;
};

export type CareerMetric = {
  value: string;
  label: string;
};

export type StackGroup = {
  label: string;
  items: string[];
};

export type MetricsProps = {
  metrics: CareerMetric[];
};

export type ReferencesProps = {
  references: Project[];
};

export type ConcernsProps = {
  concerns: Concern[];
};
