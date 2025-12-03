"use client";

import dynamic from "next/dynamic";

export const ConferenceMapClient = dynamic(
  () => import("./conference-map").then((mod) => ({ default: mod.ConferenceMap })),
  { ssr: false }
);
