import { useRef } from "react";

const Navbar = () => {
    const navContainerRef = useRef(null);

    const navItems = ['Home', 'About', 'Projects', 'Contact'];

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