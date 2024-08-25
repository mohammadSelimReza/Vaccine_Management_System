import { jwtDecode } from "jwt-decode";
import Banner from "../Pages/Banner/Banner";
import PeopleComments from "../Pages/PeopleComments/PeopleComments";
import VaccineCategory from "../Pages/VaccineCategory/VaccineCategory";
import VaccineImportant from "../Pages/VaccineImportant/VaccineImportant";
import { useState } from "react";
import api from "../../api";

const Home = () => {
  const [user,setUser] = useState("");
  const token = localStorage.getItem("access");
  if(token){
    const decode = jwtDecode(token);
    console.log(decode);
    console.log(decode.user_id);
    setUser(api.get(`/user/users/${decode.user_id}/`))
  }

  return (
    <div>
      <h1 className="text-center">{user.username} </h1>
      <Banner></Banner>
      <VaccineCategory></VaccineCategory>
      <VaccineImportant></VaccineImportant>
      <PeopleComments></PeopleComments>
    </div>
  );
};

export default Home;
