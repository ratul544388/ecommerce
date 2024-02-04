import { Hero } from "@/components/hero";
import { MainCategories } from "./_components/main-categories";
import { NewArrival } from "./_components/new-arrival";
import { AboutOurCloth } from "./_components/about-our-cloth";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="h-full relative space-y-4 pb-10">
      <Hero />
      <MainCategories />
      <div className="max-w-screen-lg px-5 mx-auto space-y-5">
        <NewArrival />
        <AboutOurCloth />
      </div>
    </div>
  );
}
