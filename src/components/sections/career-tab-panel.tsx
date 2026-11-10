import type { CareerTab } from "@/data/career-tabs";

type CareerTabPanelProps = {
  tab: CareerTab;
};

export default function CareerTabPanel({ tab }: CareerTabPanelProps) {
  if (!tab.body && !tab.steps) {
    return <p>{tab.label} content coming soon.</p>;
  }

  return (
    <div className="space-y-8">
      {tab.body && <p>{tab.body}</p>}

      {tab.steps && (
        <dl className="divide-y divide-border border-y border-border">
          {tab.steps.map((step) => (
            <div
              key={step.label}
              className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6"
            >
              <dt className="font-medium text-foreground">{step.label}</dt>
              <dd className="text-base leading-7">{step.text}</dd>
            </div>
          ))}
        </dl>
      )}

      {tab.references && (
        <div className="space-y-2">
          <h3 className="text-sm text-muted">References</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm sm:text-base">
            {tab.references.map((reference) => (
              <li key={reference.url}>
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-opacity duration-300 ease-calm hover:opacity-70"
                >
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
