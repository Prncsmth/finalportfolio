import {
  siAndroid,
  siCisco,
  siCloudinary,
  siExpo,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siJavascript,
  siLaravel,
  siMapbox,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPrisma,
  siReact,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'

export type StackItem = {
  name: string
  icon?: SimpleIcon
}

export type StackGroup = {
  title: string
  caption: string
  items: StackItem[]
}

export const stack: StackGroup[] = [
  {
    title: 'Frontend',
    caption: 'Interfaces',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'Tailwind CSS', icon: siTailwindcss },
    ],
  },
  {
    title: 'Mobile',
    caption: 'In your pocket',
    items: [
      { name: 'React Native', icon: siReact },
      { name: 'Expo', icon: siExpo },
      { name: 'Android', icon: siAndroid },
      { name: 'Mapbox', icon: siMapbox },
    ],
  },
  {
    title: 'Backend',
    caption: 'APIs & realtime',
    items: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Express.js', icon: siExpress },
      { name: 'PHP', icon: siPhp },
      { name: 'Laravel', icon: siLaravel },
      { name: 'REST APIs' },
      { name: 'Socket.IO', icon: siSocketdotio },
    ],
  },
  {
    title: 'Database',
    caption: 'Data & storage',
    items: [
      { name: 'MySQL', icon: siMysql },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Prisma', icon: siPrisma },
      { name: 'Cloudinary', icon: siCloudinary },
    ],
  },
  {
    title: 'Tools',
    caption: 'Ship it',
    items: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'Vercel', icon: siVercel },
      { name: 'Figma', icon: siFigma },
      { name: 'Cisco Packet Tracer', icon: siCisco },
    ],
  },
]
