"use client";

export function MetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-center">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}
