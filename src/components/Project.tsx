import React, { useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import type { Project as ProjectType } from "@/types";
import ProjectDetails from "./ProjectDetails";
import GradientDivider from "./ui/GradientDivider";

interface ProjectProps {
  project: ProjectType;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Project = ({ project, setPreview }: ProjectProps) => {
  const { title, image, tags } = project;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <article
        className="flex-wrap items-center justify-between pt-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(undefined)}
      >
        <div>
          <h3 className="text-2xl font-bold text-black">{title}</h3>
          <div className="flex gap-5 mt-2 text-gray-700">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={openModal}
          aria-label={`Read details about ${title}`}
          className="flex items-center gap-1 cursor-pointer hover-animation text-black"
        >
          Read More <TiArrowRight />
        </button>
        <GradientDivider />
      </article>

      {isModalOpen && (
        <ProjectDetails
          key={project.id}
          project={project}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Project;
