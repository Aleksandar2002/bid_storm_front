import Header from "../../shared/components/global/Header";
import UnauthorizedHeader from "../../shared/components/global/UnauthorizedHeader";
import { useAuthStore } from "../../app/stores/authStore";
import ImageParalax from "./ImageParalax";
import HowItWorks from "./HowItWorks";
import TopCategories from "./TopCategories";
import Footer from "../../shared/components/global/Footer";
import SharedGlobalComponents from "../../layouts/SharedGlobalComponents";
import TopSellers from "./TopSellers";

const LandingPage = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="landing-page">
      {user ? <Header /> : <UnauthorizedHeader />}
      <ImageParalax />
      <HowItWorks />
      <TopCategories />
      <TopSellers />
      <Footer />
      <SharedGlobalComponents />
    </div>
  );
};

export default LandingPage;
