import Papa from "papaparse";

export default function FileUploader({ onParsed }) {
  function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (r) => onParsed(r.data),
      error: (err) => alert(err.message),
    });
  }

  return (
    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl bg-white cursor-pointer hover:bg-blue-50 mb-6">
      <input type="file" accept=".csv" onChange={onFile} className="hidden" />
      <span className="text-sm font-medium">Drag & drop CSV or click to upload</span>
    </label>
  );
}
