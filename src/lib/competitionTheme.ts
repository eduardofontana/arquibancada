import type { CSSProperties } from "react";

interface CompetitionTone {
  kicker: string;
  bg: string;
  text: string;
  border: string;
}

function normalizeCompetition(competition: string): string {
  return competition.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getCompetitionTone(competition: string): CompetitionTone {
  const key = normalizeCompetition(competition);

  if (key.includes("brasileirao") || key.includes("serie a") || key.includes("serie b")) {
    return {
      kicker: "Brasileiro",
      bg: "#15803d",
      text: "#ffffff",
      border: "rgba(21, 128, 61, 0.32)",
    };
  }

  if (key.includes("copa do brasil")) {
    return {
      kicker: "Copa BR",
      bg: "#c1121f",
      text: "#ffffff",
      border: "rgba(193, 18, 31, 0.32)",
    };
  }

  if (key.includes("libertadores")) {
    return {
      kicker: "Liberta",
      bg: "#000000",
      text: "#ffffff",
      border: "#000000",
    };
  }

  if (key.includes("sul-americana")) {
    return {
      kicker: "Sul-Americana",
      bg: "#c1121f",
      text: "#ffffff",
      border: "rgba(193, 18, 31, 0.32)",
    };
  }

  return {
    kicker: "Futebol",
    bg: "#000000",
    text: "#ffffff",
    border: "#000000",
  };
}

export function getCompetitionToneStyle(competition: string): CSSProperties {
  const tone = getCompetitionTone(competition);
  return {
    "--competition-bg": tone.bg,
    "--competition-text": tone.text,
    "--competition-border": tone.border,
  } as CSSProperties;
}
