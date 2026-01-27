type ProjectMeta = {
  name: string;
  slug: string;
  github: string;
  status: 'live' | 'in-dev';
};

export const projects: ProjectMeta[] = [
  {
    name: 'Humanboard',
    slug: 'humanboard',
    github: 'https://github.com/humancorp-humancorp/humanboard',
    status: 'live',
  },
  {
    name: 'Humantime',
    slug: 'humantime',
    github: 'https://github.com/humancorp-humancorp/humantime',
    status: 'live',
  },
  {
    name: 'Nexus',
    slug: 'nexus',
    github: 'https://github.com/humancorp-humancorp/nexus',
    status: 'live',
  },
  {
    name: 'Humanjournal',
    slug: 'humanjournal',
    github: 'https://github.com/humancorp-humancorp/humanjournal',
    status: 'in-dev',
  },
  {
    name: 'Humaninput',
    slug: 'humaninput',
    github: 'https://github.com/humancorp-humancorp/humaninput',
    status: 'in-dev',
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
