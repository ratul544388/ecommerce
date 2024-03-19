import { Hero } from "@/components/hero";
import { db } from "@/lib/db";
import { AboutOurCloth } from "./_components/about-our-cloth";
import { CategoryHero } from "./_components/category-hero";
import { MainCategories } from "./_components/main-categories";
import { NewArrival } from "./_components/new-arrival";
import { Suspense } from "react";
import { RevealInView } from "@/components/reveal-in-view";
import { Container } from "@/components/container";

export default async function Home() {
  const categoryHeros = await db.categoryHero.findMany();

  const fallback = <div>Loading...</div>;
  return (
    <div className="h-full pb-10">
      <Hero />
      <Container className="flex flex-col w-full items-center gap-6">
        <MainCategories />
        <div className="flex flex-col gap-20">
          <Suspense fallback={fallback}>
            <NewArrival />
          </Suspense>
          {categoryHeros.map(({ id, image, categories }) => (
            <Suspense fallback={fallback} key={id}>
              <CategoryHero key={id} image={image} categories={categories} />
            </Suspense>
          ))}
          <AboutOurCloth />
        </div>
      </Container>
    </div>
  );
}
