import React, { useState } from 'react'
import HackedText from './HackedText'
import Project from './Project'
import { myProjects } from '../constants'
import { motion, useMotionValue, useSpring } from 'motion/react'

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    x.set(e.clientX + 20)
    y.set(e.clientY + 20)
  };

  const [preview, setPreview] = useState<string | undefined>(undefined);

  return (
    <section className='relative c-space section-spacing bg-white'
      onMouseMove={handleMouseMove}
    >
      <HackedText className='text-left font-bold px-8 !text-black select-none hero-heading'>
        My Selected Projects
      </HackedText>
      <div className='bg-gradient-to-r from-transparent via-neutral-950 to-transparent mt-12 h-[1px] w-full' />
      {myProjects.map((project) => (
        <Project key={project.id} project={project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          alt="Preview"
        />
      )}

    </section>
  )
}

export default Projects