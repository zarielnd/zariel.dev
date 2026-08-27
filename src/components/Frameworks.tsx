import Image from "next/image";
import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks({ paused = false }: { paused?: boolean }) {
  const skills = [
    "typescript",
    "temporal",
    "react",
    "nextjs",
    "tailwindcss",
    "nodejs",
    "nestjs",
    "aspnetcore",
    "java",
    "postgresql",
    "docker",
    "go",
    "github",
  ];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40} paused={paused}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles
        iconSize={30}
        radius={100}
        reverse
        speed={1}
        paused={paused}
      >
        {[...skills].reverse().map((skill, index) => (
          <Icon key={index} src={`logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

interface IconProps {
  src: string;
}

const Icon = ({ src }: IconProps) => {
  return (
    <Image
      src={src}
      alt={`Icon ${src}`}
      className="duration-200 rounded-sm hover:scale-110 brightness-0 invert object-contain will-change-transform"
      fill
      priority
      unoptimized
    />
  );
};
