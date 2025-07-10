import { use, useRef } from "react";
import { useWindowScroll } from "react-use";
import { useEffect, useState } from "react";
import gsap from "gsap";

const navItems = ['Home', 'About', 'Work', 'Contact'];

const Navbar = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const [isNavVisible, setIsNavVisible] = useState(true);
    const navContainerRef = useRef<HTMLDivElement>(null);

    const { y: scrollY } = useWindowScroll();

    useEffect(() => {
        if(scrollY === 0) {
            setIsNavVisible(true);
            if (navContainerRef.current) {
                navContainerRef.current.classList.remove('floating-nav');
            }
        } else if (scrollY > lastScrollY) {
            // Scrolling down
            setIsNavVisible(false);
            if (navContainerRef.current) {
                navContainerRef.current.classList.add('floating-nav');
            }
        } else if (scrollY < lastScrollY) {
            // Scrolling up
            setIsNavVisible(true);
            if (navContainerRef.current) {
                navContainerRef.current.classList.add('floating-nav');
            }
        }
        setLastScrollY(scrollY);
    }, [scrollY])
    useEffect(() => {
            gsap.to(navContainerRef.current, {
                y: isNavVisible ? 0 : -100,
                opacity: isNavVisible ? 1 : 0,
                duration: 0.2,
            });
        }, [isNavVisible]);

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 borden-none transition-all duration-700 sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    <img src="/img/logo.png" alt="logo" className="w-10"/>
                </div>
                <div className="flex h-full items-center">
                    <div className="hidden md:block">
                        {navItems.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    </div>
  );
}
export default Navbar;