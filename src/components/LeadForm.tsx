import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

// ——— Helpers de normalização/validação ———
const normalizeName = (s: string) =>
  s
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|\s)\p{L}/gu, (m) => m.toUpperCase()); // capitaliza cada palavra

const cleanPhone = (s: string) => s.replace(/\D+/g, ""); // deixa só dígitos

const isValidPhoneBR = (digits: string) => {
  // Aceita 10 ou 11 dígitos (fixo/celular)
  return digits.length === 10 || digits.length === 11;
};

const formatPhoneBR = (digits: string) => {
  // Aplica máscara leve conforme tamanho
  if (digits.length <= 10) {
    // (xx) xxxx-xxxx
    return digits
      .replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_m, a, b, c) =>
        [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(" ")
      )
      .trim();
  }
  // 11 dígitos: (xx) xxxxx-xxxx
  return digits
    .replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_m, a, b, c) =>
      [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(" ")
    )
    .trim();
};

function validate(raw: Record<string, FormDataEntryValue>) {
  const errors: Errors = {};

  const nameRaw = String(raw.name ?? "");
  const emailRaw = String(raw.email ?? "");
  const phoneRaw = String(raw.phone ?? "");

  const name = normalizeName(nameRaw);
  const phoneDigits = cleanPhone(phoneRaw);
  const phone = formatPhoneBR(phoneDigits);

  // Regras simples
  if (name.length < 4) {
    errors.name = "Informe seu nome completo (mín. 4 caracteres).";
  }

  // Navegadores já validam type="email", mas reforçamos aqui (simples)
  const emailOk = /\S+@\S+\.\S+/.test(emailRaw);
  if (!emailOk) {
    errors.email = "Digite um e-mail válido.";
  }

  if (!isValidPhoneBR(phoneDigits)) {
    errors.phone = "Digite um número válido (10–11 dígitos).";
  }

  const values = {
    name,
    email: emailRaw.trim(),
    phone, // formatado para exibir
    phoneDigits, // só dígitos para enviar
    optin: String(raw.optin ?? "") === "on",
  };

  return { valid: Object.keys(errors).length === 0, errors, values };
}

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [phoneView, setPhoneView] = useState(""); // controle de máscara em tempo real

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // API nativa do navegador, guarda as informacoes do formulario com chave e valor, parecido com um objeto
    const data = new FormData(e.currentTarget);
    // Convertendo para objeto js
    // O data.entries() retorna um array com as informacoes
    // O Object.fromEntries() transforma o array em um objeto
    const raw = Object.fromEntries(data.entries());

    const { valid, errors, values } = validate(raw);
    setErrors(errors);

    if (!valid) {
      // foca no primeiro erro
      const firstField = Object.keys(errors)[0];
      if (firstField) {
        (
          e.currentTarget.querySelector(
            `#${firstField}`
          ) as HTMLInputElement | null
        )?.focus();
      }
      return;
    }

    // env nao funciona pois precisa do node e o front roda no navegador
    const url_api = import.meta.env.VITE_API_URL ?? "";

    // Exemplo de envio (descomente e adapte)
    const res = await fetch(url_api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const json = await res.json();

    if (!json.success) {
      setSentMessage(json.message);
      setSent(true);
      setTimeout(() => setSent(false), 6000);
      return;
    }

    setSentMessage(
      "🎉 Inscrição recebida! Em breve você recebe nossas ofertas."
    );
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    e.currentTarget.reset();
    setPhoneView(""); // reset máscara
    setErrors({});
  }

  // Máscara de telefone na digitação
  function onPhoneInput(ev: ChangeEvent<HTMLInputElement>) {
    const next = ev.target.value;
    const digits = cleanPhone(next);
    setPhoneView(formatPhoneBR(digits));
  }

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[linear-gradient(135deg,#0D0B4A_0%,#002F9E_40%,#0080FF_100%)]
        text-white
        py-12 md:py-16
      "
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-extrabold tracking-[0.12em] uppercase leading-tight text-2xl md:text-3xl">
          Cadastre-se e receba ofertas exclusivas antes
          <br className="hidden md:block" /> de todo mundo!
        </h2>

        <form
          id="form"
          onSubmit={onSubmit}
          noValidate
          className="
            mx-auto mt-8 w-full max-w-xl
            rounded-xl p-5 md:p-6 backdrop-blur
            bg-white/5 ring-1 ring-white/15
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          "
        >
          <Field
            id="name"
            label="Nome"
            placeholder="Seu nome completo aqui"
            autoComplete="name"
            error={errors.name}
          />

          <Field
            id="email"
            type="email"
            label="Email"
            placeholder="Digite seu melhor email"
            autoComplete="email"
            error={errors.email}
          />

          <Field
            id="phone"
            type="tel"
            label="Número de telefone"
            placeholder="Digite seu número de WhatsApp"
            autoComplete="tel"
            value={phoneView}
            onChange={onPhoneInput}
            error={errors.phone}
          />

          <label className="mt-3 flex items-start gap-3 text-sm text-white/85 cursor-pointer">
            <input
              className="mt-1 size-4 rounded border-0 bg-white/20 accent-[#00A8FF]"
              type="checkbox"
              name="optin"
              defaultChecked
            />
            <span>Sim, desejo receber novidades e promoções.</span>
          </label>

          <button
            type="submit"
            className="
              mt-6 w-full rounded-lg px-6 py-3 font-semibold uppercase tracking-wide
              bg-[linear-gradient(90deg,#0072FF_0%,#00A8FF_50%,#6B00E3_100%)]
              text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              transition-all hover:brightness-110 hover:-translate-y-[1px]
              focus:outline-none focus:ring-2 focus:ring-white/40 corsor-pointer
            "
          >
            Não quero perder!
          </button>

          {sent ? (
            <p className="mt-4 text-center text-sm text-emerald-200">
              {sentMessage}
            </p>
          ) : (
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-white/85">
              <li>🔒 Compra 100% Segura</li>
              <li>🚚 Entrega Rápida</li>
              <li>⭐ Ofertas Exclusivas</li>
            </ul>
          )}
        </form>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0048A3] via-[#00A8FF] to-[#6B00E3]/90" />
    </section>
  );
}

/* -------- Input Field com mensagem de erro -------- */

type FieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  pattern?: string;
  title?: string;
  value?: string; // para o telefone mascarado
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function Field({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  pattern,
  title,
  value,
  onChange,
  error,
}: FieldProps) {
  const hasError = Boolean(error);
  return (
    <div className="mt-3 first:mt-0">
      <label htmlFor={id} className="mb-1 block text-sm text-white/85">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        value={value}
        onChange={onChange}
        className={[
          "w-full rounded-md px-4 py-2.5 bg-white/[0.12] text-white placeholder-white/60 outline-none transition",
          hasError
            ? "ring-2 ring-red-400 focus:ring-red-400"
            : "ring-1 ring-white/15 focus:ring-2 focus:ring-[#00A8FF]",
        ].join(" ")}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
      />

      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
