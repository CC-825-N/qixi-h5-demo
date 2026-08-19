"use client";
import { useEffect, useRef } from "react";
import { seeded } from "../lib/encounter";

export default function StarMap({ seed, compact = false }: { seed: number; compact?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const box = canvas.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = box.width * dpr; canvas.height = box.height * dpr;
    const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.scale(dpr, dpr);
    const rnd = seeded(seed); const w = box.width, h = box.height;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < (compact ? 65 : 105); i++) { const x = rnd() * w, y = rnd() * h, r = rnd() * 1.35 + .25; ctx.fillStyle = `rgba(255,255,255,${.18 + rnd() * .72})`; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
    const cx=w/2, cy=h*.53; ctx.lineWidth=1; ctx.shadowBlur=12; ctx.shadowColor="#ff9fbd";
    for (let i=0;i<5;i++) { ctx.strokeStyle=`rgba(${i%2?"151,181,255":"255,151,187"},${.18+i*.07})`; ctx.beginPath(); ctx.ellipse(cx,cy,28+i*16,12+i*8,(rnd()-.5)*1.2,0,Math.PI*2); ctx.stroke(); }
    ctx.strokeStyle="rgba(255,218,231,.72)"; ctx.beginPath(); ctx.moveTo(cx-110,cy-80); ctx.bezierCurveTo(cx-50,cy-48,cx-40,cy+58,cx,cy); ctx.bezierCurveTo(cx+45,cy-58,cx+68,cy+62,cx+118,cy+82); ctx.stroke();
    const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,34); glow.addColorStop(0,"rgba(255,255,255,.95)"); glow.addColorStop(.16,"rgba(255,142,178,.72)"); glow.addColorStop(1,"rgba(255,142,178,0)"); ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,34,0,Math.PI*2);ctx.fill();
  }, [seed, compact]);
  return <canvas ref={ref} className="star-map" aria-label="根据你们的信息生成的双人星轨图" />;
}
