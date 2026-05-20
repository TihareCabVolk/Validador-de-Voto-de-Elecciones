import { C } from "@/components/voting/theme";

type ErrorCardProps = {
  code: number;
  message: string;
};

export default function ErrorCard({ code, message }: ErrorCardProps) {
  const is404 = code === 404;
  const is400 = code === 400;
  const bg = is400 ? C.warnBg : C.noBg;
  const color = is400 ? C.warnText : C.noText;
  const icon = is400 ? "WARN" : "USR";
  const title = is400 ? "RUT invalido" : "Votante no encontrado";
  const desc = is400
    ? "El RUT debe ser un numero entero sin puntos ni guiones."
    : message;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: bg,
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
          {title}
        </p>
        <p style={{ fontSize: 12, color: C.textSecondary }}>{desc}</p>
      </div>
    </div>
  );
}
