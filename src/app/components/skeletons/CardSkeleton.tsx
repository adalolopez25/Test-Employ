export const CardSkeleton = () => {
  return (
    <div className="w-full max-w-70 h-105 rounded-2xl bg-slate-900/50 animate-pulse overflow-hidden border border-white/5">
      <div className="h-2/3 bg-slate-800" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-800 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-800 rounded w-full" />
          <div className="h-3 bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
};