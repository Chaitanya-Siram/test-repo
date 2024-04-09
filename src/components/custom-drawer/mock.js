import { PoptabTitle } from './index.sc';
import React from 'react';
import Proptypes from 'prop-types';

export const Item = [
  {
    id: 0,
    label: 'Recent Searches',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 1,
    label: 'Top Source',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 2,
    label: 'Top 5 Articles',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 3,
    label: 'Sentiments',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 4,
    label: 'Campaign Monitor',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 5,
    label: 'SOV',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 6,
    label: 'Sentiments',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 7,
    label: 'Coverage',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 8,
    label: 'Reach',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 9,
    label: 'Journalists',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 10,
    label: 'Sources',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 11,
    label: 'PR Impact',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 12,
    label: 'Sentiments',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 13,
    label: 'Media Database',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 14,
    label: 'Sentiments',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
  {
    id: 15,
    label: 'Sentiments',
    description: 'This is a placeholder text used for demonstration purposes.',
    checked: false,
  },
];

export const Items = [
  {
    type: 'myworkspace',
    title: 'MY WORKSPACE',
    items: [
      {
        itemType: null,
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
    ],
  },
  {
    type: 'spotlight',
    title: 'SPOTLIGHT',
    items: [
      {
        itemType: null,
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ).reverse(),
      },
    ],
  },
  {
    type: 'canvas',
    canvasName: 'GUCCI',
    items: [
      {
        itemType: 'Brand',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
      {
        itemType: 'Competitive',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
      {
        itemType: 'Industry',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
    ],
  },
  {
    type: 'canvas',
    canvasName: 'CHANEL',
    items: [
      {
        itemType: 'Brand',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ).reverse(),
      },
      {
        itemType: 'Competitive',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
      {
        itemType: 'Industry',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
    ],
  },
  {
    type: 'canvas',
    canvasName: 'GUCCI',
    items: [
      {
        itemType: 'Brand',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ).reverse(),
      },
      {
        itemType: 'Competitive',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
      {
        itemType: 'Industry',
        item: JSON.parse(
          JSON.stringify(
            Item.map((item) => {
              return { ...item, id: Math.random() };
            })
          )
        ),
      },
    ],
  },
];

export const PoptabTitleBox = ({ title = '' }) => {
  return <PoptabTitle>{title}</PoptabTitle>;
};

PoptabTitleBox.propTypes = {
  title: Proptypes.string,
};

export const CanvasList = [
  {
    listName: 'MY WORKSPACE',
    createdOn: 'JUN 7, 2023',
    id: 0,
    checked: false,
  },
  {
    listName: 'SPOTLIGHT',
    createdOn: 'JUN 7, 2023',
    id: 1,
    checked: false,
  },
  {
    listName: 'GUCCI',
    createdOn: 'JUN 7, 2023',
    id: 2,
    checked: false,
  },
  {
    listName: 'CHANEL',
    createdOn: 'JUN 7, 2023',
    id: 3,
    checked: false,
  },
  {
    listName: 'ROCKSTAR',
    createdOn: 'JUN 7, 2023',
    id: 4,
    checked: false,
  },
  {
    listName: 'RED BULL',
    createdOn: 'JUN 7, 2023',
    id: 5,
    checked: false,
  },
  {
    listName: 'SEPHORA',
    createdOn: 'JUN 7, 2023',
    id: 6,
    checked: false,
  },
];

const Canvas = [
  {
    id: 0,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
  {
    id: 1,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
  {
    id: 2,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
  {
    id: 3,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
  {
    id: 4,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: true,
  },
  {
    id: 5,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
  {
    id: 6,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
  {
    id: 7,
    title: 'Microsoft ',
    description: 'Display search query here',
    Number: '3M',
    checked: false,
  },
];

export const NewCanvas = [
  {
    canvasType: 'Recent Searches',
    canvas: JSON.parse(
      JSON.stringify(Canvas.map((item) => ({ ...item, id: Math.random() })))
    ).reverse(),
  },
  {
    canvasType: 'Saved Searches',
    canvas: JSON.parse(
      JSON.stringify(Canvas.map((item) => ({ ...item, id: Math.random() })))
    ),
  },
];

export const RecentFirstTimeUserList = [
  {
    title: 'Recent Searches',
    description: 'Once you create a search, you can quickly access from here',
    id: 0,
    subText: 'Learn About Search',
  },
  {
    title: 'Recent Dashboards',
    description: 'Your recent dashboards can be quickly accessed from here',
    id: 1,
    subText: 'Learn About Dashboards',
  },
  {
    title: 'Recent Newsletter',
    description: 'Your recent newsletters can be quickly accessed from here',
    id: 3,
    subText: 'Learn About Newsletters',
  },
];
