'use client';
import { useState } from 'react';

export default function CurrencyConverter({ rates, ratesLive, rateDate }) {
  const [open, setOpen] = useState(false);
  const [jpy, setJpy] = useState('');

  const convert = (r) => jpy ? (parseFloat(jpy) * r).toFixed(2) : '—';

  const panelStyle = { border:'1px solid #e2e0d8', borderRadius:3, background:'#fff', marginBottom:'1rem', overflow:'hidden' };
  const headStyle = { padding:'10px 14px', borderBottom: open ? '1px solid #e2e0d8' : 'none', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', userSelect:'none' };

  return (
    <div style={panelStyle}>
      <div style={headStyle} onClick={() => setOpen(!open)}>
        <span style={{ fontSize:11, letterSpacing:'0.06em', color:'#3a3a3a', display:'flex', alignItems:'center', gap:8 }}>
          CURRENCY CONVERTER — LIVE RATES
          <span style={{ width:6, height:6, borderRadius:'50%', background: ratesLive ? '#2d7a4f' : '#aaa', display:'inline-block' }} />
        </span>
        <span style={{ fontSize:12, color:'#aaa' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding:14 }}>
          <div style={{ fontSize:10, color:'#aaa', marginBottom:10 }}>
            {ratesLive ? `Live ECB rates · Updated ${rateDate}` : 'Using estimated rates — live fetch failed'}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <span style={{ fontSize:11, color:'#777' }}>¥ JPY</span>
            <input type="number" placeholder="e.g. 15000" value={jpy} onChange={e => setJpy(e.target.value)}
              style={{ flex:1, padding:'8px 12px', fontSize:14, fontFamily:'"DM Mono",monospace', border:'1px solid #ccc', borderRadius:3, background:'#fff', color:'#0e0e0e', outline:'none' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:10 }}>
            {[['GBP','£',rates.GBP],['USD','$',rates.USD],['EUR','€',rates.EUR]].map(([key,sym,rate]) => (
              <div key={key} style={{ border:'1px solid #e2e0d8', borderRadius:3, padding:'10px 12px', background:'#f7f6f2' }}>
                <div style={{ fontSize:10, color:'#aaa', marginBottom:3 }}>{key}</div>
                <div style={{ fontSize:20, fontWeight:500, fontFamily:'"Shippori Mincho",serif', color:'#0e0e0e' }}>
                  {jpy ? `${sym}${convert(rate)}` : '—'}
                </div>
                <div style={{ fontSize:10, color:'#aaa', marginTop:2 }}>¥1 = {sym}{rate.toFixed(6)}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:10, color:'#aaa' }}>Source: European Central Bank via frankfurter.app</div>
        </div>
      )}
    </div>
  );
}
