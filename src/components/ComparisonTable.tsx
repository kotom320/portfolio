interface Row {
  feature: string;
  ours: string;
  theirs: string;
}

export function ComparisonTable({
  title,
  oursLabel,
  theirsLabel,
  rows,
}: {
  title?: string;
  oursLabel: string;
  theirsLabel: string;
  rows: Row[];
}) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-border bg-card">
      {title && (
        <h3 className="border-b border-border px-6 py-3 text-lg font-semibold">
          {title}
        </h3>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            <th className="px-6 py-3 font-medium">항목</th>
            <th className="px-6 py-3 font-medium">{oursLabel}</th>
            <th className="px-6 py-3 font-medium">{theirsLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.feature}
              className="border-b border-border last:border-0"
            >
              <td className="px-6 py-3 font-medium">{row.feature}</td>
              <td className="px-6 py-3 text-accent">{row.ours}</td>
              <td className="px-6 py-3 text-muted">{row.theirs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
