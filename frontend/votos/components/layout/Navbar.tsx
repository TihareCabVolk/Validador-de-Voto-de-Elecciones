import { C } from "@/components/voting/theme";

export default function Navbar() {
  return (
    <nav
      style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: C.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: C.textPrimary,
              lineHeight: 1.2,
            }}
          >
            Sistema de Validacion Electoral
          </p>
          <p style={{ fontSize: 11, color: C.textSecondary, lineHeight: 1.2 }}>
            Padron Electoral - Elecciones 2026
          </p>
        </div>
      </div>

    </nav>
  );
}
