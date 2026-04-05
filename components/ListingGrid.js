'use client';

const PLATFORM_COLORS = {
  buyee:     { bg:'#daeaf9', color:'#1a5490', label:'BY' },
  zenmarket: { bg:'#d5f0e4', color:'#1a6640', label:'ZM' },
  fromjapan: { bg:'#fde0d5', color:'#9c3a20', label:'FJ' },
  dejapan:   { bg:'#fce8f0', color:'#8a2045', label:'DJ' },
  jauce:     { bg:'#eae5f8', color:'#4a3a9e', label:'JC' },
  remambo:   { bg:'#fef0d5', color:'#7a4800', label:'RM' },
};

const COND_COLORS = {
  'New':      { bg:'#eaf5ee', color:'#2d7a4f' },
  'Like New': { bg:'#eaf5ee', color:'#2d7a4f' },
  'Good':     { bg:'#f7f6f2', color:'#555' },
  'Fair':     { bg:'#fdf3f2', color:'#a03020' },
  'Poor':     { bg:'#fdf3f2', color:'#c8392b' },
};

function formatPrice(jpy, rates) {
  const gbp = (jpy * rates.GBP).toFixed(0);
  return { jpy: `¥${jpy.toLocaleString()}`, gbp: `£${gbp}` };
}

export default function ListingGrid({ listings, rates }) {
  if (!listings || listings.length === 0) {
    return (
      <div style={{ padding:'3rem 0', textAlign:'center', color:'#aaa', fontSize:12 }}>
        No listings match your filters. Try adjusting the price or condition filter.
      </div>
    );
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:10, marginBottom:'2rem' }}>
      {listings.map((item, i) => (
        <ListingCard key={item.id || i} item={item} rates={rates} />
      ))}
    </div>
  );
}

function ListingCard({ item, rates }) {
  const platform = PLATFORM_COLORS[item.platform] || { bg:'#f0f0f0', color:'#555', label:'?' };
  const cond = COND_COLORS[item.condition] || { bg:'#f7f6f2', color:'#777' };
  const prices = formatPrice(item.price, rates);

  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration:'none', color:'inherit', display:'block', border:'1px solid #e2e0d8', borderRadius:3, background:'#fff', overflow:'hidden', transition:'border-color 0.15s, transform 0.15s', cursor:'pointer' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='#ccc'; e.currentTarget.style.transform='translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e0d8'; e.currentTarget.style.transform='none'; }}>

      {/* Image */}
      <div style={{ width:'100%', aspectRatio:'1', background:'#f7f6f2', position:'relative', overflow:'hidden' }}>
        {item.image ? (
          <img src={item.image} alt={item.title}
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
            onError={e => { e.target.style.display='none'; }}
          />
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontFamily:'"Shippori Mincho",serif', color:'#e2e0d8' }}>
            無
          </div>
        )}
        {/* Platform badge */}
        <div style={{ position:'absolute', top:6, left:6, width:24, height:24, borderRadius:4, background: platform.bg, color: platform.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:500 }}>
          {platform.label}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'10px 12px' }}>
        <div style={{ fontSize:12, color:'#0e0e0e', marginBottom:6, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {item.title}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:500, fontFamily:'"Shippori Mincho",serif', color:'#0e0e0e' }}>{prices.jpy}</div>
            <div style={{ fontSize:10, color:'#aaa' }}>{prices.gbp}</div>
          </div>
          <span style={{ fontSize:9, padding:'2px 7px', borderRadius:2, background: cond.bg, color: cond.color }}>
            {item.condition || 'Unknown'}
          </span>
        </div>
        <div style={{ fontSize:9, color:'#aaa', letterSpacing:'0.04em' }}>
          via {item.platformName} ↗
        </div>
      </div>
    </a>
  );
}
