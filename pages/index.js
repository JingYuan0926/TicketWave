import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ShinyButton from "../components/ui/shiny-button";
import Slider from '../components/Slider';
import ConcertCard from '../components/ConcertCard';

export default function Home() {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push('/events');
  };

  return (
    <div>
      {/* Either remove all concerIds to show all or -1
      <Slider/> */}
      <Slider concertIds={[7]} />
      <ConcertCard concertIds={[7]} />
      <div className="flex justify-center mt-4 mb-8">
        <div className="z-10 flex min-h-24 items-center justify-center p-8">
          <ShinyButton className="text-xl py-4 px-8" onClick={handleSeeMore}>
            See More Concerts
          </ShinyButton>
        </div>
      </div>
    </div>
  );
}