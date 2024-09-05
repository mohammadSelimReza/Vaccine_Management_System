import Banner from "../Pages/Banner/Banner";
import ContactUs from "../Pages/ContactUs/ContactUs";
import PeopleComments from "../Pages/PeopleComments/PeopleComments";
import VaccineCategory from "../Pages/VaccineCategory/VaccineCategory";
import VaccineImportant from "../Pages/VaccineImportant/VaccineImportant";

const Home = () => {


  return (
    <div>
      <Banner></Banner>
      <VaccineCategory></VaccineCategory>
      <VaccineImportant></VaccineImportant>
      <PeopleComments></PeopleComments>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
