import React from 'react';
import AllMatchIcon from '../assets/icons/AllMatchIcon';
import AttachMoneyIcon from '../assets/icons/AttachMoneyIcon';
import DynamicFeedIcon from '../assets/icons/DynamicFeedIcon';
import TableChartViewIcon from '../assets/icons/TableChartViewIcon';
import { format, parse } from 'date-fns';
// export const baseURL = ;
export const API = process.env.REACT_APP_API;
export const baseURL = process.env.REACT_APP_BACKEND_DUMMY;
export const tokenKey = 'AUTH_KEY';
export const refreshKey = 'REFRESH_KEY';
export const loginTypeLogin = 'login';
export const loginTypeCreatePassword = 'create-password';
export const forgot = 'forgot';
export const otpTypechangePassword = 'change_password';
export const sentiment = 'sentiment';
export const volume = 'volume';
export const noDataForDashboard = 'noDataForDashboard';
export const sseEndpoint = null;
export const socketEndpoint = process.env.REACT_APP_WEBSOCKET_API;

export const setAuthenticationTokens = (tokenInfo) => {
  localStorage.setItem(tokenKey, tokenInfo?.access);
  localStorage.setItem(refreshKey, tokenInfo?.refresh);
};

export const getAuthHeaders = () => {
  const authToken = localStorage.getItem(tokenKey);
  if (authToken) {
    return {
      Authorization: 'Bearer ' + authToken,
    };
  }
  return {};
};

export const dummyData = [
  {
    author: 'Chinua Achebe',
    country: 'Nigeria',
    imageLink: 'images/things-fall-apart.jpg',
    language: 'English',
    link: 'https://en.wikipedia.org/wiki/Things_Fall_Apart\n',
    pages: 209,
    title: 'Things Fall Apart',
    value: 'Things Fall Apart',
    year: 1958,
  },
  {
    author: 'Hans Christian Andersen',
    country: 'Denmark',
    imageLink: 'images/fairy-tales.jpg',
    language: 'Danish',
    link: 'https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n',
    pages: 784,
    title: 'Fairy tales',
    value: 'Fairy tales',
    year: 1836,
  },
  {
    author: 'Dante Alighieri',
    country: 'Italy',
    imageLink: 'images/the-divine-comedy.jpg',
    language: 'Italian',
    link: 'https://en.wikipedia.org/wiki/Divine_Comedy\n',
    pages: 928,
    title: 'The Divine Comedy',
    value: 'The Divine Comedy',
    year: 1315,
  },
  {
    author: 'Unknown',
    country: 'Sumer and Akkadian Empire',
    imageLink: 'images/the-epic-of-gilgamesh.jpg',
    language: 'Akkadian',
    link: 'https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n',
    pages: 160,
    title: 'The Epic Of Gilgamesh',
    value: 'The Epic Of Gilgamesh',
    year: -1700,
  },
  {
    author: 'Unknown',
    country: 'Achaemenid Empire',
    imageLink: 'images/the-book-of-job.jpg',
    language: 'Hebrew',
    link: 'https://en.wikipedia.org/wiki/Book_of_Job\n',
    pages: 176,
    title: 'The Book Of Job',
    value: 'The Book Of Job',
    year: -600,
  },
  {
    author: 'Unknown',
    country: 'India/Iran/Iraq/Egypt/Tajikistan',
    imageLink: 'images/one-thousand-and-one-nights.jpg',
    language: 'Arabic',
    link: 'https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n',
    pages: 288,
    title: 'One Thousand and One Nights',
    value: 'One Thousand and One Nights',
    year: 1200,
  },
  {
    author: 'Unknown',
    country: 'Iceland',
    imageLink: 'images/njals-saga.jpg',
    language: 'Old Norse',
    link: 'https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga\n',
    pages: 384,
    title: "Nj\u00e1l's Saga",
    value: "Nj\u00e1l's Saga",
    year: 1350,
  },
  {
    author: 'Jane Austen',
    country: 'United Kingdom',
    imageLink: 'images/pride-and-prejudice.jpg',
    language: 'English',
    link: 'https://en.wikipedia.org/wiki/Pride_and_Prejudice\n',
    pages: 226,
    title: 'Pride and Prejudice',
    value: 'Pride and Prejudice',
    year: 1813,
  },
  {
    author: 'Honor\u00e9 de Balzac',
    country: 'France',
    imageLink: 'images/le-pere-goriot.jpg',
    language: 'French',
    link: 'https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n',
    pages: 443,
    title: 'Le P\u00e8re Goriot',
    value: 'Le P\u00e8re Goriot',
    year: 1835,
  },
  {
    author: 'Samuel Beckett',
    country: 'Republic of Ireland',
    imageLink: 'images/molloy-malone-dies-the-unnamable.jpg',
    language: 'French, English',
    link: 'https://en.wikipedia.org/wiki/Molloy_(novel)\n',
    pages: 256,
    title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
    value: 'Molloy, Malone Dies, The Unnamable, the trilogy',
    year: 1952,
  },
];

export const roles = [
  {
    id: 4,
    access_type: 'super_admin',
  },
  {
    id: 5,
    access_type: 'admin',
  },
  {
    id: 6,
    access_type: 'maintainer',
  },
  {
    id: 6,
    access_type: 'user',
  },
];

export const bottomDetails = [
  { label: 'Sentiment', value: 'sentiment', icon: '' },
  { label: 'Reach', value: 'reach', icon: <TableChartViewIcon /> },
  { label: 'AVE', value: 'ave', icon: <AttachMoneyIcon /> },
  { label: 'Keyword matches', value: 'matches', icon: <AllMatchIcon /> },
  { label: 'Syndication', value: 'syndication', icon: <DynamicFeedIcon /> },
];

export const Bottomkeys = [
  // { label: 'Link', value: 'link' },
  { label: 'Publication', value: 'publication' },
  {
    label: '12 Jun 2023',
    value: 'date',
    func: (ele) => {
      const parsedDate =
        ele?.date?.split(' ')?.length >= 2
          ? parse(ele.date.split(' ')[0], 'yyyy-MM-dd', new Date())
          : parse(ele.date.split('T')[0], 'yyyy-MM-dd', new Date());
      const formattedDate = format(parsedDate, 'MM/dd/yyyy');
      return formattedDate;
    },
  },
  { label: 'Online News', value: 'newsType' },
  {
    label: 'New York, US',
    value: 'place',
    func: (ele) => {
      return ele.place?.toUpperCase();
    },
  },
  {
    label: 'Author Name',
    value: 'author',
    func: (ele) => {
      return ele.author?.toUpperCase() === 'NA' ? '' : ele.author;
    },
  },
];

export const getParsedDate = (date, currentFormat, expectedFormat) => {
  try {
    const parsedDate = parse(date, currentFormat, new Date());
    const formattedDate = format(parsedDate, expectedFormat);
    return formattedDate;
  } catch (error) {
    console.log(error);
    return '';
  }
};
