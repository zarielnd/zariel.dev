import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code,
  FileCode,
  Braces,
  Palette,
  Coffee,
  Terminal,
  Github,
  GitBranch,
  Container,
  Settings
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface BentoCardProps {
  title: string,
  skills: string[],
  isMiddleCard?: boolean
}

const skillIcons: Record<string, React.ReactNode> = {
  // Frameworks
  'Next.js': <FileCode className="w-8 h-8" />,
  'React': <Code className="w-8 h-8" />,
  'DotNet': <Braces className="w-8 h-8" />,
  'SpringBoot': <Coffee className="w-8 h-8" />,
  // Languages
  'HTML': <Code className="w-8 h-8" />,
  'CSS': <Palette className="w-8 h-8" />,
  'JavaScript': <FileCode className="w-8 h-8" />,
  'TypeScript': <Code className="w-8 h-8" />,
  'Python': <Code className="w-8 h-8" />,
  'Java': <Coffee className="w-8 h-8" />,
  'CSharp': <Braces className="w-8 h-8" />,
  // Tools
  'VS Code': <Terminal className="w-8 h-8" />,
  'Github': <Github className="w-8 h-8" />,
  'Gitlab': <GitBranch className="w-8 h-8" />,
  'Git': <GitBranch className="w-8 h-8" />,
  'Docker': <Container className="w-8 h-8" />,
}

