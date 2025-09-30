import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import { I18nProvider } from "./i18n";
import LanguageBar from "./components/LanguageBar";
import React from "react";

const queryClient = new QueryClient();

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

import { useParams, Outlet } from "react-router-dom";
import { useI18n } from "./i18n";
import { LANGUAGES } from "./i18n/languages";

function Header() {
  const { lang } = useParams();
  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between gap-6">
        <a href={`/${lang || 'en'}`} className="text-2xl font-semibold tracking-tight">
          freepalestine.sh
        </a>
        <LanguageBar currentLang={(lang as any) || 'en'} />
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col gap-2">
        <p>
          © {new Date().getFullYear()} <a href="/en" className="underline underline-offset-4">freepalestine.sh</a>
        </p>
        <p className="opacity-70">{t('site.tagline')}</p>
      </div>
    </footer>
  );
}

function I18nWrapper() {
  const { lang } = useParams();
  return (
    <I18nProvider forcedLang={lang}>
      <Layout>
        <Outlet />
      </Layout>
    </I18nProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path=":lang" element={<I18nWrapper />}> 
            <Route index element={<Index />} />
            <Route path="post/:slug" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);