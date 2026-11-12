import type { Project } from "@/types/project";

export type CareerStep = {
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

export type CareerMetricsProps = {
  metrics: CareerMetric[];
};

export type CareerReferencesProps = {
  references: Project[];
};

export type CareerStepsProps = {
  steps: CareerStep[];
};

export type CareerStackListProps = {
  groups: StackGroup[];
};
