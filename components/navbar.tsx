import Image from 'next/image'

const Navbar = () => {
  return (
    <>
        <nav className="fixed bg-black/50 top-0 flex justify-between items-center mx-1 h-14 w-full z-50">
            <div className="relative w-1/2 flex items-center justify-start">
                <span className='flex flex-col justify-around w-1/6 h-full mx-2 my-2 md:hidden'>
                    <span className="w-10 h-1 my-1 bg-white"></span>
                    <span className="w-10 h-1 my-1 bg-white"></span>
                    <span className="w-10 h-1 my-1 bg-white"></span>
                </span>
                <span className="relative w-24 h-8 md:w-32 md:h-10 mx-2 my-2 md:mx-4 md:my-3">
                    <Image src="/netflix-logo.png" alt="Netflix Logo" layout="fill"/>
                </span>
                <span className="hidden md:inline-block text-xl font-bold text-red-600 md:ml-8">Browse</span>
            </div>
            <div className="w-1/2 flex justify-center items-center px-4">
                <input className="w-3/4 px-2 mx-2 border-2 border-white bg-black/70" type="text" placeholder="Search" />
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