export default function Dofe() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-black px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-6 p-6 text-[6rem] opacity-25 sm:grid-cols-6"
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i}>😿</span>
        ))}
      </div>

      <p
        className="relative z-10 text-center text-4xl font-black uppercase tracking-tight text-white sm:text-6xl"
        style={{
          fontFamily: "Impact, 'Arial Black', sans-serif",
          WebkitTextStroke: "2px black",
          textShadow: "3px 3px 0 #000",
        }}
      >
        dofe pre requirement task is so annoying
      </p>
    </main>
  );
}
