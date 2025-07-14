import React, { useState } from 'react'
import { TiArrowRight } from 'react-icons/ti'
import ProjectDetails from './ProjectDetails'

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
  setPreview: any;
}

const Project = ({project, setPreview}:ProjectProps) => {
  const { title, description, subDescription, href, image, tags } = project;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className='flex-wrap items-center justify-between pt-10 space-y-14 sm:flex sm:space-y-0'
      onMouseEnter={()=>setPreview(image)}
      onMouseLeave={()=>setPreview(undefined)}>
        <div>
          <p className='text-2xl text-black'>{title}</p>
        <div className='flex gap-5 mt-2 text-gray-700'>
          {tags.map((tag)=>(
            <span key={tag.id}>{tag.name}</span>
          ))}
        </div>
        </div>
        
        <button 
          onClick={openModal}
          className='flex items-center gap-1 cursor-pointer hover-animation text-black'
        >
          Read More <TiArrowRight/>
        </button>
        <div className='bg-gradient-to-r from-transparent via-neutral-950 to-transparent mt-12 h-[1px] w-full' />
      </div>
      {isModalOpen && (
        <ProjectDetails 
          key={project.id} 
          project={project} 
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default Project