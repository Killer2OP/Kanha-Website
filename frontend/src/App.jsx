import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Home from "./pages/Home";
import MapViewPage from "./pages/MapView";
import OnlineSafariBooking from "./pages/OnlineSafariBooking";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import PayNow from "./pages/PayNow";
import Contact from "./container/main/contact-us/Contact";
import ProtectedRoute from "./pages/Admin/components/ProtectedRoute";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/Policy";

// Admin Panel Routes
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Not Found page component
const NotFound = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Preload assets only for the Home route */}
                <Helmet>
                  <link
                    rel="preload"
                    href="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Kanha.png"
                    as="image"
                  />
                  <link
                    rel="preload"
                    href="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/KanhaBg.mp4"
                    as="video"
                    type="video/mp4"
                  />
                </Helmet>
                <Home />
              </>
            }
          />
          <Route path="/map" element={<MapViewPage />} />
          <Route
            path="/safari-booking"
            element={
              <>
                <Helmet>
                  <link
                    rel="preload"
                    href="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Safari.jpg"
                    as="image"
                  />
                </Helmet>
                <OnlineSafariBooking />
              </>
            }
          />
          <Route
            path="/tour-packages"
            element={
              <>
                <Helmet>
                  <link
                    rel="preload"
                    href="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Jungle.jpg"
                    as="image"
                  />
                </Helmet>
                <Tours />
              </>
            }
          />
          <Route
            path="/hotels-resorts"
            element={
              <>
                <Helmet>
                  <link
                    rel="preload"
                    href="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Resort.jpg"
                    as="image"
                  />
                </Helmet>
                <Hotels />
              </>
            }
          />
          <Route
            path="/hotels-resorts/:slug"
            element={
              <>
                <Helmet>
                  <link
                    rel="preload"
                    href="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Resort.jpg"
                    as="image"
                  />
                </Helmet>
                <HotelDetail />
              </>
            }
          />
          <Route path="/tour/:tourId" element={<TourDetail />} />
          <Route path="/pay-now" element={<PayNow />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/tour/:tourId" element={<TourDetail />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* 404 route - always keep this last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
