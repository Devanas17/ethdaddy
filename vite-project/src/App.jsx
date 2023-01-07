import {useContext} from "react"
import Banner from "./components/Banner"
import Navbar from "./components/Navbar"
import {AppContext} from "./context/context"

function App() {

  return (
    <div className="">
      <Navbar />
      <Banner />
    </div>
  )
}

export default App
