import {useContext} from "react"
import Banner from "./components/Banner";
import Domains from "./components/Domains";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/context";



function App() {
  const {currentAccount} = useContext(AppContext);
  if(!currentAccount) return <Login />
  return (
    <div className="">
      <Navbar />
      <Banner />
      <Domains />
    </div>
  );
}

export default App;
