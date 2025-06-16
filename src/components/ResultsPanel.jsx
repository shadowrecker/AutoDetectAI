export default function ResultsPanel({ total, rows, csv, reset }) {
  return (
    <section className="mt-6 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-2 text-brand">
        🎉 We found ${total.toLocaleString()} in extra deductions!
      </h2>

      <p className="text-sm mb-4">
        Classified {rows} transactions. Download the JSON report for a quick
        review or jump straight to your Schedule C.
      </p>

      <div className="flex gap-4">
        <a
          href={URL.createObjectURL(
            new Blob([csv], { type: "text/csv;charset=utf-8;" })
          )}
          download="classified_transactions.csv"
          className="px-4 py-2 bg-brand text-white rounded-lg text-sm"
        >
          Download CSV
        </a>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
        >
          Start Over
        </button>
      </div>
    </section>
  );
}
