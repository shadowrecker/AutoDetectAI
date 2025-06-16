import { IRS_CATEGORIES } from "./irsCategories.js";

/* Detect whether the user supplied a key */
const hasKey = !!import.meta.env.VITE_OPENAI_API_KEY;

/* Lazy-load the SDK only if we have a key */
let openai;
if (hasKey) {
  const sdk = await import("openai");
  openai = new sdk.default({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });
}

/**
 * Classify bank rows into Schedule-C categories.
 * Falls back to a mocked classifier when no API key is set.
 */
export default async function classifyTransactions(rows) {
  // ---------- 1️⃣  LIVE mode (requires key) ----------
  if (hasKey) {
    const sample = rows.slice(0, 200).map((r) => r.Description).join("\n");

    const prompt = `
You are a US tax specialist. Classify each bank transaction below into one
IRS Schedule-C category from: ${IRS_CATEGORIES.join(", ")}.
Return JSON {total:number,rowCount:number,csv:string}.
Transactions:
${sample}
`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [{ role: "user", content: prompt }],
    });

    return JSON.parse(res.choices[0].message.content);
  }

  // ---------- 2️⃣  MOCK mode (default) ----------
  const randomCat = () =>
    IRS_CATEGORIES[Math.floor(Math.random() * IRS_CATEGORIES.length)];

  const classified = rows.map((r) => ({
    ...r,
    Category: randomCat(),
  }));

  const csvString =
    "Description,Amount,Category\n" +
    classified
      .map((r) => `${r.Description},${r.Amount},${r.Category}`)
      .join("\n");

  const total = classified.reduce(
    (sum, r) => sum + (parseFloat(r.Amount) || 0),
    0
  );

  return {
    total: Number(total.toFixed(2)),
    rows: classified.length,
    csv: csvString,
  };
}
