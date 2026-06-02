export interface Profile {
  name: string;
  title: string;
  subtitles: string[];
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  stats: { value: string; label: string }[];
}

export interface Experience {
  period: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDesc: string;
  metrics: string;
  tech: string[];
  type: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: string;
  level: string;
  usage: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  detail: string;
  projects: string;
}

export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
}

export interface ContactResponse {
  status: string;
  message: string;
}
