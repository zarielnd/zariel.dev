import Image from "next/image";
import { OrbitingCircles } from "./OrbitingCircles";

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

export function Frameworks({ paused = false }: { paused?: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40} paused={paused}>
        {skills.map((skill) => (
          <Icon key={skill} skill={skill} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles
        iconSize={30}
        radius={100}
        reverse
        speed={1}
        paused={paused}
      >
        {[...skills].reverse().map((skill) => (
          <Icon key={`${skill}-rev`} skill={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

interface IconProps {
  skill: string;
}

const Icon = ({ skill }: IconProps) => {
  return (
    <Image
      src={`/logos/${skill}.svg`}
      alt={`${skill} icon`}
      className="duration-200 rounded-sm hover:scale-110 brightness-0 invert object-contain will-change-transform"
      fill
      unoptimized
    />
  );
};
