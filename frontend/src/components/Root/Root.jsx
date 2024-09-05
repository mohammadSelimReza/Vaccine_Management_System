import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Header></Header>
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          duration: 6000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
