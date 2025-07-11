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
    if (cardRef.current) {
      let entranceTl: gsap.core.Timeline
      let flipTl: gsap.core.Timeline
      let pinScrollTrigger: ScrollTrigger

      // Set initial state
      gsap.set(cardRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50
      })

      // Create entrance timeline
      entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      })

      entranceTl.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      })

      // Animate individual skill items with stagger
      const skillItems = skillsRef.current?.children
      if (skillItems) {
        gsap.set(skillItems, {
          opacity: 0,
          scale: 0.5,
          y: 20
        })

        gsap.to(skillItems, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        })
      }

      // Special flip animation for middle card
      if (isMiddleCard && frontRef.current && backRef.current) {
        // Set initial states for proper 3D flip
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

        // Create flip timeline with slower durations
        flipTl = gsap.timeline({ paused: true })

        // Phase 1: Scale up and start flip (slower)
        flipTl.to(cardRef.current, {
          scale: 1.3,
          rotationY: 45,
          duration: 0.8, // Increased from 0.3
          ease: "power2.out"
        })

        // Phase 2: Complete the flip (slower)
        flipTl.to(cardRef.current, {
          rotationY: 180,
          duration: 1.0, // Increased from 0.4
          ease: "power2.inOut"
        })

        // Phase 3: Scale up to fill screen (slower)
        flipTl.to(cardRef.current, {
          scale: 4,
          duration: 0.8, // Increased from 0.3
          ease: "power2.in"
        })

        // Fade out other cards (slower)
        flipTl.to('.bento-card:not(.middle-card)', {
          opacity: 0.2,
          duration: 1.0, // Increased from 0.5
          ease: "power2.out"
        }, 0.4) // Start slightly after flip begins

        pinScrollTrigger = ScrollTrigger.create({
          trigger: ".skills-container",
          start: "center center",
          end: "+=500vh", // Increased from +=300vh for longer scroll distance
          scrub: 8, // Increased from 2 for slower animation
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const card = cardRef.current
            if (card) {
              // Progress the flip timeline based on scroll
              flipTl.progress(progress)
            }
          },
          onEnter: () => {
            const card = cardRef.current
            if (card) {
              // Store original state before modifications
              gsap.set(card, {
                opacity: 1,
                scale: 1,
                y: 0,
                zIndex: 100,
                rotationY: 0
              })

              // Re-apply 3D setup for flip
              gsap.set(card, {
                transformStyle: "preserve-3d",
                perspective: 1000
              })

              // Reset flip timeline to beginning
              flipTl.progress(0)
            }
          },
          onEnterBack: () => {
            const card = cardRef.current
            if (card) {
              // Ensure card is visible and properly positioned
              gsap.set(card, {
                opacity: 1,
                y: 0,
                zIndex: 100,
                scale: 1,
                rotationY: 0,
                clearProps: "transform"
              })

              // Re-apply 3D setup
              gsap.set(card, {
                transformStyle: "preserve-3d",
                perspective: 1000
              })

              // Reset flip timeline
              flipTl.progress(0)
            }

            // Reset other cards
            gsap.set('.bento-card:not(.middle-card)', { opacity: 1 })
          },
          onLeaveBack: () => {
  const card = cardRef.current
  if (card) {
    // First, reset the flip timeline's progress
    flipTl.progress(0)
    
    // Clear transforms more carefully
    gsap.set(card, {
      clearProps: "transform,rotationY,scale,perspective,transformStyle"
    })
    
    // Reset to a stable visible state
    gsap.set(card, {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      zIndex: 1,
      rotationY: 0,
      rotationX: 0,
      transformStyle: "preserve-3d",
      perspective: 1000,
      visibility: "visible"
    })
    
    // Ensure front and back faces are properly reset
    if (frontRef.current && backRef.current) {
      gsap.set(frontRef.current, {
        rotationY: 0,
        backfaceVisibility: "hidden"
      })
      gsap.set(backRef.current, {
        rotationY: 180,
        backfaceVisibility: "hidden"
      })
    }
    
    // Make sure other cards are visible
    gsap.set('.bento-card:not(.middle-card)', {
      opacity: 1,
      clearProps: "transform"
    })
    
    // Force a refresh of ScrollTrigger calculations
    ScrollTrigger.refresh()
  }
},


          onLeave: () => {
            console.log("Card flipped to white mask - ready for next section")
          }
        })
      }

      // Cleanup function
      // Cleanup function
      return () => {
        // Reset card to visible state before cleanup
        if (cardRef.current) {
          gsap.set(cardRef.current, {
            opacity: 1,
            scale: 1,
            clearProps: "transform"
          })
        }

        entranceTl?.kill()
        flipTl?.kill()
        pinScrollTrigger?.kill()
      }

    }
  }, [validSkills, isMiddleCard])

  // Real-time tilt effect (disabled for middle card)
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

    const handleMouseEnter = () => {
      card.style.transition = ''
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('mouseenter', handleMouseEnter)
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
        <div
          className="bg-white border-2 border-black p-6 rounded-lg flex flex-col hover:shadow-2xl h-full"
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
      )}
    </div>
  )
}

export default BentoCard
