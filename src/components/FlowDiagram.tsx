"use client";

interface FlowStep {
  label: string;
  description?: string;
}

export function FlowDiagram({
  steps,
  title,
}: {
  steps: FlowStep[];
  title?: string;
}) {
  return (
    <div className="my-8 rounded-xl border border-border bg-card p-6">
      {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className="rounded-lg border border-accent bg-accent-light px-4 py-2 text-center">
              <p className="text-sm font-semibold text-accent">{step.label}</p>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted">{step.description}</p>
              )}
            </div>
            {i < steps.length - 1 && (
              <span className="text-muted text-lg">&rarr;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
