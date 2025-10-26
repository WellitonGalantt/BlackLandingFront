import { useEffect, useMemo, useRef, useState } from "react";

type CountdownProps = {
  /** Data-alvo (ISO) ex.: "2025-11-29T23:59:59-03:00" */
  target: string | Date;
  /** Callback quando zerar (opcional) */
  onExpire?: () => void;
};

type TLeft = { days: number; hours: number; minutes: number; seconds: number };

const pad2 = (n: number) => String(Math.max(0, n)).padStart(2, "0");
const clampLeft = (t: TLeft): TLeft =>
  Object.fromEntries(
    Object.entries(t).map(([k, v]) => [k, Math.max(0, v as number)])
  ) as TLeft;

function diffToLeft(target: Date): TLeft {
  const now = new Date().getTime();
  const end = target.getTime();
  let delta = Math.max(0, end - now) / 1000; // seg

  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600);
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60);
  delta -= minutes * 60;
  const seconds = Math.floor(delta);

  return { days, hours, minutes, seconds };
}

export default function Countdown({ target, onExpire }: CountdownProps) {
  const targetDate = useMemo(
    () => (target instanceof Date ? target : new Date(target)),
    [target]
  );

  const [left, setLeft] = useState<TLeft>(() => diffToLeft(targetDate));
  const expired = useMemo(
    () =>
      left.days === 0 &&
      left.hours === 0 &&
      left.minutes === 0 &&
      left.seconds === 0,
    [left]
  );

  const firedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      const next = diffToLeft(targetDate);
      setLeft(next);
      if (
        !firedRef.current &&
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        firedRef.current = true;
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [targetDate, onExpire]);

  const safe = clampLeft(left);

  return (
    <section
      className="w-full bg-[#0048A3] text-[--color-white-primary] py-6"
      aria-live="polite"
      aria-atomic="true"
      role="timer"
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-[1.3rem] tracking-[0.35em] uppercase opacity-90 mb-3 text-white-primary">
          FALTA APENAS
        </p>

        <div className="flex items-end justify-center gap-4 sm:gap-6 text-white-primary">
          <TimeBlock value={safe.days} label="DIAS" />
          <Separator />
          <TimeBlock value={safe.hours} label="HORAS" />
          <Separator />
          <TimeBlock value={safe.minutes} label="MINUTOS" />
          <Separator />
          <TimeBlock value={safe.seconds} label="SEGUNDOS" />
        </div>

        {expired ? (
          <p className="mt-3 text-xs opacity-80">Promoção encerrada.</p>
        ) : (
          <p className="text-[1.1rem] tracking-[0.5em] uppercase opacity-90 mt-5 text-white-primary">
            PARA O GRANDE DIA!
          </p>
        )}
      </div>
    </section>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="pb-1 text-4xl sm:text-[8rem] font-extrabold leading-none opacity-80"
    >
      :
    </span>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-[4.5ch] sm:min-w-[5ch]">
      <div className="tabular-nums text-[9rem] sm:text-[9rem] font-extrabold leading-none">
        {pad2(value)}
      </div>
      <div className="mt-2 text-[1rem] tracking-[0.35em] uppercase opacity-80">
        {label}
      </div>
    </div>
  );
}
