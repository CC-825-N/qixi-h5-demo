type AtmosphereProps = { intensity?: "quiet" | "stars" | "warm" | "parallel" };

export default function Atmosphere({ intensity = "quiet" }: AtmosphereProps) {
  return (
    <div className={`atmosphere atmosphere--${intensity}`} aria-hidden="true">
      <div className="sky" /><div className="stars stars-a" /><div className="stars stars-b" />
      <div className="aurora" /><div className="cloud cloud-a" /><div className="cloud cloud-b" />
      <div className="cloud cloud-c" /><div className="grain" /><div className="vignette" />
    </div>
  );
}
