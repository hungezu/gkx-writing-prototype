export default function ProgressRing({value, label}: {value:number;label:string}) {
  const progress = Math.min(100, Math.max(0, value));
  return <span className="report-progress-ring" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${progress}%`} title={`${label}：${progress}%（原型演示）`} style={{background:`conic-gradient(var(--color-primary) ${progress}%, #c8d9ff 0)`}} />;
}
