export function TemperScale({
  variant = 'divider',
  showMarks = false,
  className = '',
}: {
  /** 'divider' spans full width; 'underline' is compact for headings; 'bar' is taller with tick marks. */
  variant?: 'divider' | 'underline' | 'bar';
  showMarks?: boolean;
  className?: string;
}) {
  const height = variant === 'underline' ? 'h-2.5' : variant === 'bar' ? 'h-4' : 'h-2';

  return (
    <div className={className} aria-hidden="true">
      <div className={`grid w-full grid-cols-4 overflow-hidden ${height}`}>
        <span className="bg-temper-straw" />
        <span className="bg-temper-bronze" />
        <span className="bg-temper-purple" />
        <span className="bg-temper-blue" />
      </div>
      {showMarks ? (
        <div className="mt-1.5 grid grid-cols-4 font-mono text-[0.7rem] font-bold tracking-[0.14em] uppercase opacity-75">
          <span>01 · 420°F</span>
          <span>02 · 480°F</span>
          <span>03 · 540°F</span>
          <span>04 · 590°F</span>
        </div>
      ) : null}
    </div>
  );
}

/** Glowing full-bleed temper-run seam marking where one section's heat meets the next. */
export function HeatSeam({ className = '' }: { className?: string }) {
  return <div className={`heat-seam ${className}`} aria-hidden="true" />;
}
