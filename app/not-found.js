"use client"


const NotFound = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center pt-40">
      <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'alt="notfound" className="h-80 w-auto mb-4"/>
      <h3 className="text-[#1C293A] font-bold text-2xl">Page not Found</h3>
      <p className="text-[#445366] font-semibold text-xl text-center">We are sorry, the page you requested could not be found.</p>
    </div>
  )
}

export default NotFound