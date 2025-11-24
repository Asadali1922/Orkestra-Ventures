import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Partners from "./pages/Partners";
import Mentors from "./pages/Mentors";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import AdminContacts from "./pages/AdminContacts";
import AdminNewsletter from "./pages/AdminNewsletter";
import AdminSettings from "./pages/AdminSettings";
import AdminLeads from "./pages/AdminLeads";
import AdminCohorts from "./pages/AdminCohorts";
import AdminMentors from "./pages/AdminMentors";
import AdminFinancials from "./pages/AdminFinancials";
import AdminWebEditor from "./pages/AdminWebEditor";
import AdminHR from "./pages/AdminHR";
import AdminAccounting from "./pages/AdminAccounting";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
  
  return (
    <>
      {!isAdminRoute && <Navigation />}
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/programs"} component={Programs} />
        <Route path={"/partners"} component={Partners} />
        <Route path={"/mentors"} component={Mentors} />
        <Route path={"/apply"} component={Apply} />
        <Route path={"/contact"} component={Contact} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/applications" component={AdminApplications} />
        <Route path="/admin/contacts" component={AdminContacts} />
        <Route path="/admin/newsletter" component={AdminNewsletter} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/cohorts" component={AdminCohorts} />
        <Route path="/admin/mentors" component={AdminMentors} />
        <Route path="/admin/financials" component={AdminFinancials} />
        <Route path="/admin/web-editor" component={AdminWebEditor} />
        <Route path="/admin/hr" component={AdminHR} />
        <Route path="/admin/accounting" component={AdminAccounting} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      {!isAdminRoute && <Footer />}
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
