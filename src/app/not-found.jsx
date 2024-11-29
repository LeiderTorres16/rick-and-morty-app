import { Navbar } from "@/components";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-slate-100 w-full h-screen overflow-hidden antialiased text-slate-300 selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center bg-[#c7c6d9]">
        <h1 className="text-9xl font-extrabold text-black tracking-widest">404</h1>
        <div className="bg-blue-800 px-2 text-sm rounded rotate-12 absolute text-white">
          Pagina no encontrada
        </div>
        <button className="mt-5">
          <Link
            className="relative inline-block text-sm font-medium text-blue-800 group active:text-blue-500 focus:outline-none focus:ring"
            href="/navigation/home"
          >
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 text-blue-800 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-blue-800 border border-current text-white border-blue-800">
              Volver al Inicio
            </span>
          </Link>
        </button>
      </main>
    </div>
  );
}
