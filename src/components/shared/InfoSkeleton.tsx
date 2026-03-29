// components/skeletons/InfoSkeleton.tsx
export const InfoSkeleton = () => {
  return (
    <div className="min-h-screen bg-transparent p-12 animate-pulse">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Espacio para la imagen grande */}
        <div className="w-full md:w-1/2 h-125 bg-slate-900/50 rounded-[3rem] border border-white/5" />
        
        {/* Espacio para los stats */}
        <div className="w-full md:w-1/2 space-y-8 py-10">
          <div className="h-4 w-32 bg-blue-600/20 rounded-full" />
          <div className="h-20 w-full bg-slate-900/50 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 w-full bg-slate-800 rounded-lg" />
            <div className="h-6 w-5/6 bg-slate-800 rounded-lg" />
            <div className="h-6 w-4/6 bg-slate-800 rounded-lg" />
          </div>
          <div className="h-16 w-48 bg-blue-600/20 rounded-full mt-10" />
        </div>
      </div>
    </div>
  );
};