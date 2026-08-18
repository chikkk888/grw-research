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
  const labelColumn = columns[0];
  const valueColumns = columns.slice(1);

  return (
    <>
      {/* Phones: stacked cards avoid horizontal page overflow */}
      <div className="space-y-3 md:hidden">
        {caption ? (
          <p className="text-sm font-medium text-ink">{caption}</p>
        ) : null}
        {rows.map((row, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-surface p-4 shadow-brand-sm"
          >
            {labelColumn ? (
              <p className="text-sm font-semibold text-ink">{row[labelColumn.key]}</p>
            ) : null}
            <dl className={`${labelColumn ? "mt-3" : ""} space-y-3`}>
              {(labelColumn ? valueColumns : columns).map((col) => (
                <div key={col.key}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                    {col.label}
                  </dt>
                  <dd className="mt-1 break-words text-sm leading-relaxed text-ink-soft">
                    {row[col.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Tablet/desktop: table layout */}
      <div className="hidden max-w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-brand-sm md:block">
        {caption ? (
          <div className="border-b border-border px-5 py-3">
            <p className="text-sm font-medium text-ink">{caption}</p>
          </div>
        ) : null}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="bg-paper/80 text-muted">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="break-words px-4 py-3 font-medium lg:px-5"
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
                    <td
                      key={col.key}
                      className="break-words px-4 py-3.5 align-top lg:px-5"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
