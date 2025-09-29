import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-base text-muted-foreground mb-4">Seite nicht gefunden</p>
        <Link to="/" className="underline underline-offset-4">
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
