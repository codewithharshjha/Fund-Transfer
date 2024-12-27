import Image from "next/image";
import Navebar from "./components/Navebar";
import Welcome from "./components/Welcome";
import Services from "./components/Services";
import Transactions from "./components/Transactions";
import Footer from "./components/Footer";

export default function Home() {
  return (
   <div className=" min-h-screen">
    <div className=" gradient-bg-welcome">
      <Navebar/>
      <Welcome/>
    </div>
   <Services/>
   <Transactions/>
   <Footer/>
   </div>
  );
}
