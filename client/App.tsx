import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";

const queryClient = new QueryClient();

function Header() {
  return (
    <header className="border-b">
      {/* flag ribbon removed */}
      <div className="max-w-3xl mx-auto px-4 py-6 flex items-baseline justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          freepalestine.sh
        </Link>
        <span className="text-sm text-muted-foreground">
          independent journalism. 
        </span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col gap-2">
        <p>
          © {new Date().getFullYear()} <Link to="/" className="underline underline-offset-4">freepalestine.sh</Link>
        </p>
        <p>
        </p>
      </div>
    </footer>
  );
}



function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8" data-flag-scope>
        {children}
      </main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post/:slug" element={<Post />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
