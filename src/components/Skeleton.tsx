interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[rgba(0,0,0,0.08)] rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="surface-card flex items-center gap-4 p-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6 w-20 mx-auto" />
      </div>
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="bg-[rgba(193,18,31,0.06)] p-4 border-b border-[rgba(21,128,61,0.2)]">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="p-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-[rgba(21,128,61,0.1)] last:border-0">
            <Skeleton className="w-6 h-6" />
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            {[...Array(8)].map((_, j) => (
              <Skeleton key={j} className="w-6 h-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LiveMatchSkeleton() {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}