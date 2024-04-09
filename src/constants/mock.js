import React from 'react';
import CampaignCarousel from '../components/home-page/bento-box-content/CampaignCarousel';
import PRImpactL1 from '../components/home-page/bento-box-content/pr-impact-l1';
import { formatNumber } from '../utils';
import Theme from '../components/horizontal-sidebar/Check';
import RecentSearches from '../components/recent-searches';
import TopFiveSearches from '../components/top-five-searches';
import HalfFull from '../components/half-full';

export const actualOneDT2 = {
  title: 'Defect Distribution',
  subtitle: '2020-04-17',
  summary: { label: '35%', value: 35, subLabel: '132/237' },
  data: [
    { label: 'SD', value: 20, thresholdValue: 80, color: '#58CF6B' },
    { label: 'D', value: 30, thresholdValue: 20, color: '#FFBA69' },
    { label: 'N', value: 40, thresholdValue: 60, color: '#FD708B' },

    { label: 'SDR', value: 120, thresholdValue: 180, color: '#58CF6B' },
    { label: 'DR', value: 30, thresholdValue: 20, color: '#FFBA69' },
  ],
  labels: [
    {
      label: 'label',
      value: 'value',
      // color: "#E20074",
      // color1: "#ffffff00",
      // colorOpacity: 1,
      // colorOpacity1: 0.1,
    },
  ],
  info: [],
};

export const pieData = {
  title: '',
  subtitle: '',
  summary: { label: '1.9M', subLabel: 'Total' },
  data: [
    { label: 'Broadcast', value: 35, color: '#8F82FF' },
    { label: 'Print', value: 15, color: '#FF6888' },
    { label: 'Online', value: 50, color: '#FFBE6A' },
  ],
  labels: [
    {
      label: 'label',
      value: 'value',
      // color: "#E20074",
      // color1: "#ffffff00",
      // colorOpacity: 1,
      // colorOpacity1: 0.1,
    },
  ],
  info: [],
};

export const wordCloudData = {
  title: '',
  subtitle: '',
  summary: { label: '', subLabel: '' },
  data: [
    { label: 'Ru', value: '10' },
    { label: 'Su', value: '60' },
    { label: 'Cl', value: '71' },
    { label: 'Ki', value: '30' },
    { label: 'Sa', value: '20' },
    { label: 'Sn', value: '60' },
    { label: 'Cl1', value: '70' },
    { label: 'Ki1', value: '30' },
    { label: 'Sa1', value: '20' },
    { label: 'Sn1', value: '60' },
  ],
  labels: [
    {
      label: 'label',
      value: 'value',
    },
  ],
  info: [],
};

