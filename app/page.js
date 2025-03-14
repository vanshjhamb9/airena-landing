"use client";

import Image from "next/image";

import Navbar from "@/Components/Nav";
import Hero from "@/Components/Hero";

import TournamentMatchup from "@/Components/Onevone";

import React, { useEffect } from 'react';

import CategoryPills from '@/Components/home/CategoryPills';
import FoundersClub from '@/Components/home/FoundersClub';
import LeaderboardSection from '@/Components/home/LeaderboardSection';

import EventsSection from '@/Components/home/EventsSection';
import SHero from "@/Components/Secondhero";
import VideoSec from "@/Components/Videosec";

import VideoSlider from "@/Components/VideoSlider";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <Hero />
        {/* <HeroSection /> */}

        <SHero/>
  
        <div className="bg-black p-6">
          <CategoryPills />

          {/* <div className="max-w-6xl mx-auto px-4 py-8">
            <TournamentCard />
          </div> */}
          <VideoSec />

          <TournamentMatchup/>

          

          <FoundersClub />

          <LeaderboardSection />

         <VideoSlider/>

          {/* <VideoSection withPagination={true} /> */}

          <EventsSection />
        </div>
      </main>

      <footer className="bg-black py-8 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Airena. All rights reserved. A premium gaming and sports streaming platform.
          </p>
        </div>
      </footer>
    </div>
  );
}