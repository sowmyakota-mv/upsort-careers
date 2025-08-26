import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegistrationForm from "./components/RegistrationForm";
import AssessmentForm from "./components/AssessmentForm";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./ScrollToTop";
import AboutPage from "./components/AboutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop /> 
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/assessment" element={<AssessmentForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
