// app/components/ui/Loading.tsx

type LoadingProps = {
  message?: string;
  type?: "spinner" | "skeleton";
};

export default function Loading({ 
  message = "Loading...", 
  type = "spinner" 
}: LoadingProps) {
  if (type === "skeleton") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 py-20 px-6">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-12 shadow-2xl">
            <div className="h-12 bg-slate-700 rounded-lg w-3/4 mx-auto mb-10"></div>
            <div className="space-y-6">
              <div className="h-6 bg-slate-700 rounded w-full"></div>
              <div className="h-6 bg-slate-700 rounded w-11/12"></div>
              <div className="h-6 bg-slate-700 rounded w-10/12"></div>
              <div className="h-6 bg-slate-700 rounded w-9/12"></div>
            </div>
            <div className="mt-12 flex justify-center">
              <div className="h-12 bg-slate-700 rounded-lg w-56"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Spinner por defecto
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-6">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-slate-200 mb-3">{message}</h2>
        <p className="text-slate-400">Please Wait...</p>
      </div>
    </div>
  );
}