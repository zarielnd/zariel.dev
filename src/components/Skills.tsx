import React from "react";
import HackedText from "./HackedText";
import BentoCard from "./BentoCard";
import { getSkillCategories } from "@/lib/skills";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const categories = getSkillCategories();
  useGSAP(() => {
    const titleElement = document.querySelector("#title");
    if (titleElement) {
      gsap.fromTo(
        titleElement,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleElement,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        },
      );

      ScrollTrigger.create({
        trigger: titleElement,
        start: "top 80%",
        end: "top 40%",
        onEnter: () => {
          const hackedTextElement = document.querySelector(
            "#hacked-text-Skills",
          );
          if (hackedTextElement) {
            hackedTextElement.dispatchEvent(new Event("mouseover"));
          }
        },
        onEnterBack: () => {
          const hackedTextElement = document.querySelector(
            "#hacked-text-Skills",
          );
          if (hackedTextElement) {
            hackedTextElement.dispatchEvent(new Event("mouseover"));
          }
        },
      });
    }
  }, []); // ✅ Correct placement of closing bracket and dependency array

  return (
    <section className="bg-black pb-52 skills-container">
      {" "}
      {/* Add skills-container class */}
      <div id="title" className="container px-3 md:px-10">
        <div className=" py-8">
          <HackedText className="font-bold drop-shadow-lg select-none hero-heading">
            Skills
          </HackedText>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-3 md:px-10">
        {categories.map((category, index) => (
          <div key={category.id} className="relative w-full">
            <BentoCard
              title={category.title}
              skills={category.items}
              isMiddleCard={index === Math.floor(categories.length / 2)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
