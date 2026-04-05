'use client';
import { useState } from 'react';

const SIZES = {
  tops: { headers:['JP','UK/EU','US','Chest (cm)'], rows:[['XS','XS','XS','82–86'],['S','S','S','86–90'],['M','M','M','90–94'],['L','L','L','94–98'],['XL','XL','XL','98–104'],['XXL','2XL','2XL','104–110']], note:'JP sizing runs 1–2 sizes smaller than UK/US. Always check brand size chart. Look for chest cm in listing description.' },
  bottoms: { headers:['JP Waist','UK','US','Inseam (cm)'], rows:[['64','24"','24"','72–76'],['68','26"','26"','75–78'],['72','28"','28"','78–81'],['76','30"','30"','79–82'],['80','32"','32"','80–83'],['84','34"','34"','81–84'],['88','36"','36"','82–85']], note:'Inseam lengths in Japan are often shorter (72–80cm). 30" ≈ 76cm. Check inseam if you\'re tall.' },
  shoes: { headers:['JP cm','UK','US (M)','EU'], rows:[['24.0','5.5','6.5','38'],['24.5','6','7','38.5'],['25.0','6.5','7.5','39'],['25.5','7','8','40'],['26.0','7.5','8.5','40.5'],['26.5','8','9','41'],['27.0','8.5','9.5','42'],['27.5','9','10','43'],['28.0','9.5','10.5','43.5'],['28.5','10','11','44'],['29.0','10.5','11.5','45']], note:'JP shoe sizes = foot length in cm. Nike Japan often shows JP cm + US sizing together.' },
};

export default function SizeGuide() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('tops');
  const data = SIZES[tab];
  const tabStyle = (a) => ({ fontSize:10, padding:'5px 12px', cursor:'pointer', fontFamily:'"DM Mono",monospace', background:a?'#0e0e0e':'transparent', border:'none', color:a?'#fff':'#777' });
  const thStyle = { textAlign:'left', padding:'5px 8px', color:'#aaa', fontWeight:400, borderBottom:'1px solid #e2e0d8', fontSize:10 };
  const tdStyle = { padding:'5px 8px', color:'#3a3a3a', borderBottom:'1px solid #e2e0d8', fontSize:11 };
  return (
    <div style={{ border:'1px solid #e2e0d8', borderRadius:3, background:'#fff', marginBottom:'1rem', overflow:'hidden' }}>
      <div style={{ padding:'10px 14px', borderBottom:open?'1px solid #e2e0d8':'none', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', userSelect:'none' }} onClick={() => setOpen(!open)}>
        <span style={{ fontSize:11, letterSpacing:'0.06em', color:'#3a3a3a' }}>JP SIZE GUIDE — clothing & shoes</span>
        <span style={{ fontSize:12, color:'#aaa' }}>{open?'▲':'▼'}</span>
      </div>
      {open && (
        <div style={{ padding:14 }}>
          <div style={{ display:'flex', border:'1px solid #e2e0d8', borderRadius:2, overflow:'hidden', width:'fit-content', marginBottom:12 }}>
            {['tops','bottoms','shoes'].map(t => <button key={t} style={tabStyle(tab===t)} onClick={() => setTab(t)}>{t.toUpperCase()}</button>)}
          </div>
          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:200, overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead><tr>{data.headers.map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                <tbody>{data.rows.map((row,i) => <tr key={i}>{row.map((c,j) => <td key={j} style={tdStyle}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <div style={{ flex:1, minWidth:160 }}>
              <div style={{ fontSize:10, color:'#aaa', marginBottom:8 }}>NOTES</div>
              <div style={{ fontSize:11, color:'#777', lineHeight:1.7 }}>{data.note}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
