"use client"

import FeaturedAgents from "../components/FeaturedAgents";
import Footer from "../components/Footer";
import MainSection from "../components/MainSection";





const HomeView = ()=>{
 
  return (
    <div className="bg-background">
      <main>
        <MainSection/>
        <FeaturedAgents/>
      </main>
      <footer>
         <Footer/>
      </footer>
    </div>
  );
}
export default HomeView;