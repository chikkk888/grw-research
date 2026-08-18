type Column = {
  key: string;
  label: string;
};

type Props = {
  caption?: string;
  columns: Column[];
  rows: Record<string, string>[];
};

export function ComparisonTable({ caption, columns, rows }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-brand-sm">
      {caption ? (
        <div className="border-b border-border px-5 py-3">
          <p className="text-sm font-medium text-ink">{caption}</p>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-paper/80 text-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="whitespace-normal break-words px-5 py-3 font-medium sm:whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-t border-border text-ink-soft"
              >
                {columns.map((col) => (
                  <td key={col.key} className="break-words px-5 py-3.5 align-top">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