const BentoCard = ({ title, skills, isMiddleCard = false }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  // Filter out empty strings from skills
  const validSkills = skills.filter(skill => skill.trim() !== '')

  useGSAP(() => {
    if (!cardRef.current) return

    let entranceTl: gsap.core.Timeline
    let flipTl: gsap.core.Timeline
    let pinScrollTrigger: ScrollTrigger

    // Handle page refresh properly
    const ctx = gsap.context(() => {
      // This ensures animations are set up correctly on refresh
    }, cardRef)

    // Check if we should show the card immediately (for page refresh scenarios)
    const shouldShowImmediately = () => {
      const trigger = cardRef.current
      if (!trigger) return false
      
      const rect = trigger.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const triggerPoint = windowHeight * 0.85 // 85% from top
      
      return rect.top < triggerPoint
    }

    // Set initial states - but check if we should show immediately
    if (shouldShowImmediately()) {
      // Card is already in view, show it immediately
      gsap.set(cardRef.current, { opacity: 1, scale: 1, y: 0 })
      const skillItems = skillsRef.current?.children
      if (skillItems) {
        gsap.set(skillItems, { opacity: 1, scale: 1, y: 0 })
      }
    } else {
      // Card is not in view, set up for animation
      gsap.set(cardRef.current, { opacity: 0, scale: 0.8, y: 50 })
      const skillItems = skillsRef.current?.children
      if (skillItems) {
        gsap.set(skillItems, { opacity: 0, scale: 0.5, y: 20 })
      }
    }

    // Simple entrance animation for all cards
    entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none reverse",
        immediateRender: false,
        refreshPriority: 1,
        onRefresh: () => {
          // On refresh, check if we should show immediately
          if (shouldShowImmediately()) {
            gsap.set(cardRef.current, { opacity: 1, scale: 1, y: 0 })
            const skillItems = skillsRef.current?.children
            if (skillItems) {
              gsap.set(skillItems, { opacity: 1, scale: 1, y: 0 })
            }
          }
        }
      }
    })

    const skillItems = skillsRef.current?.children

    // Only animate if not already visible
    if (!shouldShowImmediately()) {
      // Entrance animations
      entranceTl
        .to(cardRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          immediateRender: false
        })
      
      // Add skill items animation only if they exist
      if (skillItems && skillItems.length > 0) {
        entranceTl.to(skillItems, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          stagger: 0.1,
          immediateRender: false
        }, "-=0.3")
      }
    }

    // Middle card flip animation
    if (isMiddleCard && frontRef.current && backRef.current) {
      // Set up 3D properties
      gsap.set(cardRef.current, {
        transformStyle: "preserve-3d",
        perspective: 1000
      })
      
      gsap.set(frontRef.current, {
        rotationY: 0,
        backfaceVisibility: "hidden"
      })
      
      gsap.set(backRef.current, {
        rotationY: 180,
        backfaceVisibility: "hidden"
      })

      // Create flip timeline
      flipTl = gsap.timeline({ paused: true })
        .to(cardRef.current, {
          rotationY: 90,
          scale: 1.5,
          duration: 1.0,
          ease: "power2.out"
        })
        .to('.bento-card:not(.middle-card)', {
          opacity: 0.1,
          duration: 1.0,
          ease: "power2.out"
        }, 0.2)
        .to(cardRef.current, {
          rotationY: 180,
          scale: 5,
          duration: 1.5,
          ease: "power2.inOut"
        })

      // ScrollTrigger with better refresh handling
      pinScrollTrigger = ScrollTrigger.create({
        trigger: ".skills-container",
        start: "center center",
        end: "+=500vh",
        scrub: 8,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          flipTl.progress(self.progress)
        },
        onEnter: () => {
          gsap.set(cardRef.current, { zIndex: 100 })
        },
        onLeave: () => {
          console.log("Card flipped to white mask - ready for next section")
        },
        onLeaveBack: () => {
          // Reset everything properly
          flipTl.progress(0)
          gsap.set(cardRef.current, { 
            zIndex: 10,
            clearProps: "transform" 
          })
          gsap.set('.bento-card:not(.middle-card)', { 
            opacity: 1,
            clearProps: "transform" 
          })
          
          // Re-establish 3D properties
          gsap.set(cardRef.current, {
            transformStyle: "preserve-3d",
            perspective: 1000
          })
          gsap.set(frontRef.current, {
            rotationY: 0,
            backfaceVisibility: "hidden"
          })
          gsap.set(backRef.current, {
            rotationY: 180,
            backfaceVisibility: "hidden"
          })
        },
        onRefresh: (self) => {
          // Use a slight delay to ensure DOM is ready
          requestAnimationFrame(() => {
            flipTl.progress(self.progress)
            if (self.progress > 0) {
              gsap.set(cardRef.current, { zIndex: 100 })
            }
          })
        }
      })
    }

    // Handle page refresh - ensure ScrollTrigger evaluates current position
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    // Cleanup
    return () => {
      entranceTl?.kill()
      flipTl?.kill()
      pinScrollTrigger?.kill()
    }
  }, [validSkills, isMiddleCard])

  // Mouse tilt effect (non-middle cards only)
  useEffect(() => {
    const card = cardRef.current
    if (!card || isMiddleCard) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / centerY * -15
      const rotateY = (x - centerX) / centerX * 15

      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.05)
      `
    }

    const handleMouseLeave = () => {
      card.style.transition = 'transform 0.3s ease-out'
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      setTimeout(() => {
        card.style.transition = ''
      }, 300)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isMiddleCard])

  return (
    <div
      ref={cardRef}
      className={`group bento-card ${isMiddleCard ? 'middle-card' : ''} relative transform-gpu cursor-pointer`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        zIndex: isMiddleCard ? 10 : 1,
        perspective: '1000px',
        height: '500px'
      }}
    >
      {isMiddleCard ? (
        <>
          {/* Front side - original card */}
          <div
            ref={frontRef}
            className="absolute inset-0 bg-white border-2 border-black p-6 rounded-lg flex flex-col hover:shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              height: '100%'
            }}
          >
            <h3 className="text-black text-2xl font-bold mb-6 group-hover:text-gray-800 transition-colors duration-300">
              {title}
            </h3>
            <div
              ref={skillsRef}
              className="flex-1 grid grid-cols-2 gap-4 content-start overflow-hidden"
            >
              {validSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 group-hover:scale-95 h-20"
                >
                  <div className="text-white mb-2 group-hover:text-gray-200 transition-colors duration-200">
                    {skillIcons[skill] || <Settings className="w-6 h-6" />}
                  </div>
                  <span className="text-white text-xs font-medium text-center group-hover:text-gray-200 transition-colors duration-200">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Back side - simple white card */}
          <div
            ref={backRef}
            className="absolute inset-0 bg-white rounded-lg"
            style={{
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              height: '100%'
            }}
          >
          </div>
        </>
      ) : (
        <div className="bg-white border-2 border-black p-6 rounded-lg flex flex-col hover:shadow-2xl h-full">
          <h3 className="text-black text-2xl font-bold mb-6 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>
          <div
            ref={skillsRef}
            className="flex-1 grid grid-cols-2 gap-4 content-start overflow-hidden"
          >
            {validSkills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 group-hover:scale-95 h-20"
              >
                <div className="text-white mb-2 group-hover:text-gray-200 transition-colors duration-200">
                  {skillIcons[skill] || <Settings className="w-6 h-6" />}
                </div>
                <span className="text-white text-xs font-medium text-center group-hover:text-gray-200 transition-colors duration-200">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BentoCard