import React from 'react'
import { ArrowRight } from 'lucide-react';
import StatCounter from '../StatCountDiv/StatCountDiv';
import { usePathname, } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';

//if no loadcounter 

const loadCounter=[
  {
    limit :100,
    suffix:"+",
    title:"Projects Completed",
  }
]
function HeroSection({title="SAMPLE",loadCounter=[],description="",children=null,button={text:"",bgColor:"#f97316",onClick:()=>{}}}: {title?:string; loadCounter?: any[]; description?:string; children?: React.ReactNode; button?: {text?:string; bgColor?:string; onClick?:()=>void}}) {
  const buttonStyle = {
    backgroundColor: button?.bgColor || "#f97316"
  };
  
  return (
   <section> 
    
    <div className="relative bg-gray-50 min-h-screen overflow-hidden"> 

    <Breadcrumbs aria-label="breadcrumb" className="p-4">
      {usePathname().split('/').slice(1).map((segment, index, arr) => {
        const path = '/' + arr.slice(0, index + 1).join('/');
        const isLast = index === arr.length - 1;
        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return isLast ? (
          <span key={path} className="text-gray-500">{formattedSegment}</span>
        ) : (
          <Link key={path} href={path} className="text-blue-600 hover:underline">{formattedSegment}</Link>
        );
      })}
    </Breadcrumbs>
      
      {/* 1. DOTTED PATTERN - Positioned relative to the HERO section */}
      <div className="absolute left-0 top-[50%] w-64 h-96 pointer-events-none z-0">
        <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle, #2b428c 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
            maskImage: 'radial-gradient(circle at 0% 50%, black 50%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 50%, transparent 80%)',
            opacity: 0.2
          }}
        />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
          
          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-[#2b428c] text-5xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-[#2b428c] text-xl max-w-md">
{description}            </p>
           {button.text && <button style={buttonStyle} className="flex items-center gap-2 px-6 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" onClick={button.onClick}>{button.text} <ArrowRight /></button>}
          </div>

          {/* RIGHT STATS */}
          {loadCounter.length === 0 ? (
            <div className="absolute right-0 top-[50%] w-64 h-96 pointer-events-none z-0">
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'radial-gradient(circle, #2b428c 1.5px, transparent 1.5px)',
                  backgroundSize: '18px 18px',
                  maskImage: 'radial-gradient(circle at 0% 50%, black 50%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 50%, transparent 80%)',
                  opacity: 0.2
                }}
              />
            </div>
          ) : (
            <div className="lg:w-1/2 w-2/3">
              <div className="grid  sm:grid-cols-2 gap-6 items-start">
                <div className="space-y-6">
                  <StatCounter {...loadCounter[0]} uppercase={true} />
                  <StatCounter {...loadCounter[2]} uppercase={true} />
                </div>
                <div className="space-y-6 sm:mt-12">
                  <StatCounter {...loadCounter[1]} uppercase={true} />
                  <StatCounter {...loadCounter[3]} uppercase={true} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {children}
        </div>
      </section>
   </div>
   </section>
  )
}

export default HeroSection