import React, {useContext} from 'react'
import { AppContext } from '../context/context'
const Login = () => {
    const {connectWallet} = useContext(AppContext)
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <div className=" text-center flex flex-col items-center justify-center space-y-4">
            <h1 className="text-xl md:text-4xl font-semibold md:font-bold text-center">Please Switch to Goerli Network.</h1>
        <button className="bg-pink-600 text-white rounded-md h-10 w-36 hover:cursor-pointer flex items-center justify-center" onClick={e => connectWallet()}>Connect Wallet</button>
        </div>
    </div>
  )
}

export default Login