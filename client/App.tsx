import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useParams
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";

import { I18nProvider, useI18n } from "@/i18n";
import LanguageBar from "@/components/LanguageBar";

const queryClient = new QueryClient();

function LangLayout() {
  const { lang } = useParams();
  const supported = ["en","de","fr","zh","ru","ar","fa"];
  const active = supported.includes(lang || "") ? (lang as string) : "en";
  return (
    <I18nProvider lang={active as any}>
      <Layout>
        <Outlet />
      </Layout>
    </I18nProvider>
  );
}

function Header() {
  const { lang } = useParams();
  const { t } = useI18n();
  const current = lang || "en";
  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <Link to={`/${current}/`} className="text-2xl font-semibold tracking-tight">
          {t("site.title") || "freepalestine.sh"}
        </Link>
        <LanguageBar />
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
          © {new Date().getFullYear()} <span className="underline underline-offset-4">{t("site.title") || "freepalestine.sh"}</span>
        </p>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8" data-flag-scope>
        {children}
      </main>
      <Footer />
    </div>
  );
}

const AppShell = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en/" replace />} />
          <Route path=":lang/" element={<LangLayout />}>
            <Route index element={<Index />} />
            <Route path="post/:slug" element={<Post />} />
          </Route>
          <Route path="*" element={<Navigate to="/en/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<AppShell />);
