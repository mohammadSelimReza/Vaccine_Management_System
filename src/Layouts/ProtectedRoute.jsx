import { Navigate } from "react-router";
import UserData from "../plugin/UserData";

const PrivateRoute = ({ children }) => {
  const user = UserData();
  console.log(user)
  return <> {user ? children : <Navigate to="/login" />} </>;
};

export default PrivateRoute;