export const wordCloudDataFull = {
  title: '',
  subtitle: '',
  summary: { label: '', subLabel: '' },
  data: [
    { label: 'Running', value: '10' },
    { label: 'Surfing', value: '60' },
    { label: 'Climbing', value: '70' },
    { label: 'Kiting', value: '30' },
    { label: 'Sailing', value: '20' },
    { label: 'Snowboarding', value: '60', color: 'red' },
    { label: 'Climbing1', value: '71' },
    { label: 'Kiting1', value: '30' },
    { label: 'Sailing1', value: '20' },
    { label: 'Snowboarding1', value: '60' },
    { label: 'Running111', value: '10' },
    { label: 'Surfing111', value: '60' },
    { label: 'Climbing111', value: '70' },
    { label: 'Kiting111', value: '30' },
    { label: 'Sailing111', value: '20' },
    { label: 'Snowboarding111', value: '60' },
    { label: 'Climbing12', value: '71' },
    { label: 'Kiting12', value: '30' },
    { label: 'Sailing12', value: '20' },
    { label: 'Snowboarding12', value: '60' },
    { label: 'Running3', value: '10' },
    { label: 'Surfing3', value: '60' },
    { label: 'Climbing3', value: '70' },
    { label: 'Kiting3', value: '30' },
    { label: 'Sailing3', value: '20' },
    { label: 'Snowboarding3', value: '60' },
    { label: 'Climbing13', value: '71' },
    { label: 'Kiting13', value: '30' },
    { label: 'Sailing13', value: '20' },
    { label: 'Snowboarding13', value: '60' },
    { label: 'Running1113', value: '10' },
    { label: 'Surfing1113', value: '60' },
    { label: 'Climbing1113', value: '70' },
    { label: 'Kiting1113', value: '30' },
    { label: 'Sailing1113', value: '20' },
    { label: 'Snowboarding1113', value: '60' },
    { label: 'Climbing123', value: '71' },
    { label: 'Kiting123', value: '30' },
    { label: 'Sailing123', value: '20' },
    { label: 'Snowboarding123', value: '60', color: 'red' },
  ],
  labels: [
    {
      label: 'label',
      value: 'value',
    },
  ],
  info: [],
};
export const pieTwoDData = {
  title: '',
  subtitle: '',
  summary: {
    subtext: '',
    value: '',
    widgetName: '',
  },
  data: [
    {
      label: '',
      cat1: '50',
      cat2: '60',
      cat3: '35',
      cat1Label: { label: 'NEWS', color: '#D62884FF' },
      cat2Label: { label: 'TV', color: '#FF9315FF' },
      cat3Label: { label: 'NEWSPAPER', color: '#22AAFF' },
    },
    {
      label: '',
      cat1: '30',
      cat2: '40',
      cat3: '35',
      cat1Label: { label: 'TRADE', color: '#D6288488' },
      cat2Label: { label: 'RADIO', color: '#FF931588' },
      cat3Label: { label: 'JOURNALS', color: '#22AAFF88' },
    },
    {
      label: '',
      cat1: '20',
      cat2: '0',
      cat3: '30',
      cat1Label: { label: 'WIRES', color: '#D6288455' },
      cat2Label: { label: '', color: '#FF931555' },
      cat3Label: { label: 'Magazines', color: '#22AAFF55' },
    },
  ],
  labels: [
    {
      label: 'Online Media',
      value: 'cat1',
      color: '#D62884',
    },
    {
      label: 'Broadcast Media',
      value: 'cat2',
      color: '#FF9315',
    },
    {
      label: 'Print Media',
      value: 'cat3',
      color: '#22AAFF',
    },
  ],

  info: [],
};

export const radarData = {
  title: 'Radar Data',
  subtitle: '2020-04-17',
  summary: {
    subtext: '',
    value: '',
    widgetName: '',
  },
  data: [
    {
      label: 'A',
      low: '49',
      medium: '26',
      high: '34',
      blocker: '10',
      easy: '30',
      color: 'red',
    },
    {
      label: 'B',
      low: '13',
      medium: '23',
      high: '32',
      blocker: '85',
      easy: '55',
      color: 'green',
    },
    // {
    //   label: 'C',
    //   low: '11',
    //   medium: '26',
    //   high: '12',
    //   blocker: '59',
    //   easy: '80',
    // },
    // {
    //   label: 'D',
    //   low: '66',
    //   medium: '27',
    //   high: '10',
    //   blocker: '58',
    //   easy: '73',
    // },
    // {
    //   label: 'E',
    //   low: '11',
    //   medium: '46',
    //   high: '12',
    //   blocker: '59',
    //   easy: '60',
    // },
  ],
  labels: [
    {
      label: 'Blocker',
      value: 'blocker',
    },
    {
      label: 'High',
      value: 'high',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Low',
      value: 'low',
    },
    {
      label: 'Easy',
      value: 'easy',
    },
  ],

  info: [],
};

