import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Providers } from "@/provider";
import { Router } from "@/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>
);
