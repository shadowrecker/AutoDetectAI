import { useState } from "react";
import FileUploader from "./components/FileUploader.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import Spinner from "./components/Spinner.jsx";
import classifyTransactions from "./services/classifyTransactions.js";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [deductions, setDeductions] = useState(null);

  async function handleCsv(rows) {
    setLoading(true);
    const result = await classifyTransactions(rows);
    setDeductions(result);
    setLoading(false);
  }

  return (
    <main className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4 text-brand">
        AutoDeduct AI <span className="text-gray-500 text-base">MVP</span>
      </h1>

      <FileUploader onParsed={handleCsv} />

      {loading && <Spinner />}

      {deductions && !loading && (
        <ResultsPanel {...deductions} reset={() => setDeductions(null)} />
      )}
    </main>
  );
}