export const bubbleData = {
  title: '',
  subtitle: '',
  summary: { label: '1.9M', subLabel: 'Total' },
  data: [
    { label: 'John Smith', value: 222000, color: '#695DFB' },
    { label: 'John Smith', value: 150000, color: '#FF737D' },
    { label: 'John Smith', value: 125000, color: '#FFB673' },
    { label: 'John Smith', value: 100000, color: '#AB5BEA' },
    { label: 'John Smith', value: 75000, color: '#E3D022' },
    { label: 'John Smith', value: 60000, color: '#73CDFF' },
    { label: 'John Smith', value: 55000, color: '#C3C8DC' },
    { label: 'John Smith', value: 50000, color: '#92E385' },
    { label: 'John Smith', value: 40000, color: '#FFCF73' },
    { label: 'John Smith', value: 40000, color: '#FC73FF' },
  ],
  labels: [
    {
      label: 'label',
      value: 'value',
    },
  ],
  info: [],
};

export const bubbleData1 = {
  title: '',
  subtitle: '',
  summary: { label: '1.9M', subLabel: 'Total' },
  data: [
    { label: 'John Smith', value: 22000, color: '#695DFB' },
    { label: 'John Smith', value: 50000, color: '#FF737D' },
    { label: 'John Smith', value: 125000, color: '#FFB673' },
    { label: 'John Smith', value: 10000, color: '#AB5BEA' },
    { label: 'John Smith', value: 75000, color: '#E3D022' },
    { label: 'John Smith', value: 6000, color: '#73CDFF' },
    { label: 'John Smith', value: 55000, color: '#C3C8DC' },
    { label: 'John Smith', value: 50000, color: '#92E385' },
    { label: 'John Smith', value: 40000, color: '#FFCF73' },
    { label: 'John Smith', value: 40000, color: '#FC73FF' },
  ],
  labels: [
    {
      label: 'label',
      value: 'value',
    },
  ],
  info: [],
};

