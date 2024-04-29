import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import ContextProvider from "./context/ContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <App />
    </ThemeProvider>
  </ContextProvider>
);
