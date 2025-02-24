import BaseFooter from "../../PartialComponent/BaseFooter";
import BaseHeader from "../../PartialComponent/BaseHeader";
import Banner from "./Banner/Banner";
import ConsultationForm from "./ConsultationForm/ConsultationForm";
import DoctorInvite from "./DoctorJoin/DoctorInvite";
import FAQSection from "./FAQ/Faq";
import Newsletter from "./Newsletter/Newsletter";
import StepsSection from "./StepSections/StepSections";
import TestingServices from "./TestingServices/TestingServices";
import ImmunizationTips from "./Tips/Tips";
import VaccineInfo from "./VaccineInfo/VaccineInfo";
import VideoShowing from "./VideoShowing/VideoShowing";

const Index = () => {
  return (
    <div className="relative">
      <div className="relative z-50">
        <BaseHeader />
      </div>
      <div className="relative lg:mb-96">
        <Banner />
        <div className="md:absolute md:-bottom-2/3 md:left-1/2 md:transform md:-translate-x-1/2 mb-4">
          <ConsultationForm />
        </div>
      </div>
      <div className="lg:mb-24">
        <TestingServices />
      </div>
      <VideoShowing />
      <div className="md:relative lg:mb-56">
        <ImmunizationTips />
        <div className="md:absolute md:-bottom-1/3 md:left-1/2 md:transform md:-translate-x-1/2 mb-4">
          <StepsSection />
        </div>
      </div>
      <VaccineInfo />
      <FAQSection />
      <DoctorInvite />
      <Newsletter />
      <BaseFooter />
    </div>
  );
};

export default Index;
