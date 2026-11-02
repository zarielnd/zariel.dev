import type { SocialLink } from "@/types";

export const personalInfo = {
  name: "Zariel",
  email: "zariel.nd@gmail.com",
  title: "A Full stack Software Engineer",
  tagline: "I'm Dedicated To Building Modern, Scalable Web Applications",
  bio: "Over the past two years, I've built solid frontend and backend foundations to ship dynamic software and web applications.",
  location: "Jupiter",
  copyright: `© ${new Date().getFullYear()} ZARIEL. ALL RIGHTS RESERVED.`,
  footerSystemNotice: `// INITIALIZING \nNEW FILES IN DATABASE\nKAI_S-2015.JPG\nAUDIO_LIV_201816.WAV\nACTIVATE CONSOLE FOR ACCESS...`,
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "LINKEDIN",
    url: "https://www.linkedin.com/in/zarielnd/",
  },
  {
    label: "GITHUB",
    url: "https://github.com/zarielnd",
  },
];
