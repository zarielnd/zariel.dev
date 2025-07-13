import React from 'react'
import { TfiClose } from 'react-icons/tfi'
import { TiArrowRight } from 'react-icons/ti';
import {motion, scale} from 'motion/react'

interface Tag {
  id: number;
  name: string;
  path: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  subDescription: string[];
  href: string;
  image: string;
  tags: Tag[];
}

interface ProjectProps {
  project: ProjectData;
  onClose: () => void;
}

const ProjectDetails = ({project, onClose}:ProjectProps) => {
  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm'
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
        <motion.div className='relative max-w-2xl border shadow-sm rounded-2xl 
        bg-gradient-to-l from-black to-neutral-800 border-white/10'
        initial={{opacity: 0, scale:0.5}}
        animate={{ opacity: 1, scale:1}}
        >
            <button 
              onClick={onClose}
              className='absolute p-2 rounded-sm top-5 right-5 bg-black hover:bg-gray-700 transition-colors'
            >
                <TfiClose className='w-6 h-6' />          
            </button>
            <img src={project.image} alt={project.title} className='w-full rounded-t-2xl'/>
            <div className='p-5'>
                <h5 className='mb-2 text-2xl font-bold text-white'>{project.title}</h5>
                <p className='mb-3 font-normal text-neutral-50'>{project.description}</p>
                {project.subDescription.map((subDesc, index) =>(
                    <p key={index}>{subDesc}</p>
                ))}
                <div className='flex items-center justify-between mt-4'>
                    <div className='flex gap-2'>
                        {project.tags.map((tag) => (
                            <img key={tag.id} src={tag.path} alt={tag.name} 
                            className='rounded-lg size-10 hover-animation'></img>
                        ))}
                    </div>
                    <a href={project.href} className='inline-flex items-center gap-1 font-medium hover-animation cursor-pointer'>
                        View Project <TiArrowRight/>
                    </a>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ProjectDetails