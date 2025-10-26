export default function Header() {
  return (
    <header
      className="
          w-full bg-blue-primary
          px-4
          text-white
          py-4 px-6 md:px-10
          flex items-center justify-between
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        "
    >
      {/* logo / título simples */}
      <h1 className="text-lg md:text-xl font-semibold tracking-wide">
        Lead2Revenue
      </h1>

      {/* botão simples opcional */}
      <a
        onClick={() => {
          document
            .getElementById("form")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="
            hidden md:inline-block text-sm font-medium
            bg-white text-blue-primary
            px-4 py-2 rounded-md
            hover:brightness-110 transition-all
          "
      >
        Cadastrar-se
      </a>
    </header>
  );
}
