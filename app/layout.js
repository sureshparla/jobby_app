'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/Components/Navbar/page'
import { usePathname,useRouter} from 'next/navigation'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

  const loginPathName = usePathname();
  const token = Cookies.get('jwtToken')
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()
  
  useEffect(()=>{
    document.title = `jobbyApp`
    if(token === undefined){
      router.push('/login')
    }
  },[token])

  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling behavior
    });
  };

  

  return (
    <html lang="en">
      <body className={inter.className}>
        {loginPathName === '/login' ? null : <Navbar />}
        {children}
        {isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <AiOutlineArrowUp />
        </button>
      )}
        </body>
    </html>
  )
}
