export const dashbordtypeList = [
  {
    label: 'Recent',
    value: 'recent',
    id: Math.random(),
  },
  {
    label: 'Brand',
    value: 'brand',
    id: Math.random(),
  },
  // {
  //   label: 'Competitive',
  //   value: 'competitive',
  //   id: Math.random(),
  // },
  {
    label: 'Industry',
    value: 'industry',
    id: Math.random(),
  },
  {
    label: 'People',
    value: 'people',
    id: Math.random(),
  },
  {
    label: 'Advanced Dashboards',
    value: 'advanced',
    id: Math.random(),
  },
  {
    label: 'Custom Dashboards',
    value: 'custom',
    id: Math.random(),
  },
  {
    label: 'All Dashboards',
    value: 'all',
    id: Math.random(),
  },
];

const dashoboard = {
  title: 'GUCCI',
  updateOn: '03, July 2023',
  createBy: 'N Harish',
  createOn: '02 JUN 2022',
};

export const allDashboards = Array.from({ length: 20 }, () => {
  return { ...dashoboard };
});
