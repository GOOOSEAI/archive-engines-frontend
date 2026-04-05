'use client';
import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ListingGrid from '../components/ListingGrid';
import PlatformStatus from '../components/PlatformStatus';
import SizeGuide from '../components/SizeGuide';
import CurrencyConverter from '../components/CurrencyConverter';

const QUICK_SEARCHES = [
  'vintage denim jacket', 'Issey Miyake pleats please',
  'Comme des Garçons', 'Kapital kountry',
  'Nike Japan exclusive', 'Visvim moc toe',
  'Sacai windbreaker', 'Neighborhood jacket',
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [jpQuery, setJpQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ platform: 'all', maxPrice: '', condition: 'all', sort: 'price_asc' });
  const [rates, setRates] = useState({ GBP: 0.0053, USD: 0.0067, EUR: 0.0062 });
  const [ratesLive, setRatesLive] = useState(false);
  const [rateDate, setRateDate] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const abortRef = useRef(null);

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=JPY&to=GBP,USD,EUR')
      .then(r => r.json())
      .then(data => { setRates(data.rates); setRatesLive(true); setRateDate(data.date); })
      .catch(() => {});
  }, []);

  async function translateQuery(raw) {
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 200,
          messages: [{ role: 'user', content: `Translate this fashion search query to Japanese for Japanese proxy shopping sites. Return ONLY JSON, no markdown: {"japanese":"<JP>","romaji":"<romaji>"}. Query: "${raw}"` }]
        })
      });
      const data = await resp.json();
      const parsed = JSON.parse((data?.content?.[0]?.text || '{}').replace(/```json|```/g, '').trim());
      return parsed.japanese || raw;
    } catch { return raw; }
  }

  async function doSearch(rawQuery) {
    const q = (rawQuery || query).trim();
    if (!q) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setLoading(true); setError(null); setResults(null);
    setLoadingText('Translating to Japanese…');
    const jp = await translateQuery(q);
    setJpQuery(jp);
    setLoadingText('Searching across all platforms…');
    setRecentSearches(prev => [q, ...prev.filter(s => s !== q)].slice(0, 6));
    try {
      const params = new URLSearchParams({ q: jp });
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      if (filters.platform !== 'all') params.set('platforms', filters.platform);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const resp = await fetch(`${apiUrl}/api/search?${params}`, { signal: abortRef.current.signal });
      if (!resp.ok) throw new Error(`API error ${resp.status}`);
      setResults(await resp.json());
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally { setLoading(false); setLoadingText(''); }
  }

  function getFilteredListings() {
    if (!results?.listings) return [];
    let list = [...results.listings];
    if (filters.platform !== 'all') list = list.filter(l => l.platform === filters.platform);
    if (filters.maxPrice) list = list.filter(l => l.price <= parseInt(filters.maxPrice));
    if (filters.condition !== 'all') list = list.filter(l => l.condition?.toLowerCase().includes(filters.condition.toLowerCase()));
    if (filters.sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    return list;
  }

  const filteredListings = getFilteredListings();

  const S = {
    main: { maxWidth: 900, margin: '0 auto', padding: '0 16px 80px' },
    header: { padding: '2rem 0 1.5rem', borderBottom: '1px solid #e2e0d8', marginBottom: '1.5rem' },
    logoRow: { display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem' },
    logo: { fontSize: 24, fontWeight: 500, fontFamily: '"Shippori Mincho",serif', margin: 0 },
    logoJp: { fontSize: 13, color: '#777', fontFamily: '"Shippori Mincho",serif' },
    tag: { fontSize: 9, background: '#c8392b', color: '#fff', padding: '2px 7px', borderRadius: 2, letterSpacing: '0.05em' },
    sub: { fontSize: 11, color: '#777', margin: '0 0 0.75rem', letterSpacing: '0.04em' },
    statsRow: { display: 'flex', gap: '1.5rem', fontSize: 10, color: '#aaa', flexWrap: 'wrap', alignItems: 'center' },
    rateDot: (live) => ({ width: 6, height: 6, borderRadius: '50%', background: live ? '#2d7a4f' : '#aaa', display: 'inline-block', marginRight: 4 }),
    quickRow: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' },
    quickBtn: { fontSize: 10, padding: '4px 10px', border: '1px solid #e2e0d8', borderRadius: 2, color: '#777', cursor: 'pointer', background: '#fff' },
    recentRow: { display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' },
    recentChip: { fontSize: 11, padding: '3px 9px', border: '1px solid #e2e0d8', borderRadius: 2, color: '#777', cursor: 'pointer', background: 'transparent' },
    jpStrip: { background: '#0e0e0e', color: '#fff', borderRadius: 3, padding: '10px 16px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12 },
    jpPill: { fontSize: 9, background: '#c8392b', color: '#fff', padding: '2px 8px', borderRadius: 2, letterSpacing: '0.06em' },
    loadingRow: { padding: '1rem 0', fontSize: 12, color: '#777', display: 'flex', alignItems: 'center', gap: 10 },
    errorBox: { padding: '10px 14px', background: '#fdf3f2', border: '1px solid #f0c4c0', borderRadius: 3, fontSize: 12, color: '#a03020', marginBottom: '1rem' },
    empty: { padding: '4rem 0', textAlign: 'center', color: '#aaa', fontSize: 13 },
    emptyBig: { fontSize: 36, fontFamily: '"Shippori Mincho",serif', color: '#e2e0d8', marginBottom: '0.5rem' },
  };

  return (
    <main style={S.main}>
      <header style={S.header}>
        <div style={S.logoRow}>
          <h1 style={S.logo}>Archive Engines</h1>
          <span style={S.logoJp}>アーカイブエンジン</span>
          <span style={S.tag}>BETA</span>
        </div>
        <p style={S.sub}>Search in English → translated to Japanese → real listings from 6 proxy services</p>
        <div style={S.statsRow}>
          <span>Platforms: <strong style={{ color: '#3a3a3a' }}>6</strong></span>
          <span>Marketplaces: <strong style={{ color: '#3a3a3a' }}>10+</strong></span>
          <span>
            <span style={S.rateDot(ratesLive)} />
            ¥100 = <strong style={{ color: '#3a3a3a' }}>{ratesLive ? `£${(rates.GBP * 100).toFixed(3)}` : '≈ £0.530'}</strong>
            {rateDate && <span style={{ color: '#ccc' }}> · {rateDate}</span>}
          </span>
        </div>
      </header>

      <SearchBar query={query} setQuery={setQuery} onSearch={doSearch} loading={loading} />

      <div style={S.quickRow}>
        <span style={{ fontSize: 10, color: '#aaa', alignSelf: 'center' }}>QUICK:</span>
        {QUICK_SEARCHES.map(q => (
          <button key={q} style={S.quickBtn} onClick={() => { setQuery(q); doSearch(q); }}>{q}</button>
        ))}
      </div>

      {recentSearches.length > 0 && (
        <div style={S.recentRow}>
          <span style={{ fontSize: 10, color: '#aaa' }}>RECENT:</span>
          {recentSearches.map(s => (
            <button key={s} style={S.recentChip} onClick={() => { setQuery(s); doSearch(s); }}>{s}</button>
          ))}
          <button onClick={() => setRecentSearches([])} style={{ fontSize: 10, color: '#aaa', border: 'none', background: 'none', cursor: 'pointer' }}>clear</button>
        </div>
      )}

      {jpQuery && jpQuery !== query && !loading && (
        <div style={S.jpStrip}>
          <span style={S.jpPill}>TRANSLATED</span>
          <span style={{ fontFamily: '"Shippori Mincho",serif', fontSize: 17 }}>{jpQuery}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>used as search query</span>
        </div>
      )}

      {loading && (
        <div style={S.loadingRow}>
          <div style={{ display: 'flex', gap: 5 }}>
            {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:'#777', animation:`ldpulse 1.2s infinite ${i*0.2}s` }} />)}
          </div>
          {loadingText}
        </div>
      )}

      {error && <div style={S.errorBox}>Could not reach the search backend. Make sure your Railway server is running. ({error})</div>}

      {results && !loading && (
        <>
          <PlatformStatus platforms={results.platforms} total={results.total} query={query} />
          <FilterBar filters={filters} setFilters={setFilters} platforms={results.platforms} />
          <ListingGrid listings={filteredListings} rates={rates} />
        </>
      )}

      {!results && !loading && !error && (
        <div style={S.empty}>
          <div style={S.emptyBig}>検索</div>
          <div>Search above to find listings across all Japanese proxy services</div>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <CurrencyConverter rates={rates} ratesLive={ratesLive} rateDate={rateDate} />
        <SizeGuide />
      </div>

      <style>{`@keyframes ldpulse{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>
    </main>
  );
}
