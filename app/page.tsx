import { isConfigured, getGeneral, getEssential, getKeyDates, getPrograms, getProviders, getOffsite } from '@/lib/sheets';

type Row = Record<string, string>;

const CATEGORY_ORDER = [
  { key: 'SPORTS',          label: 'Sports & Movement' },
  { key: 'PERFORMING ARTS', label: 'Performing Arts' },
  { key: 'STEAM/ARTS',      label: 'STEAM & Arts' },
  { key: 'STEM/CODING',     label: 'STEM & Coding' },
  { key: 'CHESS',           label: 'Chess' },
  { key: 'DEBATE',          label: 'Debate' },
  { key: 'ACADEMIC',        label: 'Academic & Life Skills' },
  { key: 'LANGUAGE',        label: 'Language' },
];

function groupBy(rows: Row[], key: string): Record<string, Row[]> {
  return rows.reduce((acc, r) => {
    const k = (r[key] ?? '').toUpperCase();
    if (!acc[k]) acc[k] = [];
    acc[k].push(r);
    return acc;
  }, {} as Record<string, Row[]>);
}

function safeHref(url: string): string {
  if (!url) return '#';
  return url.startsWith('http') ? url : `https://${url}`;
}

export default async function Page() {
  if (!isConfigured) return <SetupMessage />;

  const [general, essential, keyDates, programs, providers, offsite] = await Promise.all([
    getGeneral(), getEssential(), getKeyDates(), getPrograms(), getProviders(), getOffsite(),
  ]);

  const programsByCategory = groupBy(programs, 'category');

  return (
    <main className="min-h-screen text-slate-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Hero ── */}
      <header className="bg-blue-950 text-white py-20 px-6 text-center">
        <p className="text-blue-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          PS 6 · Lillie D. Blake School
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
          After School Programming
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          {general.overview ||
            'Supplemental programming for grades PreK through 5, across STEM, the visual arts, the performing arts, sports, dance, language, debate, music, chess, and more.'}
        </p>
      </header>

      {/* ── Zoom Fair Callout ── */}
      {general.zoom_url && (
        <section className="bg-blue-700 py-5 px-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">🎥 Zoom Fair Recording Available</p>
              {general.zoom_password && (
                <p className="text-blue-200 text-xs mt-0.5">Password: <span className="font-mono text-white">{general.zoom_password}</span></p>
              )}
            </div>
            <a href={safeHref(general.zoom_url)} target="_blank" rel="noopener noreferrer"
              className="shrink-0 inline-block text-sm bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Watch Recording →
            </a>
          </div>
        </section>
      )}

      {/* ── Key Dates ── */}
      {keyDates.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading>Key Dates</SectionHeading>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {keyDates.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-3.5 px-5 font-semibold text-blue-700 text-sm whitespace-nowrap border-r border-slate-200 w-52">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-5 text-slate-700 text-sm">{row.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Essential Info ── */}
      {essential.length > 0 && (
        <section className="bg-blue-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Essential Information</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {essential.map((card, i) => (
                <InfoCard key={i} title={card.title}>
                  {cardLines(card.value, '')}
                </InfoCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Programs ── */}
      {programs.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Programs</SectionHeading>
            <div className="space-y-12">
              {CATEGORY_ORDER.map(cat => {
                const progs = programsByCategory[cat.key] ?? [];
                if (progs.length === 0) return null;
                return (
                  <div key={cat.key}>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">
                      {cat.label}
                    </h3>
                    <div className="divide-y divide-slate-100 border-t border-slate-100">
                      {progs.map((p, i) => (
                        <div key={i} className="flex items-start justify-between py-3 gap-4">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-medium text-slate-800 text-sm">{p.name}</span>
                            {p.is_new === 'true' && (
                              <span className="shrink-0 text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                New
                              </span>
                            )}
                          </div>
                          <div className="shrink-0 text-right text-sm text-slate-500 whitespace-nowrap">
                            {p.grades}
                            {p.grades && p.days && <span className="mx-1.5 text-slate-300">·</span>}
                            {p.days}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Providers ── */}
      {providers.length > 0 && (
        <section className="bg-blue-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Providers & Registration</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {providers.map((p, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{p.name}</h3>
                    {p.category && (
                      <span className="shrink-0 text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                        {p.category}
                      </span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  )}
                  <div className="text-sm space-y-1.5 mt-auto">
                    {p.contact && <p className="text-slate-400">{p.contact}</p>}
                    {p.email && (
                      <p>
                        <a href={`mailto:${p.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {p.email}
                        </a>
                      </p>
                    )}
                    {p.website && (
                      <p>
                        <a href={safeHref(p.website)} target="_blank" rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline">
                          Website ↗
                        </a>
                      </p>
                    )}
                  </div>
                  {(p.register_url || p.register_url_2 || p.register_url_3) && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.register_url && (
                        <a href={safeHref(p.register_url)} target="_blank" rel="noopener noreferrer"
                          className="inline-block text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                          {p.register_label || 'Register'} →
                        </a>
                      )}
                      {p.register_url_2 && (
                        <a href={safeHref(p.register_url_2)} target="_blank" rel="noopener noreferrer"
                          className="inline-block text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                          {p.register_label_2 || 'Register'} →
                        </a>
                      )}
                      {p.register_url_3 && (
                        <a href={safeHref(p.register_url_3)} target="_blank" rel="noopener noreferrer"
                          className="inline-block text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                          {p.register_label_3 || 'Register'} →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Off-Site Programs ── */}
      {offsite.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Off-Site Programs</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {offsite.map((p, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-6 flex flex-col">
                  <h3 className="font-bold text-slate-900 text-base mb-2">{p.name}</h3>
                  {p.description && (
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  )}
                  <div className="text-sm space-y-1 text-slate-500">
                    {p.pickup && <p><span className="font-medium text-slate-700">Pickup:</span> {p.pickup}</p>}
                    {p.dismissal && <p><span className="font-medium text-slate-700">Dismissal:</span> {p.dismissal}</p>}
                    {p.phone && <p><span className="font-medium text-slate-700">Phone:</span> {p.phone}</p>}
                  </div>
                  {(p.website || p.register_url) && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.website && (
                        <a href={safeHref(p.website)} target="_blank" rel="noopener noreferrer"
                          className="inline-block self-start text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                          Learn More →
                        </a>
                      )}
                      {p.register_url && (
                        <a href={safeHref(p.register_url)} target="_blank" rel="noopener noreferrer"
                          className="inline-block self-start text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                          Register →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Policies ── */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Scholarships</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {general.scholarships ||
                'Please adhere to the scholarship request instructions provided by each provider, or email the provider for the class you are interested in and copy the After School Coordinator. The After School team works collaboratively with providers on scholarship and financial aid matters to best support families in need of assistance.'}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Refund Policy</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {general.refund_policy ||
                'Providers may issue pro-rated refunds upon request, minus the processing fee and cost of any classes that took place before the request. Refund requests must be submitted by February 14, 2026.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <footer className="bg-blue-950 text-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-bold mb-8">Questions?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm">
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-widest mb-1.5 font-semibold">Day-to-Day Matters</p>
              <a href="mailto:afterschool@ps6pta.org" className="text-white hover:text-blue-200 transition-colors">
                afterschool@ps6pta.org
              </a>
            </div>
            <div className="hidden sm:block h-8 w-px bg-blue-800" />
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-widest mb-1.5 font-semibold">General Questions</p>
              <a href="mailto:pta@ps6pta.org" className="text-white hover:text-blue-200 transition-colors">
                pta@ps6pta.org
              </a>
            </div>
          </div>
          <p className="mt-12 text-blue-700 text-xs">45 East 81st Street, New York, NY 10028 · (212) 452-6650</p>
        </div>
      </footer>
    </main>
  );
}

function cardLines(value: string | undefined, fallback: string) {
  const lines = (value || fallback).split('\n').filter(Boolean);
  return (
    <>
      <p>{lines[0]}</p>
      {lines.slice(1).map((l, i) => (
        <p key={i} className="mt-1">{l}</p>
      ))}
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-slate-900 mb-8">{children}</h2>;
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-blue-100 p-5">
      <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em] mb-2">{title}</h3>
      <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function SetupMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-6">
      <div className="max-w-md text-center">
        <div className="text-4xl mb-4">📋</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Connect Your Spreadsheet</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Add <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-blue-700 font-mono">GOOGLE_SHEET_ID</code> to your environment variables to connect the content spreadsheet.
        </p>
        <p className="text-slate-400 text-xs mt-4">
          Copy <code className="font-mono">.env.local.example</code> → <code className="font-mono">.env.local</code> and fill in your Sheet ID.
        </p>
      </div>
    </div>
  );
}
