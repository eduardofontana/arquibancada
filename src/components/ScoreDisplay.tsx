interface ScoreDisplayProps {
  homeScore: number;
  awayScore: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-5xl",
  lg: "text-7xl md:text-8xl",
};

export function ScoreDisplay({ homeScore, awayScore, size = "md", animated = false }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
      <div
        className={`${sizeClasses[size]} font-bold min-w-[2ch] text-center ${animated ? "animate-pulse" : ""}`}
        style={{
          textShadow: "0 0 26px rgba(193,18,31,0.18)",
        }}
      >
        {homeScore}
      </div>
      <span className="text-[var(--muted)] text-xl sm:text-2xl md:text-4xl font-light">x</span>
      <div
        className={`${sizeClasses[size]} font-bold min-w-[2ch] text-center ${animated ? "animate-pulse" : ""}`}
        style={{
          textShadow: "0 0 26px rgba(193,18,31,0.18)",
        }}
      >
        {awayScore}
      </div>
    </div>
  );
}