export const bentoBox = [
  [
    {
      label: 'Campaign Monitor ',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <CampaignCarousel />,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'PR Impact',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <PRImpactL1 />,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <Theme />,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Campaign Monitor',
      subLabel: 'Total Articles',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
];

export const rockStarData = [
  [
    {
      label: 'Label 1',
      subLabel: 'Sublabel 1',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 2',
      subLabel: 'Sub Label 2',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 3',
      subLabel: 'Sub Label 3',
      components: {
        l0: <div>l0</div>,
        l1: <PRImpactL1 />,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 4',
      subLabel: 'Sub Label 4',
      components: {
        l0: <div>l0</div>,
        l1: <CampaignCarousel />,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 5',
      subLabel: 'Sub Label 5',
      components: {
        l0: <div>l0</div>,
        l1: <CampaignCarousel />,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'PR Impact',
      subLabel: 'Sub Label 6',
      components: {
        l0: <div>l0</div>,
        l1: <PRImpactL1 />,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 6',
      subLabel: 'Sub Label 7',
      components: {
        l0: <Theme />,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 7',
      subLabel: 'Sub Label 8',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 8',
      subLabel: 'Sub Label 9',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 9',
      subLabel: 'Sub Label 10',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 10',
      subLabel: 'Sub Label 11',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 11',
      subLabel: 'Sub Label 11',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 12',
      subLabel: 'Sub Label 12',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 13',
      subLabel: 'Sub Label 13',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 14',
      subLabel: 'Sub Label 14',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 15',
      subLabel: 'Sub Label 15',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 16',
      subLabel: 'Sub Label 16',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 17',
      subLabel: 'Sub Label 17',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
  [
    {
      label: 'Label 18',
      subLabel: 'Sub Label 18',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
    {
      label: 'Label 19',
      subLabel: 'Sub Label 19',
      components: {
        l0: <div>l0</div>,
        l1: <div>l1</div>,
        l2: <div>l2</div>,
      },
    },
  ],
];

export const articles = [
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI', 'abc'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
  {
    title:
      'Few Parents intend to have very Young Children Vaccinated Against Covid',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis',
    link: 'https://indianexpress.com/article/lifestyle/fashion/gucci-alia-bhatt-global-ambassador-8609049/',
    icon: 'https://yt3.ggpht.com/ytc/AGIKgqM0ymt1FyptuNbIiKEa2h446IAI-GaddiF4qqgMVg=s88-c-k-c0x00ffffff-no-rj',
    image:
      'https://images.indianexpress.com/2023/05/umar-khalid-and-lahiri-1200.jpg?resize=150,83',
    matches: ['GUCCI'],
    reach: formatNumber(16225588),
    syndication: formatNumber(16225588),
    ave: '~$1.5 M',
    sentiment: 'positive',
  },
];
export const Titletabs = [
  {
    id: 0,
    content: '',
    label: 'All Media',
    type: 'totalArticles',
  },
  {
    id: 1,
    content: '',
    label: 'Online',
    type: 'online',
  },
  {
    id: 2,
    content: '',
    label: 'Print',
    type: 'print',
  },
  {
    id: 3,
    content: '',
    label: 'Broadcast',
    type: 'broadcast',
  },
  {
    id: 4,
    content: '',
    label: 'Blogs',
    type: 'blogs',
  },
];

export const SpotData = [
  {
    description: 'Red Bull plays down hype over Mercedes F1 upgrade step',
    publisher: 'REUTERS',
    author: 'Jonathan Noble',
    date: '05/29/2019',
    place: 'Barcelona',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://cdn-3.motorsport.com/images/amp/0mb5wqg2/s1000/formula-1-spanish-gp-2023-lewi-3.jpg',
  },
  {
    description:
      'Behind Chanel’s—Chic, Discrete, and Very Chanel—Move Into Menswear',
    publisher: 'GQ',
    author: 'Rachel Tashjian',
    date: '05/29/2019',
    place: 'Barcelona',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://media.gq.com/photos/5c9a500de92bfc0c0bee9ee4/16:9/w_1280,c_limit/pharrell-chanel-gq-3.jpg',
  },
  {
    description:
      "Chanel's Cruise Show in Monaco Was All About Living the Fantasy",
    publisher: 'WWD',
    author: 'Dominique Maitre',
    date: '05/29/2019',
    place: 'Barcelona',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://wwd.com/wp-content/uploads/2022/05/chanel-cruise-23-dm-69.jpg?crop=0px%2C192px%2C1365px%2C763px&resize=681%2C383',
  },
  {
    description: 'Red Bull Reveals They "Looked At" Mercedes Zeropod Concept',
    publisher: 'F1News',
    author: 'Alex Harrington',
    date: '05/29/2019',
    place: 'Barcelona',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk4NTkxOTAxNzY1NDc3ODI3/m298864.jpg',
  },
  {
    description: 'Rockstar Energy Drink and Angus Cloud Drop Into PUBG MOBILE',
    publisher: 'BevNet',
    author: 'Alex Harrington',
    date: '05/29/2019',
    place: 'Barcelona',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://mma.prnewswire.com/media/2062159/Angus_Cloud_Rockstar_PepsiCo.jpg?p=twitter',
  },
  {
    description: 'How Sephora Is Partnering With Creators for Brand Impact',
    publisher: 'ADWEEK',
    author: 'Alexandra Bower',
    date: '05/29/2019',
    place: 'New York',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://media1.popsugar-assets.com/files/thumbor/xT2jroJqwN6-TwEVGS9K_W0bKYs/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2022/11/29/943/n/1922153/88ac221863867be71b1070.90673839_/i/Best-Sephora-Gifts.jpg',
  },
  {
    description:
      "'GTA 6' Leak: 50 Cent's Cryptic Instagram Post Hints at More to Come",
    publisher: 'INVERSE',
    author: 'JESS REYS',
    date: '05/29/2019',
    place: 'Seattle',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://imgix.bustle.com/uploads/image/2023/3/2/21386d69-c61c-4c64-af00-b0b87d9fb021-gta-6-flower-banner.jpg?w=1200&h=630&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.5187&fp-y=0.4242',
  },
  {
    description:
      'Travis Scott And John McEnroe Join Forces To Reintroduce The Nike Mac Attack',
    publisher: 'HyperBeast',
    author: 'Sam Cole',
    date: '05/29/2019',
    place: 'Portland',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://sneakernews.com/wp-content/uploads/2023/06/travis-scott-jon-mcenroe-nike-mac-attack.jpg',
  },
  {
    description: 'Kering sales edge up 1%, lagging rivals',
    publisher: 'REUTERS',
    author: 'Silvia Aloisi',
    date: '05/29/2019',
    place: 'PARIS',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL: 'https://i-invdn-com.investing.com/trkd-images/LYNXMPEJ3O0ON_L.jpg',
  },
  {
    description: "Gucci revisits past to pave new way, sober looks at Tod's",
    publisher: 'REUTERS',
    author: 'Silvia Aloisi',
    date: '05/29/2019',
    place: 'PARIS',
    matchingKeywords: '12 matching keywords',
    newstype: 'Online News',
    imgURL:
      'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7536QMJJ4NNNJJCEYGZGTUYY7I.jpg',
  },
];

export const SpotDataArray = SpotData.map((item) => {
  return {
    id: Math.random().toString,
    data: <HalfFull data={item} />,
  };
});

export const contents = [
  {
    key: 1,
    label: 'GUCCI',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'today',
    timeStamp: '2023-06-28T05:30:00.041Z',
  },
  {
    key: 2,
    label: 'Microsoft',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'today',
    timeStamp: '2023-06-28T05:30:00.041Z',
  },
  {
    key: 3,
    label: 'Lululemon',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'today',
    timeStamp: '2023-06-28T05:30:00.041Z',
  },
  {
    key: 4,
    label: 'Scotch & Soda',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 5,
    label: 'Nike',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 6,
    label: 'Red Bull',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 7,
    label: 'Microsoft',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 8,
    label: 'GUCCI',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 9,
    label: 'GUCCI',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 10,
    label: 'GUCCI',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 11,
    label: 'GUCCI',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 12,
    label: 'GUCCI',
    results: '1.2M',
    checked: false,
    title: 'Gucci Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
  {
    key: 13,
    label: 'GUCCI',
    checked: false,
    title: ' Trending Topics',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '02 JUN 2022',
    updateOn: '02 JUN 2022',
    lastSearchOn: 'Last search 05/29/2023 | 10:03am',
    searchedOn: 'yesterday',
    timeStamp: '2023-06-27T05:30:00.041Z',
  },
];

export const workspaceArr = [
  {
    id: 0,
    isFull: true,
    data: <RecentSearches data={contents} />,
  },
  {
    id: 1,
    isFull: false,
    data: <PRImpactL1 />,
  },
  {
    id: 2,
    isFull: false,
    data: <RecentSearches data={contents} />,
  },
  {
    id: 3,
    isFull: true,
    data: <TopFiveSearches data={articles} />,
  },
  {
    id: 4,
    isFull: true,
    data: <RecentSearches data={contents} />,
  },
  {
    id: 5,
    isFull: false,
    data: <TopFiveSearches data={articles} />,
  },
  {
    id: 6,
    isFull: false,
    data: <PRImpactL1 />,
  },
  {
    id: 7,
    isFull: true,
    data: <RecentSearches data={contents} />,
  },
  {
    id: 8,
    isFull: true,
    data: <RecentSearches data={contents} />,
  },
];

export const Notifications = [
  {
    label: 'Notification Settings',
    subText:
      'Select the kinds of notifications you get about your activities and recommendations',
    options: [
      {
        optionLabel: 'News and Updates',
        optionValue: 'news_and_updates',
        optionText: 'News about the products and feature updates',
        selected: false,
      },
      {
        optionLabel: 'Tips and Tutorials',
        optionValue: 'tips_and_tutorials',
        optionText: 'Tips and tricks to make the most out of the tool',
        selected: false,
      },
      {
        optionLabel: 'Offers',
        optionValue: 'offers',
        optionText: 'Personal Offers',
        selected: true,
      },
      {
        optionLabel: 'Reminders',
        optionValue: 'reminders',
        optionText: 'Reminders on your subscription and usage',
        selected: false,
      },
      {
        optionLabel: 'Team Activities',
        optionValue: 'team_activities',
        optionText: 'Updates when team shares downloads',
        selected: true,
      },
    ],
  },
  {
    label: 'Desktop Notifications',
    subText:
      'Get push notifications in app to find out whats going on when you are online.',
    options: [
      {
        optionLabel: 'News and Updates',
        optionValue: 'news_and_updates',
        optionText: 'News about the products and feature updates',
        selected: false,
      },
      {
        optionLabel: 'Tips and Tutorials',
        optionValue: 'tips_and_tutorials',
        optionText: 'Tips and tricks to make the most out of the tool',
        selected: false,
      },
      {
        optionLabel: 'Offers',
        optionValue: 'offers',
        optionText: 'Personal Offers',
        selected: false,
      },
    ],
  },
];

export const AlertsOptions = {
  label: 'Alerts you have setup',
  subText: 'Alerts configured for spike in volume and sentiment changes',
  options: [
    {
      id: 1,
      alertIsActive: true,
      volumebox: {
        increase: 15,
        decrease: 20,
      },
      sentimentbox: {
        increase: 45,
        decrease: 15,
      },
      title: 'GUCCI2',
      description:
        'This will the space for description and additional information about the saved search or whichever...',
    },
    {
      id: 2,
      alertIsActive: false,
      volumebox: {
        increase: 45,
        decrease: 25,
      },
      sentimentbox: {
        increase: 15,
        decrease: 20,
      },
      title: 'GUCCI3',
      description:
        'This will the space for description and additional information about the saved search or whichever...',
    },
    {
      id: 3,
      alertIsActive: false,
      volumebox: {
        increase: 25,
        decrease: 25,
      },
      sentimentbox: {
        increase: 25,
        decrease: 25,
      },
      title: 'GUCCI4',
      description:
        'This will the space for description and additional information about the saved search or whichever...',
    },
    {
      id: 4,
      alertIsActive: false,
      volumebox: {
        increase: 25,
        decrease: 25,
      },
      sentimentbox: {
        increase: 25,
        decrease: 25,
      },
      title: 'GUCCI5',
      description:
        'This will the space for description and additional information about the saved search or whichever...',
    },
  ],
};

export const tableHeaders = [
  {
    label: 'Name',
    value: 'name',
    width: '300px',
    isSortable: true,
  },
  {
    label: 'Status',
    value: 'status',
    width: '200px',
    isSortable: true,
  },
  {
    label: 'Date Added',
    value: 'date_added',
    width: '200px',
    isSortable: true,
  },
  {
    label: 'Access Level',
    value: 'access_level',
    // width: '100px',
  },
];

export const tableData = [
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
  {
    name: {
      title: 'Jakob Septimus',
      subTitle: 'Jakob.S@mail.com',
    },
    status: 'active',
    date_added: '02 JUN 2022',
    access_level: 'admin',
  },
];

export const customSearches = [
  {
    label: 'GUCCI Custom Source List',
    value: 'gucci',
  },
  {
    label: 'Lorem ipsum dolor sit amet consectetur bfjdbjfbjbgbkfbkgbkhb.',
    value: 'lorem',
  },
  {
    label: 'Source List Name',
    value: 'sourceListName',
  },
  {
    label: 'Source List Name',
    value: 'sourceListName',
  },
  {
    label: 'Source List Name',
    value: 'sourceListName',
  },
  {
    label: 'Source List Name',
    value: 'sourceListName',
  },
];
