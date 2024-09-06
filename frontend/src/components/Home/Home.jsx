import { useEffect, useState } from "react";
import Banner from "../Pages/Banner/Banner";
import ContactUs from "../Pages/ContactUs/ContactUs";
import PeopleComments from "../Pages/PeopleComments/PeopleComments";
import VaccineCategory from "../Pages/VaccineCategory/VaccineCategory";
import VaccineImportant from "../Pages/VaccineImportant/VaccineImportant";
import api from "../../api";
import Loading from 'react-fullscreen-loading';
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/user/users")
      .then((res) => res.data)
      .then((data) => setData(data));
    setLoading(false);
  }, []);
  // console.log(data);
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
          <Loading loading background="#3498db" loaderColor="#3498db" />
        </div>
      )}
      {/* Main Content */}
      {!loading && (
        <>
          <Banner></Banner>
          <VaccineCategory></VaccineCategory>
          <VaccineImportant></VaccineImportant>
          <PeopleComments></PeopleComments>
          <ContactUs></ContactUs>
        </>
      )}
    </>
  );
};

export default Home;
