const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const isConfigured = !!SHEET_ID;

function parseCSV(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (ch === '"') {
      if (inQuotes && csv[i + 1] === '"') { field += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      row.push(field); field = '';
    } else if (ch === '\r' && csv[i + 1] === '\n' && !inQuotes) {
      i++; row.push(field); field = ''; rows.push(row); row = [];
    } else if (ch === '\n' && !inQuotes) {
      row.push(field); field = ''; rows.push(row); row = [];
    } else {
      field += ch;
    }
  }
  if (field || row.length > 0) { row.push(field); rows.push(row); }

  if (rows.length < 2) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.some(c => c.trim()))
    .map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])));
}

async function fetchTab(tab: string): Promise<Record<string, string>[]> {
  if (!SHEET_ID) return [];
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return parseCSV(await res.text());
  } catch {
    return [];
  }
}

const keyValueTab = (tab: string) =>
  fetchTab(tab).then(rows =>
    Object.fromEntries(rows.map(r => [r.key, r.value]))
  );

export const getGeneral = () => keyValueTab('general');
export const getEssential = () => fetchTab('essential');

export const getKeyDates = () => fetchTab('key_dates');
export const getPrograms = () => fetchTab('programs');
export const getProviders = () => fetchTab('providers');
export const getOffsite = () => fetchTab('offsite');
