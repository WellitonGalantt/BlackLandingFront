import categoriaNotebookImg from "../assets/img/categoriesNotbook.png";
import categoriaTvImg from "../assets/img/categoriesTv.png";
import categoriaSmartwatchImg from "../assets/img/categoriesSmartwatch.png";
import categoriaVideoGamesImg from "../assets/img/categoriesVideoGames.png";
import categoriaAcessoriosImg from "../assets/img/categoriesAcessorios.png";

// CategoriesStrip.tsx
type Cat = { label: string; img: string; alt: string };

const CATEGORIES: Cat[] = [
  { label: "Notebooks",            img: categoriaNotebookImg,  alt: "Notebook gamer" },
  { label: "TVs",                  img: categoriaTvImg,         alt: "Televisor" },
  { label: "Smartwatch",           img: categoriaSmartwatchImg,      alt: "Relógio inteligente" },
  { label: "Games e Acessórios",   img: categoriaVideoGamesImg,    alt: "Console e controles" },
  { label: "Gadgets e Suportes",   img: categoriaAcessoriosImg,    alt: "Gadgets e suportes" },
];

export default function CategoriesStrip() {
  return (
    <section
      className="
        relative isolate overflow-hidden
        h-[300px]
        bg-[linear-gradient(135deg,#0D0B4A_0%,#002F9E_40%,#0080FF_100%)]
        text-white
      "
      aria-label="Categorias"
    >
      {/* brilho suave nas bordas (opcional) */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

      <div className="mx-auto h-full max-w-6xl px-6">
        <ul
          className="
            h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5
            items-center justify-items-center gap-6 md:gap-8
          "
        >
          {CATEGORIES.map((c) => (
            <li key={c.label} className="w-full flex flex-col items-center">
              {/* card visual */}
              <div
                className="
                  group w-[140px] sm:w-[150px] md:w-[160px]
                  flex flex-col items-center
                  transition-transform duration-300 ease-out
                  hover:scale-[1.04]
                "
                role="img"
                aria-label={c.alt}
              >
                {/* círculo com imagem */}
                <div
                  className="
                    relative aspect-square w-full rounded-full
                    bg-white shadow-[0_12px_32px_rgba(0,0,0,0.35)]
                    ring-1 ring-white/70
                    flex items-center justify-center
                    overflow-hidden
                    transition-transform duration-300
                    group-hover:-translate-y-1
                  "
                >
                  <img
                    src={c.img}
                    alt={c.alt}
                    className="
                      h-[70%] w-[70%] object-contain
                      drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]
                      transition-transform duration-300
                      group-hover:scale-[1.06]
                    "
                    loading="lazy"
                  />
                </div>

                {/* label */}
                <span
                  className="
                    mt-3 text-sm sm:text-[0.95rem]
                    font-medium tracking-wide text-white/90
                    text-center leading-snug
                  "
                >
                  {c.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* linha glow inferior opcional */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0048A3] via-[#00A8FF] to-[#6B00E3]/90" />
    </section>
  );
}
