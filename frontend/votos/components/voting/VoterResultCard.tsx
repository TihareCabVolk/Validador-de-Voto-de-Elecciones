import type { Votante } from "@/types/Votante";
import { C } from "@/components/voting/theme";
import VoterStatusBadge from "@/components/voting/VoterStatusBadge";

type VoterResultCardProps = {
  votante: Votante;
};

function initials(name: string, lastname: string) {
  return `${name?.[0] ?? ""}${lastname?.[0] ?? ""}`.toUpperCase();
}

export default function VoterResultCard({ votante }: VoterResultCardProps) {
  const ini = initials(votante.name, votante.lastname);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: C.primaryLight,
              color: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 600,
              flexShrink: 0,
              border: `1px solid ${C.primaryBorder}`,
            }}
          >
            {ini}
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary }}>
              {votante.name} {votante.lastname}
            </p>
            <p style={{ fontSize: 12, color: C.textSecondary }}>
              RUT: {votante.rut}
            </p>
          </div>
        </div>
        <VoterStatusBadge habilitado={votante.habilitado} />
      </div>

      <hr
        style={{
          border: "none",
          borderTop: `1px solid ${C.border}`,
          margin: "0 0 14px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 20px",
          marginBottom: 14,
        }}
      >
        {([
          ["Nombre", votante.name],
          ["Apellido", votante.lastname],
          ["RUT", votante.rut],
          ["Edad", `${votante.age} anos`],
        ] as const).map(([label, value]) => (
          <div key={label}>
            <p
              style={{
                fontSize: 11,
                color: C.textTertiary,
                marginBottom: 2,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: C.textPrimary }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          background: C.bg,
          fontSize: 12,
          color: C.textSecondary,
          border: `1px solid ${C.border}`,
        }}
      >
        INFO: {votante.habilitado
          ? "Ciudadano mayor de 18 anos - habilitado segun padron electoral."
          : `Menor de edad (${votante.age} anos) - no habilitado para votar.`}
      </div>
    </div>
  );
}
