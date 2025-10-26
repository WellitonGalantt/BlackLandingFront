export default function Footer() {
  return (
    <footer
      className="
          w-full bg-black-primary
          text-white/80 text-sm
          py-6 px-6 md:px-10
          flex flex-col md:flex-row items-center justify-between gap-3
          border-t border-white/10
        "
    >
      <p className="text-center md:text-left">
        © {new Date().getFullYear()} Lead2Revenue. Todos os direitos reservados.
      </p>

      <p className="text-center md:text-right">
        Powered by{" "}
        <span className="font-semibold text-white">@wellitongalant</span>
      </p>
    </footer>
  );
}
