import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { navItems } from "@/data/navigation";

const Navbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Native window scroll tracker (replaces react-use)
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (scrollY > lastScrollY) {
      // Scrolling down
      setIsNavVisible(false);
      setIsMobileMenuOpen(false); // close mobile menu on scroll down
      navContainerRef.current?.classList.add("floating-nav");
    } else if (scrollY < lastScrollY) {
      // Scrolling up
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(scrollY);
  }, [scrollY, lastScrollY]);

  // Handle nav container entrance / exit
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      const targetId = href.replace(/^#/, "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.scrollY;

        gsap.to(
          { y: startPosition },
          {
            duration: 1,
            y: targetPosition,
            ease: "power2.out",
            onUpdate: function () {
              window.scrollTo(0, this.targets()[0].y);
            },
          },
        );
      }
    },
    [],
  );

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav
          className="flex size-full items-center justify-between p-4"
          aria-label="Main Navigation"
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-7 cursor-pointer"
            aria-label="Home"
          >
            <Image
              src="/imgs/logo.png"
              alt="Zariel Logo"
              width={40}
              height={40}
              priority
            />
          </a>

          <div className="flex h-full items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-hover-btn"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 p-2 cursor-pointer text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 mt-3 mx-4 bg-black/95 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                className="py-3 px-4 text-base uppercase tracking-wider text-white hover:text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
