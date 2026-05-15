const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const isConfigured = !!SHEET_ID;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1)
    .filter(l => l.trim())
    .map(line => {
      const vals = parseCSVLine(line);
      return Object.fromEntries(headers.map((h, i) => [h, (vals[i] ?? '').trim()]));
    });
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

export const getGeneral = () =>
  fetchTab('general').then(rows =>
    Object.fromEntries(rows.map(r => [r.key, r.value]))
  );

export const getKeyDates = () => fetchTab('key_dates');
export const getPrograms = () => fetchTab('programs');
export const getProviders = () => fetchTab('providers');
export const getOffsite = () => fetchTab('offsite');
