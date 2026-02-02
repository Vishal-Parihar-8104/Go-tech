import React from 'react'
import ResponsiveAppBar from '@/components/header';
import '../globals.css';
import Footer from '@/components/footer';
import BookingPopup from '@/components/BookingPopup/BookingPopup';
import Blog from '@/app/blog/page';
interface AppLayoutProps {
  children: React.ReactNode;
}

function Applayout({children}: AppLayoutProps) {
  return (
    <div className='overflow-x-hidden'>
        <ResponsiveAppBar />
       {/* for test first blog is call */}
        <Blog />

        <main>{children}</main>
        <Footer />
        
    </div>
  )
}

export default Applayout

