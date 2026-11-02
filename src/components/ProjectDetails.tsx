import React, { useEffect } from "react";
import Image from "next/image";
import { TfiClose } from "react-icons/tfi";
import { TiArrowRight, TiStar } from "react-icons/ti";
import { motion } from "motion/react";
import type { Project } from "@/types";

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm bg-black/60"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <motion.div
        className="relative max-w-2xl border shadow-sm rounded-2xl mx-4
        bg-gradient-to-l from-black to-neutral-800 border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute p-2 rounded-sm top-5 right-5 bg-black hover:bg-gray-700 transition-colors cursor-pointer text-white z-10"
        >
          <TfiClose className="w-6 h-6" />
        </button>
        <Image
          src={project.image}
          alt={project.title}
          className="w-full rounded-t-2xl object-cover"
          width={640}
          height={360}
          priority
        />
        <div className="p-5">
          <h5
            id={`project-title-${project.id}`}
            className="mb-2 text-2xl font-bold text-white"
          >
            {project.title}
          </h5>
          <p className="mb-3 font-normal text-neutral-50">
            {project.description}
          </p>
          {project.subDescription.map((subDesc, index) => (
            <p key={index} className="flex items-center gap-2 text-neutral-200 text-sm mt-1">
              <TiStar className="shrink-0 text-white" />
              <span>{subDesc}</span>
            </p>
          ))}
          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <Image
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover-animation"
                  width={40}
                  height={40}
                />
              ))}
            </div>
            <div className="bg-white rounded-4xl p-3 font-medium hover-animation cursor-pointer text-black">
              <a
                href={project.href}
                className="inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project <TiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
