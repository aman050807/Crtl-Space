import React, { useState } from 'react';
import SolarSystem from '/Users/amansharmavm/interstellar-proto/src/components/SloarSystem.jsx';

export default function App() {
  const [days, setDays] = useState(0);
  return (
    <div style={{height:'100vh', width:'100vw'}}>
      <SolarSystem days={days} />
      <div style={{
        position:'absolute', left:16, top:16, background:'rgba(0,0,0,0.45)', padding:12, borderRadius:10, color:'#e6eef8'
      }}>
        <h3 style={{margin:'0 0 6px 0'}}>Prototype</h3>
        <input type="range" min="0" max="365" value={days} onChange={(e)=>setDays(Number(e.target.value))} />
      </div>
    </div>
  );
}