import { useLocation, Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/i18n";

const NotFound = () => {
  const location = useLocation();
  const { lang = "en" } = useParams();
  const { t } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-base text-muted-foreground mb-4">Page not found</p>
        <Link to={`/${lang}/`} className="underline underline-offset-4">
          {t("nav.backHome") || "Back to home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
