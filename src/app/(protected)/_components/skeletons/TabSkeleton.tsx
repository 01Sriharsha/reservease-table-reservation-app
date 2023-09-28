export default function TabSkeleton() {
  return (
    <div className="hidden md:flex gap-8 items-center w-full bg-neutral-100 mt-2">
      {Array.from({ length: 5 }).map((e, i) => {
        return (
          <span
            key={i}
            className={`text-lg font-bold border-b-2 w-24 h-14 bg-neutral-400 rounded-md animate-pulse`}
          />
        );
      })}
    </div>
  );
}
