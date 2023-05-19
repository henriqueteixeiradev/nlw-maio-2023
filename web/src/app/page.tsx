export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left */}
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes " />
      </div>

      {/* Right */}
      <div className="flex flex-col p-16">
        <div className="flex flex-1 items-center justify-center ">
          <p className="text-center leading-relaxed w-[360px]">
            Você ainda não registrou nenhuma lembraça.{" "}
            <a href="/new" className="underline hover:text-gray-50">
              criar agora
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
