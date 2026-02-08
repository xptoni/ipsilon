import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ShipperDashboard from "./pages/ShipperDashboard";
import CarrierDashboard from "./pages/CarrierDashboard";
import CreateListing from "./pages/CreateListing";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import ListingSuccess from "./pages/ListingSuccess";
import BecomeCarrier from "./pages/BecomeCarrier";
import CarrierRegistration from "./pages/CarrierRegistration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ShipperDashboard />} />
          <Route path="/carrier-dashboard" element={<CarrierDashboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing-success" element={<ListingSuccess />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/become-carrier" element={<BecomeCarrier />} />
          <Route path="/carrier-registration" element={<CarrierRegistration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
