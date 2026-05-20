"use client";

import { useState } from "react";

import { C } from "@/components/voting/theme";

type VoteSearchFormProps = {
  rut: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onRutChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSamplePick: (value: string) => void;
  disabled: boolean;
  samples: string[];
};

export default function VoteSearchForm({
  rut,
  inputRef,
  onRutChange,
  onSubmit,
  onKeyDown,
  onSamplePick,
  disabled,
  samples,
}: VoteSearchFormProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>
          Verificacion por RUT
        </p>
      </div>
      <p style={{ fontSize: 13, color: C.textSecondary, marginBottom: 14 }}>
        Ingresa el RUT del votante (solo numeros) para consultar su habilitacion.
      </p>

      <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: C.textSecondary,
              marginBottom: 6,
            }}
          >
            Numero de RUT
          </label>
          <input
            ref={inputRef}
            className="rut-input"
            type="text"
            value={rut}
            onChange={(event) => onRutChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ej: 15987452"
            maxLength={12}
            disabled={disabled}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={disabled}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            height: 42,
            padding: "0 20px",
            background: disabled
              ? C.primaryHover
              : hover
                ? C.primaryHover
                : C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Consultar
        </button>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: C.textTertiary }}>Prueba:</span>
        {samples.map((value) => (
          <button
            key={value}
            onClick={() => onSamplePick(value)}
            style={{
              fontSize: 12,
              color: C.primary,
              background: C.primaryLight,
              border: `1px solid ${C.primaryBorder}`,
              borderRadius: 5,
              padding: "2px 8px",
              cursor: "pointer",
            }}
            type="button"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
