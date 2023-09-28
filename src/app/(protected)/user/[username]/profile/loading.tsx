export default function Loading() {
  return (
    <div className="w-full bg-slate-200">
      <div className="w-full px-4 my-2 flex justify-center items-center flex-col gap-3 p-3">
        <p className="w-24 py-5 text-center animate-pulse bg-neutral-500 rounded-lg" />
        <p className="w-40 py-3 text-center animate-pulse bg-neutral-500 rounded-lg" />
      </div>
      <div className="w-full px-4 my-2 flex items-center justify-center flex-col gap-3">
        <div className="grid place-items-center">
          <p className="w-52 h-48 rounded-full animate-pulse bg-neutral-500  my-3" />
        </div>
        {Array.from({ length: 5 }).map((e, i) => (
          <p
            key={i}
            className="w-[75%] py-4 text-center animate-pulse bg-neutral-500 rounded-md my-3"
          />
        ))}
      </div>
      <div className="w-full px-4 my-2 flex items-center justify-center flex-col gap-3">
        {Array.from({ length: 5 }).map((e, i) => (
          <p
            key={i}
            className="w-[75%] py-4 text-center animate-pulse bg-neutral-500 rounded-md my-3"
          />
        ))}
      </div>
    </div>
  );
}
