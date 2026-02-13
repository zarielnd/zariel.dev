import path from "path";

export const myProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "An experimental portfolio project where I explore creative development, advanced animations, and modern web architecture while continuously refining my frontend engineering skills.",
    subDescription: [
      "Building high-performance animations with GSAP",
      "Developing scalable applications using Next.js",
      "Designing responsive and visually polished user interfaces",
    ],
    href: "https://example.com/project-one",
    logo: "https://example.com/logo1.png",
    image: "/imgs/portfolio.png",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/logos/react.svg",
      },
      {
        id: 2,
        name: "Next.js",
        path: "/logos/nextjs.svg",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/logos/typescript-colored.svg",
      },
      {
        id: 4,
        name: "GSAP",
        path: "/logos/gsap-white.svg",
      },
      {
        id: 5,
        name: "TailwindCSS",
        path: "/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Scientific Project Management System",
    description:
      "A university-level management system developed for the SMIA office to streamline the submission, review, and tracking of scientific research projects. The platform focuses on security, scalability, and efficient workflow management for students, lecturers, and administrators.",
    subDescription: [
      "Developing a secure and scalable web application architecture",
      "Implementing backend services using .NET Framework",
      "Designing structured database systems with SQL Server",
    ],
    href: "https://science.fpt.edu.vn/",
    logo: "https://example.com/logo1.png",
    image: "/imgs/fpt.png",
    tags: [
      {
        id: 1,
        name: ".NET",
        path: "/logos/dotnet-colored.svg",
      },
      {
        id: 2,
        name: "SQL Server",
        path: "/logos/sqlserver.svg",
      },
      {
        id: 3,
        name: "Azure",
        path: "/logos/azure.svg",
      },
    ],
  },
];
