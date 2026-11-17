export default function ProgressRing({value, label}: {value:number;label:string}) {
  const progress = Math.min(100, Math.max(0, value));
  return <span className="progress-indicator" role="progressbar" tabIndex={0} aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${progress}%`}><span className="report-progress-ring" aria-hidden="true" style={{background:`conic-gradient(var(--color-primary) ${progress}%, #c8d9ff 0)`}}/><span className="progress-tooltip" aria-hidden="true">生成进度 {progress}%</span></span>;
}
