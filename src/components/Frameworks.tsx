import Image from "next/image";
import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "typescript",
    "javascript",
    "react",
    "nextjs",
    "tailwindcss",
    "nodejs",
    "nestjs",
    "aspnetcore",
    "java",
    "postgresql",
    "docker",
    "git",
    "github",
  ];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`logos/${skill}.svg`}></Icon>
        ))}
      </OrbitingCircles>

      <OrbitingCircles iconSize={30} radius={100} reverse speed={1}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`logos/${skill}.svg`}></Icon>
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
      className="duration-200 rounded-sm hover:scale-110"
      fill
      priority
    />
  );
};
