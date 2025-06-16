export default function Spinner() {
  return (
    <div className="flex items-center gap-2 mt-6 text-brand">
      <svg
        className="animate-spin h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      <span className="text-sm">Classifying transactions&nbsp;…</span>
    </div>
  );
}
