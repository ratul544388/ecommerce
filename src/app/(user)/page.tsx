import { Hero } from "@/components/hero";
import { AboutOurCloth } from "./_components/about-our-cloth";
import { MainCategories } from "./_components/main-categories";
import { CategoryHero } from "./_components/category-hero";
import { db } from "@/lib/db";

export default async function Home() {
  const categoryHeros = await db.categoryHero.findMany();
  return (
    <div className="h-full space-y-6 pb-10">
      <Hero />
      <div className="h-full space-y-14 pt-[50vh]">
        <MainCategories />
        <div className="max-w-screen-lg px-5 mx-auto space-y-5">
          {categoryHeros.map(({ id, image, categories }) => (
            <CategoryHero key={id} image={image} categories={categories} />
          ))}
          <AboutOurCloth />
        </div>
      </div>
    </div>
  );
}
