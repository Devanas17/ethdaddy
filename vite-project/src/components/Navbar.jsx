import React, {useContext} from 'react'
import logo from '../assets/logo.svg';
import { AppContext } from '../context/context';


const Navbar = () => {
    const {currentAccount, connectWallet} = useContext(AppContext)
  return (
    <nav className=' flex items-center justify-between px-5 py-4 border-b' >
      <div className='nav__brand flex items-center '>
        <img src={logo} className="object-contain h-8 w-8" alt="Logo" />
        <h1 className='font-bold text-2xl'>ETH Daddy</h1>

        <ul className=' ml-8 hidden lg:flex items-center space-x-4'>
          <li className='font-medium text-sm text-gray-500'><a href="/">Domain Names</a></li>
          <li className='font-medium text-sm text-gray-500'><a href="/">Websites & Hosting</a></li>
          <li className='font-medium text-sm text-gray-500'><a href="/">Commerce</a></li>
          <li className='font-medium text-sm text-gray-500'><a href="/">Email & Marketing</a></li>
        </ul>
      </div>

      {currentAccount ? (
        <button
          type="button"
          className='bg-black text-white px-5 py-2'
        >
          {currentAccount.slice(0, 6) + '...' + currentAccount.slice(-5)}
        </button>
      ) : (
        <button
          type="button"
          className='bg-black text-white px-5 py-2'
          onClick={() => connectWallet()}
        >
          Connect
        </button>
      )}
    </nav>
  )
}

export default Navbar