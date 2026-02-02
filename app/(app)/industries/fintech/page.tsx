"use client";
import {hero} from "@/constants/industries/fintech.json"
import HeroSection from "@/components/HeroSection/HeroSection";


function page() {
  return (
    <div>
        <HeroSection
        title={hero.title}
        description={hero.description}
        button={{text:hero.button.text,bgColor:hero.button.bgColor,onClick:()=>{}}}
        loadCounter={hero.loadCounter}
        />
    </div>
  )
}

export default page