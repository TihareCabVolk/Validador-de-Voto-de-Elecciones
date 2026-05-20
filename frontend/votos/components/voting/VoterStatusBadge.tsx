import { C } from "@/components/voting/theme";

type VoterStatusBadgeProps = {
  habilitado: boolean;
};

export default function VoterStatusBadge({ habilitado }: VoterStatusBadgeProps) {
  if (habilitado) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          borderRadius: 99,
          background: C.aptoBg,
          color: C.aptoText,
          border: `1px solid ${C.aptoBorder}`,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        APTO PARA VOTAR
      </span>
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 99,
        background: C.noBg,
        color: C.noText,
        border: `1px solid ${C.noBorder}`,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      NO APTO
    </span>
  );
}
