import { Link } from "react-router";
import BaseHeader from "../../PartialComponent/BaseHeader";
import BaseFooter from "../../PartialComponent/BaseFooter";

export default function NotFound() {
  return (
        <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="relative z-50">
          <BaseHeader />
        </div>
  
        {/* Main Content - Takes remaining space */}
        <div className="flex-grow">
          <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3 fw-semibold text-dark">Oops! Page Not Found</h2>
            <p className="text-muted">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-main mt-3 px-4 py-2">
              Go Home
            </Link>
          </div>
        </div>
  
        {/* Footer at Bottom */}
        <BaseFooter />
      </div>
  );
}