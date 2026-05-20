"use client";

import { useRef, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import ErrorCard from "@/components/voting/ErrorCard";
import LoadingCard from "@/components/voting/LoadingCard";
import VoteSearchForm from "@/components/voting/VoteSearchForm";
import VoterResultCard from "@/components/voting/VoterResultCard";
import { C } from "@/components/voting/theme";
import { getVotante } from "@/services/getVotante";
import type { ApiError } from "@/types/ApiError";
import type { Votante } from "@/types/Votante";

type ViewState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Votante }
  | { status: "error"; code: number; message: string };

const SAMPLES = ["15987452", "18456321", "20145789", "17654322"];

function isValidRut(value: string) {
  return (
    value &&
    !Number.isNaN(Number(value)) &&
    !value.includes(".") &&
    !value.includes(",") &&
    Number.isInteger(Number(value))
  );
}

export default function Home() {
  const [rut, setRut] = useState("");
  const [state, setState] = useState<ViewState>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showResult = state.status !== "idle";

  async function handleConsultar() {
    const value = rut.trim();
    if (!isValidRut(value)) {
      setState({ status: "error", code: 400, message: "RUT invalido" });
      return;
    }

    setState({ status: "loading" });

    try {
      const data = await getVotante(value);
      setState({ status: "success", data });
    } catch (err) {
      const apiError = err as ApiError;
      setState({
        status: "error",
        code: apiError.code,
        message: apiError.message,
      });
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleConsultar();
    }
  }

  function pickSample(value: string) {
    setRut(value);
    setState({ status: "idle" });
    inputRef.current?.focus();
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: ${C.bg}; }
        .rut-input {
          width: 100%;
          height: 42px;
          padding: 0 12px;
          border: 1px solid ${C.borderMd};
          border-radius: 8px;
          font-size: 15px;
          color: ${C.textPrimary};
          background: ${C.surface};
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .rut-input:focus {
          border-color: ${C.primary};
          box-shadow: 0 0 0 3px ${C.primaryLight};
        }
        .card {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
        }
      `}</style>

      <Navbar />
      <main style={{ maxWidth: 740, margin: "0 auto", padding: "2rem 1.25rem" }}>
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
          Consulta de votante
        </p>
        <VoteSearchForm
          rut={rut}
          inputRef={inputRef}
          onRutChange={setRut}
          onSubmit={handleConsultar}
          onKeyDown={handleKeyDown}
          onSamplePick={pickSample}
          disabled={state.status === "loading"}
          samples={SAMPLES}
        />

        {showResult && (
          <>
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
              Resultado
            </p>
            <div className="card">
              {state.status === "loading" && <LoadingCard />}
              {state.status === "success" && (
                <VoterResultCard votante={state.data} />
              )}
              {state.status === "error" && (
                <ErrorCard code={state.code} message={state.message} />
              )}
            </div>
          </>
        )}

      </main>
    </>
  );
}
