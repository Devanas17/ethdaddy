const Banner = () => {
    return (
        <header className="bg-gray-400 px-5 py-6">
        <p className="pt-16 mb-6 mx-16 font-semibold uppercase">Seek and buy available domain names</p>
        <h2 className="font-bold mx-16 mb-5 text-2xl md:text-3xl lg:text-5xl max-w-[470px]">It all begins with a domain name.</h2>
        <div className="flex mb-10 mx-16">
          <input
            type="text"
            className=" h-[40px] md:h-[60px] min-w-[30%] px-5 outline-none border-0"
            placeholder="Find your domain"
          />
          <button
            type="button"
            className=' bg-black text-white text-xs sm:text-sm md:text-base h-[40px] md:h-[60px] px-5'
          >
            Buy It
          </button>
        </div>
      </header>
    );
  }
  
  export default Banner;