import { BiGitCompare } from 'react-icons/bi';

const ICON_PATH = '../';

export const service = [
  {
    id: 2,
    title: 'Physics',
    color: '#FF8C00',
    bg: '#FFF6EB',
    image: `/images/physics.svg`,
  },

  {
    id: 7,
    title: 'Biology',
    color: '#FF9ED2',
    bg: '#FFF7FB',
    image: `/images/biology.svg`,
  },
  {
    id: 1,
    title: 'Mathematics',
    color: '#1F89DB',
    bg: '#F4FAFF',
    image: `/images/math.svg`,
  },
];
export const pricingData: any[] = [
  {
    title: 'Basic Plan',
    price: '£10',
    period: '/ month',
    features: [
      { feature: 'Access to selected free courses.', available: true },
      { feature: 'Limited course materials.', available: true },
      { feature: 'No certification upon completion.', available: false },
      { feature: 'Ad-supported platform.', available: false },
      { feature: 'Access to exclusive Pro Plan.', available: false },
      { feature: 'Early access to new courses.', available: false },
    ],
    buttonVariant: 'solid',
    buttonColorScheme: '#0A52A8',
    bgColor: '#F2F2F2',
    textColor: 'black',
    buttonText: '#fff',
  },
  {
    title: 'Standard Plan',
    price: '£20',
    period: '/ month',
    features: [
      { feature: 'Access to selected free courses.', available: true },
      { feature: 'Limited course materials.', available: true },
      { feature: 'No certification upon completion.', available: true },
      { feature: 'Ad-supported platform.', available: true },
      { feature: 'Access to exclusive Pro Plan.', available: false },
      { feature: 'Early access to new courses.', available: false },
    ],
    isPopular: true,
    buttonVariant: 'solid',
    buttonColorScheme: 'white',
    bgColor: '#FBA333',
    textColor: 'white',
    buttonText: '#0A52A8',
  },
  {
    title: 'Premium Plan',
    price: '£50',
    period: '/ month',
    features: [
      { feature: 'Access to selected free courses.', available: true },
      { feature: 'Limited course materials.', available: true },
      { feature: 'No certification upon completion.', available: true },
      { feature: 'Ad-supported platform.', available: true },
      { feature: 'Access to exclusive Pro Plan.', available: true },
      { feature: 'Early access to new courses.', available: true },
    ],
    buttonVariant: 'solid',
    buttonColorScheme: '#0A52A8',
    bgColor: '#FFFFFF',
    textColor: 'black',
    buttonText: '#fff',
  },
];
export const courses = [
  {
    id: 1,
    title: 'Mathematics',
    color: '#004CC6',
    image: `/images/math.svg`,
  },
  {
    id: 2,
    title: 'Physics',
    color: '#303C6E',
    image: `/images/physics.svg`,
  },
  {
    id: 3,
    title: 'Chemistry',
    color: '#061638',
    image: `/images/chemistry.svg`,
  },
  {
    id: 4,
    title: 'Information Tech',
    color: '#A16FDD',
    image: `/images/tech.svg`,
  },
  {
    id: 5,
    title: 'Geography',
    color: '#13455E',
    image: `/images/geo.svg`,
  },
  {
    id: 6,
    title: 'English',
    color: '#6280D6',
    image: `/images/english.svg`,
  },
  {
    id: 7,
    title: 'Biology',
    color: '#3C501B',
    image: `/images/biology.svg`,
  },
  {
    id: 8,
    title: 'Explore All Courses',
    color: '#004CC6',
    image: `/images/all.svg`,
  },
];
export const coursesArray = [
  {
    title: 'Mathematics - K2 to K5 level, (Basic Mathematics)',
    description: 'Basic Mathematics',
    imageSrc: '/images/course-1.svg',
    duration: '5 - 7 hours',
    learners: 547,
  },
  {
    title: 'Mathematics - K2 to K5 level, (Intermediate Mathematics)',
    description: 'Intermediate Mathematics',
    imageSrc: '/images/course-2.svg',
    duration: '5 - 7 hours',
    learners: 547,
  },
  {
    title: 'Mathematics - K2 to K5 level, (Advanced Mathematics)',
    description: 'Advanced Mathematics',
    imageSrc: '/images/course-3.svg',
    duration: '5 - 7 hours',
    learners: 547,
  },
  {
    title: 'Mathematics - K6 to K12 level, (Basic Mathematics)',
    description: 'Basic Mathematics',
    imageSrc: '/images/course-4.svg',
    duration: '5 - 7 hours',
    learners: 547,
  },
  {
    title: 'Mathematics - K6 to K12 level, (Intermediate Mathematics)',
    description: 'Intermediate Mathematics',
    imageSrc: '/images/course-5.svg',
    duration: '5 - 7 hours',
    learners: 547,
  },
];
