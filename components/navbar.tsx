import Image from 'next/image'
import { useRef, useEffect } from 'react'

type navbarPropsType = {
    setIsOpen: ()=>void,
    closeMenu: ()=>void,
    isMobileMenuOpen: boolean
}
const Navbar = ({setIsOpen, isMobileMenuOpen, closeMenu}:navbarPropsType) => {
    let menuRef = useRef<HTMLLIElement>(null)
    let navRef = useRef<HTMLElement>(null)
    
  return (
    <>
        <nav ref={navRef} className={`fixed top-0 flex justify-between items-center mx-1 h-14 w-full z-50 ${isMobileMenuOpen? 'bg-black' : 'bg-black/50'}`}>
            <div className="relative w-1/2 flex items-center justify-start">
                <span className='flex flex-col justify-around w-1/6 h-full mx-2 my-2 md:hidden '
                    onClick={()=>{
                        setIsOpen()
                    }}
                >
                    <span className="w-10 h-1 my-1 bg-white"></span>
                    <span className="w-10 h-1 my-1 bg-white"></span>
                    <span className="w-10 h-1 my-1 bg-white"></span>
                </span>
                <span className="relative w-24 h-8 md:w-32 md:h-10 mx-2 my-2 md:mx-4 md:my-3">
                    <Image src="/netflix-logo.png" alt="Netflix Logo" layout="fill" priority/>
                </span>
                <ul>
                    <li ref={menuRef} className={`absolute md:relative flex flex-col md:flex-row z-10 bg-black md:bg-transparent w-[65vw] h-[100vh] md:w-auto md:h-auto top-12 md:top-0 md:left-0 ${isMobileMenuOpen ? '-left-1' : '-left-[65vw]'} ease-in-out duration-[50ms]`}>
                        <a className="inline-block p-4 text-2xl md:text-xl md:font-bold md:text-red-600 text-white lg:text-white ml-4 md:ml-8 my-4 cursor-pointer">Browse</a>
                        <a href="#action" className="inline-block md:hidden lg:inline-block p-4 text-2xl md:text-xl md:font-bold text-white ml-4 md:ml-8 my-4 cursor-pointer">Action</a>
                        <a href="#adventure" className="inline-block md:hidden lg:inline-block p-4 text-2xl md:text-xl md:font-bold text-white ml-4 md:ml-8 my-4 cursor-pointer">Adventure</a>
                        <a href="#comedy" className="inline-block md:hidden lg:inline-block p-4 text-2xl md:text-xl md:font-bold text-white ml-4 md:ml-8 my-4 cursor-pointer">Comedy</a>
                        <a href="#fantasy" className="inline-block md:hidden lg:inline-block p-4 text-2xl md:text-xl md:font-bold text-white ml-4 md:ml-8 my-4 cursor-pointer">Fantasy</a>
                        <a href="#history" className="inline-block md:hidden lg:inline-block p-4 text-2xl md:text-xl md:font-bold text-white ml-4 md:ml-8 my-4 cursor-pointer">History</a>
                    </li>
                </ul>
            </div>
            <div className="w-1/2 flex justify-end items-center px-4">
                {/* <input className="w-3/4 px-2 mx-2 border-2 border-white bg-black/70" type="text" placeholder="Search" /> */}
                <span className="w-7 aspect-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m11.25 11.25l3 3"/><circle cx="7.5" cy="7.5" r="4.75"/></g></svg>
                </span>
                <div className="hidden md:inline-flex justify-center items-center mx-2">
                    <span className="relative w-6 h-6">
                        <Image src="/user.png" alt="Netflix Logo" layout="fill"/>
                    </span>
                    <h3 className="text-lg text-white mx-2">User</h3>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar