const content = [
  {
    key: 1,
    content: 'NA',
  },
  {
    key: 2,
    content: 'NA',
  },
  {
    key: 3,
    content: 'NA',
  },
  {
    key: 4,
    content: 'NA',
  },
  {
    key: 5,
    content: 'NA',
  },
  {
    key: 6,
    content: 'NA',
  },
  {
    key: 7,
    content: 'NA',
  },
  {
    key: 8,
    content: 'NA',
  },
];

export const Frames = [
  {
    key: 1,
    label: 'Search Title',
    type: 'title',
  },
  {
    key: 2,
    label: 'Created by',
    type: 'created_by_name',
  },
  {
    key: 3,
    label: 'Created on',
    type: 'created_on',
  },
  {
    key: 4,
    label: 'Updated on',
    type: 'updated_on',
  },
  {
    key: 5,
    label: 'Shared with',
    type: 'sharedwith',
  },
];

export const NewsletterFrames = [
  {
    key: 1,
    label: 'Search Title',
    type: 'title',
  },
  {
    key: 2,
    label: 'Created by',
    type: 'created_by_name',
  },
  {
    key: 3,
    label: 'Updated on',
    type: 'updated_on',
  },
  {
    key: 4,
    label: 'Created on',
    type: 'created_on',
  },
  {
    key: 5,
    label: 'Send on',
    type: 'send_type',
  },
  {
    key: 6,
    label: 'Send Time',
    type: 'send_time',
  },
  {
    key: 7,
    label: 'Shared with',
    type: 'sharedwith',
  },
];

export const Times = Array.from({ length: 24 }, (_, index) => {
  let a = ' AM';
  if (index > 11) {
    index = index - 12;
    a = ' PM';
  }
  return {
    label: index + 1 + a,
    id: index,
  };
});

export const Types = [
  {
    id: 0,
    label: 'HTML',
    value: 'html',
  },
  {
    id: 1,
    label: 'PDF',
    value: 'pdf',
  },
  {
    id: 2,
    label: 'Word',
    value: 'word',
  },
];

export const Days = [
  {
    id: 0,
    label: 'Monday',
  },
  {
    id: 1,
    label: 'Tuesday',
  },
  {
    id: 2,
    label: 'Wednesday',
  },
  {
    id: 3,
    label: 'Thursday',
  },
  {
    id: 4,
    label: 'Friday',
  },
  {
    id: 5,
    label: 'Saturday',
  },
  {
    id: 6,
    label: 'Sunday',
  },
];

export function convertTo12HourFormat(time24) {
  const [hoursStr, minutes] = time24.split(':');
  const hours = parseInt(hoursStr, 10);
  const hours12 = hours % 12 || 12;

  // Determine whether it's AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  // Format the result as HH:MM AM/PM with leading zeros
  const formattedHours = hours12.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const time12 = `${formattedHours}:${formattedMinutes} ${period}`;

  return time12;
}

export const contents = [
  {
    key: 1,
    checked: false,
    title: 'Gucci',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 5))),
  },
  {
    key: 2,
    checked: false,
    title: 'Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 8))),
  },
  {
    key: 3,
    checked: false,
    title: 'Gucci Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 7))),
  },
  {
    key: 4,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 7))),
  },
  {
    key: 5,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 5))),
  },
  {
    key: 6,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 5))),
  },
  {
    key: 7,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 7))),
  },
  {
    key: 8,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 5))),
  },
  {
    key: 9,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 4))),
  },
  {
    key: 10,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 6))),
  },
  {
    key: 11,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 5))),
  },
  {
    key: 12,
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 8))),
  },
  {
    key: 13,
    checked: false,
    title: ' Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    shared: JSON.parse(JSON.stringify(content.slice(0, 4))),
  },
];
