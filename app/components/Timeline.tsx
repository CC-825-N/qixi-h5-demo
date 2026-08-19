export default function Timeline({ name, missed = false }: { name: string; missed?: boolean }) {
  return (
    <div className={`timeline ${missed ? "timeline--missed" : ""}`} aria-label={missed ? "两条时间线擦肩而过" : "两条时间线在相识日交汇"}>
      <div className="timeline-label label-cc"><i />CC</div><div className="timeline-label label-you"><i />{name}</div>
      <div className="year y1">2023</div><div className="year y2">2024</div><div className="year y3">2025</div><div className="year y4">2026</div>
      <div className="path path-cc" /><div className="path path-you" />{!missed && <div className="meeting-flare" />}
    </div>
  );
}
