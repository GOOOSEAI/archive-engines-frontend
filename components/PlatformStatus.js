'use client';
const PLATFORM_NAMES = { buyee:'Buyee', zenmarket:'Zenmarket', fromjapan:'FROM JAPAN', dejapan:'Dejapan', jauce:'Jauce', remambo:'Remambo' };

export default function PlatformStatus({ platforms = [], total, query }) {
  return (
    <div style={{ marginBottom:'1rem' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, flexWrap:'wrap', gap:8 }}>
        <span style={{ fontSize:11, color:'#777', letterSpacing:'0.06em' }}>
          <strong style={{ color:'#0e0e0e', fontFamily:'"Shippori Mincho",serif', fontSize:14 }}>{total}</strong> listings found for "{query}"
        </span>
      </div>
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {platforms.map(p => (
          <div key={p.id} style={{
            fontSize:10, padding:'4px 10px', borderRadius:2,
            border: p.error ? '1px solid #f0c4c0' : '1px solid #e2e0d8',
            background: p.error ? '#fdf3f2' : p.count > 0 ? '#eaf5ee' : '#f7f6f2',
            color: p.error ? '#a03020' : p.count > 0 ? '#2d7a4f' : '#aaa',
            display:'flex', alignItems:'center', gap:5
          }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background: p.error ? '#c8392b' : p.count > 0 ? '#2d7a4f' : '#ccc', flexShrink:0 }} />
            {PLATFORM_NAMES[p.id] || p.id}
            {!p.error && <span style={{ color:'inherit', opacity:0.7 }}>{p.count}</span>}
            {p.error && <span style={{ opacity:0.7 }}>failed</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
