import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import HackedText from "./HackedText";
import Project from "./Project";
import GradientDivider from "./ui/GradientDivider";
import { myProjects } from "@/data/projects";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const [preview, setPreview] = useState<string | undefined>(undefined);

  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="relative c-space bg-white"
      onMouseMove={handleMouseMove}
    >
      <HackedText
        tag="h2"
        className="text-left font-bold !text-black select-none hero-heading"
      >
        My Selected Projects
      </HackedText>
      <GradientDivider />
      {myProjects.map((project) => (
        <Project key={project.id} project={project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="hidden lg:block fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          alt="Featured project interactive preview"
        />
      )}
    </section>
  );
};

export default Projects;
