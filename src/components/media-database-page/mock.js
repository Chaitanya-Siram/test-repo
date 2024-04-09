import { radarData } from '../../constants/mock';
import { actualOneD1 } from '../../graphs/utils/mockData';

export const profiles = [
  {
    id: 1,
    name: 'William Dogulas',
    occupation: 'Senior Editor, MIT Tech, London',
    journalistScore: '8.6',
    topAuthor: true,
    tags: [
      'Artificial Intelligence',
      'Machine Learning',
      'Bio Technology',
      'Nano Technology',
      'Data Science',
      'Aerospace',
    ],
    profilePicture: 'https://randomuser.me/api/portraits/men/74.jpg',
  },
  {
    id: 2,
    name: 'Hanna Levin',
    occupation: 'Senior Editor, MIT Tech, London',
    journalistScore: '8.5',
    topAuthor: true,
    tags: [
      'Artificial Intelligence',
      'Machine Learning',
      'Bio Technology',
      'Nano Technology',
      'Data Science',
      'Aerospace',
      'Something',
      'Something',
    ],
    profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 3,
    name: 'Ryan Ekstorm, Bothman',
    occupation: 'Senior Editor, MIT Tech, London',
    journalistScore: '8.3',
    topAuthor: false,
    tags: [
      'Artificial Intelligence',
      'Machine Learning',
      'Bio Technology',
      'Nano Technology',
      'Data Science',
      'Aerospace',
      'Something',
    ],
    profilePicture: 'https://randomuser.me/api/portraits/women/81.jpg',
  },
  {
    id: 4,
    name: 'Adison Torff',
    occupation: 'Senior Editor, MIT Tech, London',
    journalistScore: '7.8 ',
    topAuthor: true,
    tags: [
      'Artificial Intelligence',
      'Machine Learning',
      'Bio Technology',
      'Nano Technology',
      'Data Science',
      'Aerospace',
    ],
    profilePicture: 'https://randomuser.me/api/portraits/men/79.jpg',
  },
  {
    id: 5,
    name: 'Leo Lipshutz',
    occupation: 'Senior Editor, MIT Tech, London',
    journalistScore: '7.8',
    topAuthor: false,
    tags: [
      'Artificial Intelligence',
      'Machine Learning',
      'Bio Technology',
      'Nano Technology',
      'Data Science',
      'Aerospace',
    ],
    profilePicture: 'https://randomuser.me/api/portraits/men/61.jpg',
  },
];

export const profile = {
  id: 1,
  name: 'William Dogulas',
  occupation: 'Senior Editor, MIT Tech, London',
  journalist: true,
  journalistScore: '8.6',
  topAuthor: true,
  tags: [
    'Artificial Intelligence',
    'Machine Learning',
    'Bio Technology',
    'Nano Technology',
    'Data Science',
    'Aerospace',
    'XXXXXX',
    'XXXXXXXXXXXX',
    'XXXX',
    'XXXXXXXX',
  ],
  profilePicture: 'https://randomuser.me/api/portraits/men/74.jpg',
  about:
    'William Douglast is former senior editor at mit-tech.com and former managing editor at American Express. His byline has appeared on Fox News, Forbes, Entrepreneur and other outlets. Marv earned MPA, BBA and BA degrees from the University of Texas at Austin.',
  reach: 142000,
  articles: [
    { title: 'Articles', number: 143 },
    { title: 'Top Articles', number: 27 },
    { title: 'Trending Articles', number: 3 },
  ],
  socials: [
    {
      name: 'Twitter',
      link: 'https://twitter.com/i/flow/login',
      image: 'https://cdn-icons-png.flaticon.com/512/124/124021.png',
    },
    {
      name: 'Personal',
      link: 'https://twitter.com/i/flow/login',
      image: 'https://cdn-icons-png.flaticon.com/512/124/124021.png',
    },
  ],
  articlePosts: [
    {
      title:
        'Building an ETL Pipeline to Load Data Incrementally from Office365 to S3 using DataFactory and DataB',
      content:
        'In this post, we will look at creating an Azure data factory with a pipeline that loads Office 365 event data incrementally based on change data capture (CDC) information in the source of Change Data Feed(CDF) of a Delta lake table to an AWS S3 bucket. What we’ll cover: Create an ADF Pipeline that loads...',
      link: 'www.mit-tech.com',
      date: '06 Dec 2022',
      country: 'UK',
      reach: 10000,
    },
    {
      title:
        'Building an ETL Pipeline to Load Data Incrementally from Office365 to S3 using DataFactory and DataB',
      content:
        'In this post, we will look at creating an Azure data factory with a pipeline that loads Office 365 event data incrementally based on change data capture (CDC) information in the source of Change Data Feed(CDF) of a Delta lake table to an AWS S3 bucket. What we’ll cover: Create an ADF Pipeline that loads...',
      link: 'www.mit-tech.com',
      date: '06 Dec 2022',
      country: 'UK',
      reach: 10000,
    },
    {
      title:
        'Building an ETL Pipeline to Load Data Incrementally from Office365 to S3 using DataFactory and DataB',
      content:
        'In this post, we will look at creating an Azure data factory with a pipeline that loads Office 365 event data incrementally based on change data capture (CDC) information in the source of Change Data Feed(CDF) of a Delta lake table to an AWS S3 bucket. What we’ll cover: Create an ADF Pipeline that loads...',
      link: 'www.mit-tech.com',
      date: '06 Dec 2022',
      country: 'UK',
      reach: 10000,
    },
  ],
  graphLeft: {
    title: '',
    subTitle: 'Total Articles',
    slotType: 'full',
    component: 'campaign_monitor',
    enableTabs: false,
    data: actualOneD1,
  },
  graphRight: {
    subTitle: '',
    slotType: 'full',
    component: 'top_themes',
    data: radarData,
  },
};
