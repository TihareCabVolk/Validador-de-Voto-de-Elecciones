import { C } from "@/components/voting/theme";

export default function EndpointBadge() {
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: "monospace",
        padding: "3px 8px",
        borderRadius: 6,
        background: C.bg,
        color: C.textSecondary,
        border: `1px solid ${C.border}`,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          background: C.aptoBg,
          color: C.aptoText,
          padding: "1px 5px",
          borderRadius: 3,
        }}
      >
        GET
      </span>
      /votante/:rut
    </span>
  );
}
