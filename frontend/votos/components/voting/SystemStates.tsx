import { C } from "@/components/voting/theme";

type SystemStatesProps = {
  status: "idle" | "loading" | "success" | "error";
  code?: number;
};

const CHIPS = [
  { key: "idle", label: "Idle", match: "idle" },
  { key: "loading", label: "Loading", match: "loading" },
  { key: "success", label: "Apto / No apto", match: "success" },
  { key: "e404", label: "No encontrado (404)", match: "error", code: 404 },
  { key: "e400", label: "RUT invalido (400)", match: "error", code: 400 },
] as const;

export default function SystemStates({ status, code }: SystemStatesProps) {
  return (
    <section>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: C.textTertiary,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        Estados del sistema
      </p>
      <div className="card" style={{ padding: "1rem 1.5rem" }}>
        <p style={{ fontSize: 13, color: C.textSecondary }}>
          Seccion reservada para monitoreo interno.
        </p>
      </div>
    </section>
  );
}
