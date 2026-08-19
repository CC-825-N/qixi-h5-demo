import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EncounterExperience from "../app/components/EncounterExperience";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EncounterExperience />
  </StrictMode>,
);
