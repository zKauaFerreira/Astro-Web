import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Planos from "./pages/Planos";
import Mensal from "./pages/Mensal";
import Trimestral from "./pages/Trimestral";
import Anual from "./pages/Anual";
import Verified from "./pages/Verified";
import TermosUso from "./pages/TermosUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/mensal" element={<Mensal />} />
          <Route path="/trimestral" element={<Trimestral />} />
          <Route path="/anual" element={<Anual />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
