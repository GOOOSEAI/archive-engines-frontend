'use client';
const PLATFORM_NAMES = { buyee:'Buyee', zenmarket:'Zenmarket', fromjapan:'FROM JAPAN', dejapan:'Dejapan', jauce:'Jauce', remambo:'Remambo' };

export default function FilterBar({ filters, setFilters, platforms = [] }) {
  const f = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  const btnStyle = (active) => ({
    fontSize:10, padding:'4px 10px', borderRadius:2, cursor:'pointer', fontFamily:'"DM Mono",monospace',
    border: active ? '1px solid #0e0e0e' : '1px solid #e2e0d8',
    background: active ? '#0e0e0e' : 'transparent',
    color: active ? '#fff' : '#777',
  });
  const inputStyle = { padding:'5px 10px', fontSize:11, fontFamily:'"DM Mono",monospace', border:'1px solid #e2e0d8', borderRadius:2, background:'#fff', color:'#0e0e0e', outline:'none', width:110 };

  return (
    <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', marginBottom:'1.25rem', padding:'10px 14px', border:'1px solid #e2e0d8', borderRadius:3, background:'#fff' }}>

      {/* Platform filter */}
      <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
        <button style={btnStyle(filters.platform==='all')} onClick={() => f('platform','all')}>ALL</button>
        {platforms.filter(p => p.count > 0).map(p => (
          <button key={p.id} style={btnStyle(filters.platform===p.id)} onClick={() => f('platform', p.id)}>
            {PLATFORM_NAMES[p.id]?.toUpperCase() || p.id.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ width:'1px', height:20, background:'#e2e0d8' }} />

      {/* Max price */}
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <span style={{ fontSize:10, color:'#aaa' }}>MAX ¥</span>
        <input type="number" placeholder="any" value={filters.maxPrice}
          onChange={e => f('maxPrice', e.target.value)} style={inputStyle} />
      </div>

      <div style={{ width:'1px', height:20, background:'#e2e0d8' }} />

      {/* Condition */}
      <div style={{ display:'flex', gap:4 }}>
        {['all','New','Like New','Good','Fair'].map(c => (
          <button key={c} style={btnStyle(filters.condition===c)} onClick={() => f('condition', c)}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ width:'1px', height:20, background:'#e2e0d8' }} />

      {/* Sort */}
      <div style={{ display:'flex', gap:4 }}>
        <button style={btnStyle(filters.sort==='price_asc')} onClick={() => f('sort','price_asc')}>PRICE ↑</button>
        <button style={btnStyle(filters.sort==='price_desc')} onClick={() => f('sort','price_desc')}>PRICE ↓</button>
      </div>
    </div>
  );
}
