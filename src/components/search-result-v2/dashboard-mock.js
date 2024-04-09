import {
  actualOneDT2,
  bubbleData,
  pieData,
  pieTwoDData,
  radarData,
  wordCloudData,
  wordCloudDataFull,
} from '../../constants/mock';
import {
  actualOneD,
  actualOneD1,
  actualOneD1N,
  actualOneDG,
  mediaType,
  worldMapData,
} from '../../graphs/utils/mockData';
import { themes } from '../horizontal-bar/index.sc';

const colorChange = (obj) => {
  const tempObj = JSON.parse(JSON.stringify(obj));
  tempObj.data = tempObj.data.map((ele) => {
    const temp = ele;
    temp.color =
      ele.value >= 20 ? '#00CE75' : ele.value < 0 ? '#ED3F47' : '#FF8C00';
    return temp;
  });
  return tempObj;
};

export const dashboardDetails = [
  {
    title: 'Campaign Monitor',
    subTitle: 'Total Articles',
    slotType: 'full',
    component: 'campaign_monitor',
    enableTabs: true,
    data: actualOneD1,
  },
  {
    title: 'Author Impact',
    subTitle: 'Total Articles',
    slotType: 'half',
    component: 'author_impact',
    data: pieData,
  },
  {
    title: 'PR Impact',
    subTitle: '',
    slotType: 'half',
    component: 'pr_impact',
    data: actualOneDT2,
  },
  {
    title: 'Sentiments by Themes',
    subTitle: '',
    slotType: 'full',
    component: 'sentiments_by_themes',
    data: colorChange(actualOneD1N),
  },
  {
    title: 'Message Congruence',
    subTitle: '',
    slotType: 'half',
    component: 'message_congruence',
    data: bubbleData,
  },
  {
    title: 'Media Type',
    subTitle: '',
    slotType: 'half',
    component: 'media_type',
    data: mediaType,
  },
  {
    title: 'Volume',
    subTitle: '',
    slotType: 'half',
    component: 'volume',
    data: actualOneDT2,
  },
  {
    title: 'Sentiments',
    subTitle: '',
    slotType: 'half',
    component: 'sentiments',
    data: pieTwoDData,
  },
  {
    title: 'Top Themes',
    subTitle: '',
    slotType: 'half',
    component: 'top_themes',
    data: radarData,
  },
  {
    title: 'Reach',
    subTitle: '',
    slotType: 'half',
    component: 'reach',
    data: themes,
  },
  {
    title: 'AVE',
    subTitle: '',
    slotType: 'half',
    component: 'ave',
    data: actualOneDG,
  },
  {
    title: 'SOV',
    subTitle: '',
    slotType: 'half',
    component: 'sov',
    data: actualOneD,
  },
  {
    title: 'Journalists',
    subTitle: '',
    slotType: 'half',
    component: 'journalists',
    data: wordCloudData,
  },
  {
    title: 'RadialPie',
    subTitle: '',
    slotType: 'half',
    component: 'radial_pie',
    data: actualOneD,
  },
  {
    title: 'Sources',
    subTitle: '',
    slotType: 'full',
    component: 'sources',
    data: wordCloudDataFull,
  },
  {
    title: 'Mentions',
    subTitle: '',
    slotType: 'half',
    component: 'mentions',
    data: actualOneD,
  },
  {
    title: 'Geographical Breakdown',
    subTitle: '',
    slotType: 'full',
    component: 'world_map',
    data: worldMapData,
  },
  {
    title: 'Geographical Breakdown',
    subTitle: '32.4 Mn Total Mentions',
    slotType: 'full',
    component: 'us_breakdown',
    data: actualOneD,
  },

  //   {
  //     title: 'Popular Topics',
  //     subTitle: '',
  //     slotType: 'half',
  //     component: 'popular_topics',
  //     data: pieData,
  //   },
  //   {
  //     title: 'Geo',
  //     subTitle: '',
  //     slotType: 'half',
  //     component: 'geo',
  //     data: pieData,
  //   },
];
