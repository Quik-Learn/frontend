import moment from 'moment';
import { FaBookOpen, FaCamera, FaClipboardCheck } from 'react-icons/fa';

export const data01 = [
  {
    name: 'Group A',
    value: 20,
  },
  {
    name: 'Group B',
    value: 4,
  },
];
export const events = [
  {
    id: 1,
    title: 'Mathematics (Intermediate)',
    day: 'Today',
    time: '10:00 am',
    color: '#FAD02C',
  },
  {
    id: 2,
    title: 'English Language (Advanced)',
    day: 'Today',
    time: '12:00 pm',
    color: '#D3D3D3',
  },
  {
    id: 3,
    title: 'Geography (Basic)',
    day: 'Tomorrow',
    time: '12:00 pm',
    color: '#EF476F',
  },
  {
    id: 4,
    title: 'Economics (Intermediate)',
    day: 'Friday',
    time: '12:00 pm',
    color: '#06D6A0',
  },
  {
    id: 5,
    title: 'Lorem Ipsum (Basic)',
    day: 'Saturday',
    time: '12:00 pm',
    color: '#118AB2',
  },
];
export const activities = [
  {
    id: 1,
    type: 'Tutoring Session',
    description: 'Reviewing algebraic equations and charts',
    course: 'Mathematics Year 6 to 7',
    tutor: 'Olaoluwa Ajayi',
    time: '09:34 am',
    icon: '/images/aa.svg',
    link: 'View Recording',
    color: '#FF7E3E',
  },
  {
    id: 2,
    type: 'Assignment',
    description: 'Weekly Quiz - K-means clustering',
    course: 'Mathematics Year 12 to 13',
    due: 'Sep 04, 2024, 4:00pm',
    time: '12:30 pm',
    icon: '/images/bb.svg',
    color: '#FF1D86',
  },
  {
    id: 3,
    type: 'Course Completion',
    description: 'Mathematics Year 7 to 10',
    tutor: 'Fred Spencer',
    time: '15:30 pm',
    icon: '/images/cc.svg',
    color: '#16D03B',
  },
];
export const myEventsList = [
  // Biology: Recurring event from Monday to Sunday at 3 PM - 4 PM
  ...Array.from({ length: 7 }, (_, i) => ({
    start: moment()
      .day(i + 1)
      .set({ hour: 15, minute: 0 })
      .toDate(), // 3 PM start

    end: moment()
      .day(i + 1)
      .set({ hour: 16, minute: 0 })
      .toDate(), // 4 PM end
    title: 'Biology',
    color: '#FE6470',
    desc: 'Biology Year 6 to 7',
  })),
  // Mathematics: Recurring event from Tuesday to Thursday at 1 PM - 2 PM
  ...Array.from({ length: 3 }, (_, i) => ({
    start: moment()
      .day(i + 2)
      .set({ hour: 13, minute: 0 })
      .toDate(), // 1 PM start (Tuesday to Thursday)
    end: moment()
      .day(i + 2)
      .set({ hour: 14, minute: 0 })
      .toDate(), // 2 PM end
    title: 'Mathematics',
    color: '#0177FB',
    desc: 'Mathematics Year 6 to 7',
  })),
  // Mathematics: Recurring event from Tuesday to Thursday at 1 PM - 2 PM
  ...Array.from({ length: 3 }, (_, i) => ({
    start: moment()
      .day(i + 2)
      .set({ hour: 9, minute: 0 })
      .toDate(), // 1 PM start (Tuesday to Thursday)
    end: moment()
      .day(i + 2)
      .set({ hour: 10, minute: 0 })
      .toDate(), // 2 PM end
    title: 'English',
    color: '#FF8C00',
    desc: 'English Year 6 to 7',
  })),
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
export const dashboardItems = [
  [
    {
      id: 1,
      title: 'Introduction to Mathematics',
      short_description:
        'Learn fundamental mathematical concepts and problem-solving skills',
      thumbnail: '/images/math-course.jpg',
      lesson_hours: 40,
      learners: 1250,
    },
    {
      id: 2,
      title: 'Advanced Physics',
      short_description:
        'Explore mechanics, thermodynamics, and quantum physics',
      thumbnail: '/images/physics-course.jpg',
      lesson_hours: 48,
      learners: 850,
    },
    {
      id: 3,
      title: 'Chemistry Fundamentals',
      short_description:
        'Master the basics of chemical reactions and lab techniques',
      thumbnail: '/images/chemistry-course.jpg',
      lesson_hours: 36,
      learners: 975,
    },
    {
      id: 4,
      title: 'Biology 101',
      short_description:
        'Study living organisms, cells, and biological processes',
      thumbnail: '/images/biology-course.jpg',
      lesson_hours: 42,
      learners: 1100,
    },
  ],
];
