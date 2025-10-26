import Countdown from "../../components/Countdown";
import celularTabletImg from "../../assets/img/tabletsCelulares.png";
import fonesCaixaDeSom from "../../assets/img/fonesCaixaDeSom.png";
import CategoriesStrip from "../../components/CategoriesStrip";
import LeadForm from "../../components/LeadForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function App() {
  const bannerContent = Array.from({ length: 16 }) // Cria uma array com 16 espacos
    .map(
      (
        _,
        index //Fazendo um map no array criado acima e adicionando os elementos, o map ja retorna um novo array
      ) => (
        <span key={index} className="text-[1.3rem] mx-5 text-black">
          <span className="font-extrabold">BLACK</span> FRIDAY
        </span>
      )
    );
  // (
  //   <>
  // <span className="text-[1.3rem] mx-5 text-black">
  //   <span className="font-extrabold">BLACK</span> FRIDAY
  // </span>
  //   </>
  // );

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full bg-black-primary h-[60rem] text-white-primary">
        <h1 className="cursor-default text-[180px]/[85%] font-extrabold uppercase">
          Black
        </h1>
        <h1 className="cursor-default text-[180px]/[85%] font-extrabold px-[1.5rem] italic border-font bg-gradient-to-r from-purple-gradiente via-purple-gradiente-2 to-80% to-purple-gradiente-3 uppercase">
          Friday
        </h1>

        <div className="cursor-default relative flex flex-col">
          <p className="text-[3rem]/[120%] font-normal ">Até</p>
          <p className="font-extrabold text-[14rem]/[70%]">
            70<span className="absolute text-[9rem]/[90%] top-[1.5rem]">%</span>
            <span className="text-[4rem]/[90%] uppercase font-bold">off</span>
          </p>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-[1.1rem] font-bold tracking-wider cursor-pointer mt-[5rem] px-[4rem] py-[1rem] rounded-full text-white-primary bg-gradient-to-r from-purple-gradiente via-purple-gradiente-2 to-90% to-purple-gradiente-3 uppercase hover:shadow-lg hover:shadow-purple-gradiente hover:scale-105 duration-300 
  ease-in-out"
        >
          Nao quero perder!
        </button>
      </div>

      <div className="z-10 relative bg-blue-primary w-full h-[30rem]">
        <div className="flex items-center overflow-hidden absolute top-[-0.5rem] bg-yellow-promo w-[100%] h-[3.4rem] rotate-[-0.5deg]">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {/* Renderiza o primeiro conjunto de spans */}
            {bannerContent}

            {/* Renderiza o segundo conjunto EXATAMENTE IGUAL para o loop contínuo */}
            {bannerContent}
          </div>
        </div>

        <div className="flex w-full h-full items-center justify-center">
          <Countdown
            target="2025-11-29T23:59:59-03:00"
            onExpire={() => {
              // opcional: trocar banner, esconder CTA, etc.
              console.log("Contador zerou!");
            }}
          />
        </div>

        <div className="flex items-center overflow-hidden absolute bottom-[-0.5rem] bg-yellow-promo w-[100%] h-[3.4rem] rotate-[-0.5deg]">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {/* Renderiza o primeiro conjunto de spans */}
            {bannerContent}

            {/* Renderiza o segundo conjunto EXATAMENTE IGUAL para o loop contínuo */}
            {bannerContent}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-black-primary w-full h-[26rem]">
        <span className="max-w-[1280px] text-[2.6rem] text-center font-extrabold uppercase text-white-primary tracking-[0.24em]">
          todos os tipos de produtos para você aproveitar!{" "}
        </span>
      </div>

      {/* Banner 01 */}

      <section className="flex items-center justify-center px-[320px] w-full h-[600px] relative overflow-hidden rounded-none isolate">
        {/* Fundo com gradiente moderno */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0D0B4A_0%,#002F9E_40%,#0080FF_100%)]" />

        <div className="mx-auto max-w-6xl grid md:grid-cols-2 items-center gap-8 px-6 py-12 md:py-20">
          {/* Texto e CTA */}
          <div className="text-center md:text-left text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              TABLETS E CELULARES
            </h2>
            <p className="mt-4 text-base md:text-lg opacity-90">
              Os melhores preços em smartphones, tablets e acessórios!
            </p>
          </div>

          {/* Imagem do produto */}
          <div className="flex justify-center md:justify-end">
            <img
              src={celularTabletImg}
              alt="Tablets e Celulares"
              className="max-h-72 md:max-h-110 w-auto object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* Borda inferior luminosa */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#0048A3] via-[#00A8FF] to-[#6B00E3]" />
      </section>

      {/* Banner 02 */}

      <section className="flex items-center justify-center px-[320px] w-full h-[600px] relative overflow-hidden rounded-none isolate">
        {/* Fundo com gradiente moderno */}
        <div className="absolute inset-0 -z-10 bg-white-primary" />

        <div className="mx-auto max-w-6xl grid md:grid-cols-2 items-center gap-8 px-6 py-12 md:py-20">
          {/* Imagem do produto */}
          <div className="flex justify-center md:justify-end">
            <img
              src={fonesCaixaDeSom}
              alt="Tablets e Celulares"
              className="max-h-72 md:max-h-110 w-auto object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>

          {/* Texto e CTA */}
          <div className="text-center md:text-left text-black-primary">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              TABLETS E CELULARES
            </h2>
            <p className="mt-4 text-center md:text-lg opacity-90">
              O som que acompanha o seu ritmo.
            </p>
          </div>
        </div>

        {/* Borda inferior luminosa */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#0048A3] via-[#00A8FF] to-[#6B00E3]" />
      </section>
      <CategoriesStrip />

      <section className="flex flex-col items-center justify-center bg-black-primary w-full h-[300px]">
        <h2 className="flex flex-col text-yellow-promo text-[3xl] md:text-[5rem] font-extrabold tracking-tight drop-shadow-lg uppercase leading-none">
          e muito mais!
          <span className="text-white-primary text-[3xl] md:text-[3.4rem]">
            ta esperando o que?
          </span>
        </h2>
      </section>

      <LeadForm />

      <Footer />
    </>
  );
}

export default App;
