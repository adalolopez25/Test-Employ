
const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-center w-full bg-slate-900 ${className}`}>
      <div className="max-w-7xl w-full px-4 sm:px-6 py-4 mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Container;
