'use client';
export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display:'flex', border:'1px solid #ccc', borderRadius:3, overflow:'hidden', background:'#fff' }}>
        <input
          type="text" value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          placeholder="e.g.  Yohji Yamamoto jacket, vintage Levi 501, Kapital sashiko…"
          autoComplete="off"
          style={{ flex:1, padding:'12px 16px', fontSize:15, fontFamily:'"DM Mono",monospace', border:'none', background:'transparent', color:'#0e0e0e', outline:'none' }}
        />
        <button onClick={() => onSearch()} disabled={loading}
          style={{ padding:'0 20px', background: loading ? '#3a3a3a' : '#0e0e0e', color:'#fff', fontFamily:'"DM Mono",monospace', fontSize:13, border:'none', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing:'0.03em', flexShrink:0 }}>
          {loading ? '…' : 'SEARCH →'}
        </button>
      </div>
    </div>
  );
}
