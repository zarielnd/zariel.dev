import React from "react";
import Image from "next/image";

const KprFooter = () => {
  return (
    // This footer is fixed to the viewport and sits in the background (z-0)
    <footer className="kpr-footer fixed top-0 left-0 w-full h-screen z-0">
      <div className="flex items-center justify-center h-full relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Main KPR Banner Content */}
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="text-white text-sm font-mono mb-8 tracking-wider">
            SYSTEM_INITIALIZED • STATUS_ACTIVE • READY_FOR_INPUT
          </div>
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={800}
              height={400}
              className="w-[70%] h-auto mx-auto"
              priority
            />
          </div>
          <div className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            <div className="text-gray-500 mt-2">
              Portfolio • Development • Creative Direction
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md mx-auto mb-12 text-left">
            <div className="text-green-400 text-sm font-mono mb-2">
              $ portfolio --status
            </div>
            <div className="text-gray-400 text-sm font-mono">
              Loading projects...
              <br />
              Initializing contact protocols...
              <br />
              <span className="text-green-400">Ready for collaboration</span>
            </div>
          </div>
          <div className="space-y-4 text-gray-400 text-sm font-mono">
            <div>AVAILABLE FOR FREELANCE • REMOTE WORLDWIDE</div>
            <div className="text-white">zariel.nd@gmail.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KprFooter;
