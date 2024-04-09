export const volumeAnalysis = {
  title: 'Volume Analysis',
  subTitle: '',
  component: 'people_volume_analysis',
  graphType: 'uber_stats_volume',
  data: {
    title: '',
    subtitle: '2020-04-17',
    summary: {
      label: '',
      subLabel: '132/237',
    },
    data: [
      {
        label: 'Total Articles',
        value: 1900000,
        change: 32.1,
        isIncreased: true,
        color: '#00C4DC',
      },
      {
        label: 'Total Reach',
        value: 42200000000,
        change: 16.2,
        isIncreased: false,
        color: '#F54A80',
      },
      {
        label: 'Total AVE',
        value: 380000000,
        change: 32.1,
        isIncreased: true,
        color: '#675EF2',
      },
    ],
    labels: [
      {
        label: 'label',
        value: 'value',
      },
    ],
    info: [],
  },
};
export const topJournalistBySentiment = {
  title: 'Top Journalist by Sentiment',
  subTitle: 'Authors Name',
  component: 'people_top_journalist_by_sentiment',
  graphType: 'stacked_bar',
  dataType: ['2d'],
  data: {
    title: '',
    subtitle: '',
    summary: {
      label: 'Total Articles',
      value: '1.8 Million',
      subLabel: '',
    },
    data: [
      {
        label: 'Theme 1',
        positive: 110,
        negative: 50,
      },
      {
        label: 'Theme 2',
        positive: 80,
        negative: 110,
      },
      {
        label: 'Theme 3',
        positive: 115,
        negative: 30,
      },
      {
        label: 'Theme 4',
        positive: 60,
        negative: 40,
      },
    ],
    labels: [
      {
        label: 'Positive',
        value: 'positive',
        color: '#6fdc8c',
      },
      {
        label: 'Negative',
        value: 'negative',
        color: '#fa4d56',
      },
      {
        label: 'Neutral',
        value: 'neutral',
        color: '#969EC5',
      },
    ],
    info: [],
  },
};

export const topSourceBySentiment = {
  title: 'Top Source by Sentiment',
  subTitle: '',
  component: 'people_top_source_by_sentiment',
  graphType: 'stacked_column',
  dataType: ['1d'],
  data: {
    title: 'Source By Sentiment',
    subTitle: 'Total Articles',
    summary: {
      subtext: '',
      label: 'Total Articles',
      value: '1.8 Million',
    },
    data: [
      {
        label: 'Source 1',
        neg: '190000',
        pos: '360000',
        neu: '310000',
      },
      {
        label: 'Source 2',
        neg: '280000',
        pos: '290000',
        neu: '420000',
      },
      {
        label: 'Source 3',
        neg: '390000',
        pos: '350000',
        neu: '480000',
      },
      {
        label: 'Source 4',
        neg: '250000',
        pos: '280000',
        neu: '350000',
      },
      {
        label: 'Source 5',
        neg: '250000',
        pos: '150000',
        neu: '290000',
      },
    ],
    labels: [
      {
        label: 'Positive',
        value: 'pos',
        color: '#6FDC8C',
      },
      {
        label: 'Negative',
        value: 'neg',
        color: '#FA4D56',
      },
      {
        label: 'Neutral',
        value: 'neu',
        color: '#969EC5',
      },
    ],
    info: [],
  },
};
export const peopleCoverage = {
  title: 'Coverage over Time',
  subTitle: '',
  component: 'people_coverage_over_time',
  graphType: 'line',
  dataType: ['1d'],
  data: {
    title: 'Grouped Stacked',
    subtitle: '2020-04-17',
    summary: {
      subtext: 'Group Stacked column',
      label: 'Total Articles',
      value: '1.8 Million',
      widgetName: 'Compliance Categories',
    },
    data: [
      {
        label: 'Jan',
        gucci: '100000',
        color: '#7EBDC2',
      },
      {
        label: 'Feb',
        gucci: '700000',
        color: '#7EBDC2',
      },
      {
        label: 'Mar',
        gucci: '1400000',
        color: '#7EBDC2',
      },
      {
        label: 'Apr',
        gucci: '2500000',
        color: '#7EBDC2',
      },
      {
        label: 'May',
        gucci: '1500000',
        color: '#7EBDC2',
      },
      {
        label: 'Jun',
        gucci: '2000000',
        color: '#7EBDC2',
      },
      {
        label: 'Jul',
        gucci: '1500000',
        color: '#7EBDC2',
      },
      {
        label: 'Aug',
        gucci: '2000000',
        color: '#7EBDC2',
      },
      {
        label: 'Sep',
        gucci: '1400000',
        color: '#7EBDC2',
      },
      {
        label: 'Oct',
        gucci: '2200000',
        color: '#7EBDC2',
      },
      {
        label: 'Nov',
        gucci: '1500000',
        color: '#7EBDC2',
      },
      {
        label: 'Dec',
        gucci: '1800000',
        color: '#7EBDC2',
      },
    ],
    labels: [
      {
        label: 'Gucci',
        value: 'gucci',
        color: '#7EBDC2',
      },
    ],
    info: [],
  },
};

export const peoplePopularTopics = {
  title: 'Popular Topics',
  subTitle: '',
  component: 'people_popular_topics',
  graphType: 'bubble',
  data: {
    title: '',
    subtitle: '',
    summary: {
      label: 'Total Articles',
      value: '1.8 Million',
      subLabel: 'Total',
    },
    data: [
      {
        label: 'Theme 1',
        value: 222000,
        color: '#695DFB',
      },
      {
        label: 'Theme 2',
        value: 150000,
        color: '#FF737D',
      },
      {
        label: 'Theme 3',
        value: 125000,
        color: '#FFB673',
      },
      {
        label: 'Theme 4',
        value: 100000,
        color: '#AB5BEA',
      },
      {
        label: 'Theme 5',
        value: 75000,
        color: '#E3D022',
      },
      {
        label: 'Theme 6',
        value: 60000,
        color: '#73CDFF',
      },
      {
        label: 'Theme 7',
        value: 55000,
        color: '#C3C8DC',
      },
      {
        label: 'Theme 8',
        value: 50000,
        color: '#92E385',
      },
      {
        label: 'Theme 9',
        value: 40000,
        color: '#FFCF73',
      },
    ],
    labels: [
      {
        label: 'label',
        value: 'value',
      },
    ],
    info: [],
  },
};
export const mediaType = {
  title: 'Media Type',
  subTitle: 'Total Articles',
  component: 'people_media_type',
  graphType: 'people_grouped_column',
  dataType: ['2d'],
  data: {
    summary: {
      label: 'Total Articles',
      value: '1.8 Million',
    },
    data: [
      {
        label: 'Jan',
        broadcast: '200000',
        print: '400000',
        online: '300000',
      },
      {
        label: 'Feb',
        broadcast: '250000',
        print: '400000',
        online: '200000',
      },
      {
        label: 'Mar',
        broadcast: '300000',
        print: '400000',
        online: '250000',
      },
      {
        label: 'Apr',
        broadcast: '300000',
        print: '400000',
        online: '250000',
      },
    ],
    labels: [
      {
        label: 'Print',
        value: 'print',
        color: '#F54A80',
      },
      {
        label: 'Broadcast',
        value: 'broadcast',
        color: '#675EF2',
      },
      {
        label: 'Online',
        value: 'online',
        color: '#FCAF41',
      },
    ],
    info: [],
  },
};

export const peopleData = {
  summary: [
    {
      title: 'Total Articles',
      data: 342353534432432,
      change: 32.1,
      isIncreased: true,
    },
    {
      title: 'Total Reach',
      data: 34823874,
      change: 16.2,
      isIncreased: false,
    },
    {
      title: 'Total AVE',
      data: 34823874,
      change: 32.1,
      isIncreased: true,
    },
  ],
  advancedWidgets: {
    campaign: {
      title: '',
      subtitle: '2020-04-17',
      summary: {
        label: 'Total Articles',
        value: '1.8 Million',
        subLabel: '132/237',
      },
      data: [
        {
          label: 'campaign 1',
          xValue: 22,
          yValue: 125,
          radius: '.2',
          color: '#FFB45C',
        },
        {
          label: 'campaign 2',
          xValue: 43,
          yValue: 250,
          radius: '.5',
          color: '#E369A9',
        },
        {
          label: 'campaign 3',
          xValue: 64,
          yValue: 150,
          radius: '.3',
          color: '#7BCCFF',
        },
        {
          label: 'campaign 4',
          xValue: 85,
          yValue: 225,
          radius: '.15',
          color: '#4DE0C4',
        },
      ],
      labels: [
        {
          label: 'label',
          value: 'xValue',
        },
        {
          label: 'label',
          value: 'yValue',
        },
        {
          label: 'label',
          value: 'radius',
        },
      ],
      info: [],
    },
    authorimpact: {
      summary: {
        label: 'Total Articles',
        value: '1.8 Million',
      },
      data: {
        no_articles: {
          title: '',
          subtitle: '2020-04-17',
          graphType: 'author_impact_bar',
          component: 'author_impact',
          summary: {
            label: '35%',
            value: 35,
            subLabel: '132/237',
          },
          data: [
            {
              label: 'Author1',
              value: 65345,
              color: '#DE1D83',
              tooltipInfo: {
                title: 'Authou1',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author2',
              value: 32657,
              color: '#DE1D83',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author3',
              value: 22657,
              thresholdValue: 60,
              color: '#DE1D83',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author4',
              value: 12657,
              color: '#DE1D83',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author5',
              value: 8657,
              color: '#DE1D83',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
          ],
          labels: [
            {
              label: 'label',
              value: 'value',
            },
          ],
          info: [],
        },
        total_reach: {
          title: '',
          subtitle: '2020-04-17',
          graphType: 'author_impact_bar',
          component: 'author_impact',
          summary: {
            label: '35%',
            value: 35,
            subLabel: '132/237',
          },
          data: [
            {
              label: 'Author1',
              value: 65345,
              color: '#FF9315',
              tooltipInfo: {
                title: 'Authou1',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author2',
              value: 32657,
              color: '#FF9315',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author3',
              value: 22657,
              thresholdValue: 60,
              color: '#FF9315',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author4',
              value: 12657,
              color: '#FF9315',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author5',
              value: 8657,
              color: '#FF9315',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
          ],
          labels: [
            {
              label: 'label',
              value: 'value',
            },
          ],
          info: [],
        },
        total_ave: {
          title: '',
          subtitle: '2020-04-17',
          graphType: 'author_impact_bar',
          component: 'author_impact',
          summary: {
            label: '35%',
            value: 35,
            subLabel: '132/237',
          },
          data: [
            {
              label: 'Author1',
              value: 65345,
              color: '#22AAFF',
              tooltipInfo: {
                title: 'Authou1',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author2',
              value: 32657,
              color: '#22AAFF',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author3',
              value: 22657,
              thresholdValue: 60,
              color: '#22AAFF',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author4',
              value: 12657,
              color: '#22AAFF',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author5',
              value: 8657,
              color: '#22AAFF',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
          ],
          labels: [
            {
              label: 'label',
              value: 'value',
            },
          ],
          info: [],
        },
        prominance: {
          title: '',
          subtitle: '2020-04-17',
          graphType: 'author_impact_bar',
          component: 'author_impact',
          summary: {
            label: '35%',
            value: 35,
            subLabel: '132/237',
          },
          data: [
            {
              label: 'Author1',
              value: 65345,
              color: '#00D7A3',
              tooltipInfo: {
                title: 'Authou1',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author2',
              value: 32657,
              color: '#00D7A3',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author3',
              value: 22657,
              thresholdValue: 60,
              color: '#00D7A3',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author4',
              value: 12657,
              color: '#00D7A3',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author5',
              value: 8657,
              color: '#00D7A3',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
          ],
          labels: [
            {
              label: 'label',
              value: 'value',
            },
          ],
          info: [],
        },
        sentiment: {
          title: '',
          subtitle: '2020-04-17',
          graphType: 'author_impact_bar',
          component: 'author_impact',
          summary: {
            label: '35%',
            value: 35,
            subLabel: '132/237',
          },
          data: [
            {
              label: 'Author1',
              value: 65345,
              color: '#8393C7',
              tooltipInfo: {
                title: 'Authou1',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author2',
              value: 32657,
              color: '#8393C7',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author3',
              value: 22657,
              thresholdValue: 60,
              color: '#8393C7',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author4',
              value: 12657,
              color: '#8393C7',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
            {
              label: 'Author5',
              value: 8657,
              color: '#8393C7',
              tooltipInfo: {
                title: 'Authou 2',
                subtitle: 'Designation',
                description: '',
                component: 'author_impact',
                graphType: 'advanced_author_groupped_column',
                summary: {
                  subtext: 'Group Stacked column',
                  value: '120',
                  widgetName: 'Compliance Categories',
                },
                data: [
                  {
                    label: 'Jan',
                    national: '1',
                    local: '35',
                  },
                  {
                    label: 'Feb',
                    national: '7',
                    local: '28',
                  },
                  {
                    label: 'Mar',
                    national: '14',
                    local: '16',
                  },
                  {
                    label: 'Apr',
                    national: '25',
                    local: '35',
                  },
                  {
                    label: 'May',
                    national: '15',
                    local: '25',
                  },
                  {
                    label: 'Jun',
                    national: '20',
                    local: '20',
                  },
                  {
                    label: 'Jul',
                    national: '15',
                    local: '35',
                  },
                  {
                    label: 'Aug',
                    national: '20',
                    local: '40',
                  },
                  {
                    label: 'Sep',
                    national: '14',
                    local: '30',
                  },
                  {
                    label: 'Oct',
                    national: '22',
                    local: '22',
                  },
                  {
                    label: 'Nov',
                    national: '15',
                    local: '38',
                  },
                  {
                    label: 'Dec',
                    national: '18',
                    local: '34',
                  },
                ],
                labels: [
                  {
                    label: 'National',
                    value: 'national',
                    color: '#f54a80',
                  },
                  {
                    label: 'Local',
                    value: 'local',
                    color: '#7169cb',
                  },
                ],
                info: [],
              },
            },
          ],
          labels: [
            {
              label: 'label',
              value: 'value',
            },
          ],
          info: [],
        },
      },
    },
    sentiments: {
      title: 'Top Journalist by Sentiment',
      subTitle: 'Authors Name',
      summary: {
        label: 'Total Articles',
        value: '1.8 Million',
      },
      component: 'top_journalist_by_sentiment',
      graphType: 'sentiment_by_theme_butterfly',
      dataType: ['2d'],
      data: {
        title: '',
        subtitle: '',
        summary: [
          {
            label: '',
            subLabel: '',
          },
        ],
        data: [
          {
            label: 'Theme name placeholder 1',
            positive: 60,
            negative: 60,
          },
          {
            label: 'Theme name placeholder 2',
            positive: 75,
            negative: 75,
          },
          {
            label: 'Theme name placeholder 3',
            positive: 195,
            negative: 195,
          },
          {
            label: 'Theme name placeholder 4',
            positive: 54,
            negative: 54,
          },
          {
            label: 'Theme name placeholder 5',
            positive: 15,
            negative: 50,
          },
        ],
        labels: [
          {
            label: 'Positive',
            value: 'positive',
            color: '#6FDC8C',
          },
          {
            label: 'Negative',
            value: 'negative',
            color: '#FA4D56',
          },
        ],
        info: [],
      },
    },
    primpact: {
      gauge: {
        title: '',
        subtitle: '2020-04-17',
        summary: {
          label: '35%',
          value: 35,
          subLabel: '132/237',
        },
        data: [
          {
            label: 'SD',
            value: 20,
            thresholdValue: 80,
            color: '#58CF6B',
          },
          {
            label: 'D',
            value: 30,
            thresholdValue: 20,
            color: '#FFBA69',
          },
          {
            label: 'N',
            value: 40,
            thresholdValue: 60,
            color: '#FD708B',
          },
          {
            label: 'SDR',
            value: 120,
            thresholdValue: 180,
            color: '#58CF6B',
          },
          {
            label: 'DR',
            value: 30,
            thresholdValue: 20,
            color: '#FFBA69',
          },
        ],
        labels: [
          {
            label: 'label',
            value: 'value',
          },
        ],
        info: [],
      },
      column: {
        title: 'PR Impact',
        subTitle: '',
        component: 'pr_impact',
        graphType: 'pr_impact_column',
        data: {
          title: '',
          subtitle: '2020-04-17',
          summary: {
            subtext: '',
            value: '182',
          },
          data: [
            {
              label: 'Jan-1',
              value: 20,
              color: '#00CE75',
            },
            {
              label: 'Jan-5',
              value: 30,
              color: '#00CE75',
            },
            {
              label: 'Jan-10',
              value: 40,
              color: '#00CE75',
            },
            {
              label: 'Jan-15',
              value: 30,
              color: '#00CE75',
            },
            {
              label: 'Jan-20',
              value: 20,
              color: '#00CE75',
            },
            {
              label: 'Jan-25',
              value: 10,
              color: '#FF8C00',
            },
            {
              label: 'Jan-30',
              value: 5,
              color: '#FF8C00',
            },
            {
              label: 'Feb-1',
              value: 2,
              color: '#FF8C00',
            },
            {
              label: 'Feb-2',
              value: -5,
              color: '#ED3F47',
            },
            {
              label: 'Feb-10',
              value: -12,
              color: '#ED3F47',
            },
            {
              label: 'Feb-15',
              value: -20,
              color: '#ED3F47',
            },
            {
              label: 'Feb-20',
              value: -20,
              color: '#ED3F47',
            },
            {
              label: 'Feb-25',
              value: -15,
              color: '#ED3F47',
            },
            {
              label: 'Mar-1',
              value: -10,
              color: '#ED3F47',
            },
            {
              label: 'Mar-5',
              value: -5,
              color: '#ED3F47',
            },
            {
              label: 'Mar-10',
              value: 5,
              color: '#FF8C00',
            },
            {
              label: 'Mar-15',
              value: 10,
              color: '#FF8C00',
            },
            {
              label: 'Mar-20',
              value: 10,
              color: '#FF8C00',
            },
            {
              label: 'Mar-25',
              value: 15,
              color: '#FF8C00',
            },
            {
              label: 'Mar-30',
              value: 20,
              color: '#00CE75',
            },
            {
              label: 'Apr-1',
              value: 25,
              color: '#00CE75',
            },
            {
              label: 'Apr-5',
              value: 29,
              color: '#00CE75',
            },
            {
              label: 'Apr-10',
              value: 25,
              color: '#00CE75',
            },
            {
              label: 'Apr-15',
              value: 20,
              color: '#00CE75',
            },
            {
              label: 'Apr-20',
              value: 18,
              color: '#FF8C00',
            },
            {
              label: 'Apr-25',
              value: 16,
              color: '#FF8C00',
            },
            {
              label: 'Apr-30',
              value: 14,
              color: '#FF8C00',
            },
            {
              label: 'May-1',
              value: 12,
              color: '#FF8C00',
            },
            {
              label: 'May-5',
              value: 10,
              color: '#FF8C00',
            },
            {
              label: 'May-10',
              value: 8,
              color: '#FF8C00',
            },
            {
              label: 'May-15',
              value: 6,
              color: '#FF8C00',
            },
            {
              label: 'May-20',
              value: 4,
              color: '#FF8C00',
            },
            {
              label: 'May-25',
              value: 2,
              color: '#FF8C00',
            },
            {
              label: 'May-30',
              value: -2,
              color: '#ED3F47',
            },
            {
              label: 'Jun-1',
              value: -4,
              color: '#ED3F47',
            },
            {
              label: 'Jun-5',
              value: -6,
              color: '#ED3F47',
            },
            {
              label: 'Jun-10',
              value: -8,
              color: '#ED3F47',
            },
            {
              label: 'Jun-15',
              value: -10,
              color: '#ED3F47',
            },
            {
              label: 'Jun-20',
              value: -12,
              color: '#ED3F47',
            },
            {
              label: 'Jun-25',
              value: -14,
              color: '#ED3F47',
            },
            {
              label: 'Jun-30',
              value: -16,
              color: '#ED3F47',
            },
            {
              label: 'Jul-1',
              value: -18,
              color: '#ED3F47',
            },
            {
              label: 'Jul-5',
              value: -20,
              color: '#ED3F47',
            },
            {
              label: 'Jul-10',
              value: -24,
              color: '#ED3F47',
            },
            {
              label: 'Jul-15',
              value: -28,
              color: '#ED3F47',
            },
            {
              label: 'Jul-20',
              value: -24,
              color: '#ED3F47',
            },
            {
              label: 'Jul-25',
              value: -20,
              color: '#ED3F47',
            },
            {
              label: 'Jul-30',
              value: -16,
              color: '#ED3F47',
            },
            {
              label: 'Aug-1',
              value: -12,
              color: '#ED3F47',
            },
            {
              label: 'Aug-5',
              value: -8,
              color: '#ED3F47',
            },
            {
              label: 'Aug-10',
              value: -4,
              color: '#ED3F47',
            },
            {
              label: 'Aug-15',
              value: 4,
              color: '#FF8C00',
            },
            {
              label: 'Aug-20',
              value: 8,
              color: '#FF8C00',
            },
            {
              label: 'Aug-25',
              value: 12,
              color: '#FF8C00',
            },
            {
              label: 'Aug-30',
              value: 16,
              color: '#FF8C00',
            },
            {
              label: 'Sep-1',
              value: 20,
              color: '#00CE75',
            },
            {
              label: 'Sep-5',
              value: 24,
              color: '#00CE75',
            },
            {
              label: 'Sep-10',
              value: 28,
              color: '#00CE75',
            },
            {
              label: 'Sep-15',
              value: 32,
              color: '#00CE75',
            },
            {
              label: 'Sep-20',
              value: 36,
              color: '#00CE75',
            },
            {
              label: 'Sep-25',
              value: 40,
              color: '#00CE75',
            },
            {
              label: 'Sep-30',
              value: 44,
              color: '#00CE75',
            },
            {
              label: 'Oct-1',
              value: 48,
              color: '#00CE75',
            },
            {
              label: 'Oct-5',
              value: 52,
              color: '#00CE75',
            },
            {
              label: 'Oct-10',
              value: 58,
              color: '#00CE75',
            },
            {
              label: 'Oct-15',
              value: 58,
              color: '#00CE75',
            },
            {
              label: 'Oct-20',
              value: 58,
              color: '#00CE75',
            },
            {
              label: 'Oct-25',
              value: 50,
              color: '#00CE75',
            },
            {
              label: 'Oct-30',
              value: 44,
              color: '#00CE75',
            },
            {
              label: 'Nov-1',
              value: 38,
              color: '#00CE75',
            },
            {
              label: 'Nov-5',
              value: 32,
              color: '#00CE75',
            },
            {
              label: 'Nov-10',
              value: 24,
              color: '#00CE75',
            },
            {
              label: 'Nov-15',
              value: 18,
              color: '#FF8C00',
            },
            {
              label: 'Nov-20',
              value: 12,
              color: '#FF8C00',
            },
            {
              label: 'Nov-25',
              value: 6,
              color: '#FF8C00',
            },
            {
              label: 'Nov-30',
              value: 2,
              color: '#FF8C00',
            },
            {
              label: 'Dec-1',
              value: 38,
              color: '#00CE75',
            },
            {
              label: 'Dec-5',
              value: 32,
              color: '#00CE75',
            },
            {
              label: 'Dec-10',
              value: 24,
              color: '#00CE75',
            },
            {
              label: 'Dec-15',
              value: 18,
              color: '#FF8C00',
            },
            {
              label: 'Dec-20',
              value: 12,
              color: '#FF8C00',
            },
            {
              label: 'Dec-25',
              value: 6,
              color: '#FF8C00',
            },
            {
              label: 'Dec-30',
              value: 2,
              color: '#FF8C00',
            },
          ],
          labels: [
            {
              label: 'label',
              value: 'value',
            },
          ],
          info: [],
        },
      },
    },
    congruence: {
      title: 'Coverage by Journalist',
      subTitle: 'Total Reach',
      component: 'coverage_by_journalist',
      graphType: 'sentiment_groupped_column',
      dataType: ['2d'],
      summary: {
        label: 'Total Articles',
        value: '1.8 Million',
      },
      data: {
        title: 'Message Congruence',
        subtitle: '2020-04-17',
        summary: {
          subtext: 'Group Stacked column',
          value: '120',
          widgetName: 'Compliance Categories',
        },
        data: [
          {
            label: 'Message 1',
            subLabel:
              'Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur. A risus...',
            allMedia: '750000',
            online: '475000',
            print: '427000',
            broadcast: '227000',
          },
          {
            label: 'Message 2',
            subLabel:
              'Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur. A risus...',
            allMedia: '750000',
            online: '475000',
            print: '427000',
            broadcast: '227000',
          },
          {
            label: 'Message 3',
            subLabel:
              'Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur. A risus...',
            allMedia: '750000',
            online: '475000',
            print: '427000',
            broadcast: '227000',
          },
          {
            label: 'Message 4',
            subLabel:
              'Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur. A risus...',
            allMedia: '750000',
            online: '475000',
            print: '427000',
            broadcast: '227000',
          },
          {
            label: 'Message 5',
            subLabel:
              'Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur. A risus...',
            allMedia: '750000',
            online: '475000',
            print: '427000',
            broadcast: '227000',
          },
          {
            label: 'Message 6',
            subLabel:
              'Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. A risus Lorem ipsum dolor sit amet consectetur. A risus...',
            allMedia: '750000',
            online: '475000',
            print: '427000',
            broadcast: '227000',
          },
        ],
        labels: [
          {
            label: 'All Media',
            value: 'allMedia',
            color: '#DE1D83',
          },
          {
            label: 'Online',
            value: 'online',
            color: '#FF9315',
          },
          {
            label: 'Print',
            value: 'print',
            color: '#22AAFF',
          },
          {
            label: 'Broadcast',
            value: 'broadcast',
            color: '#8393C7',
          },
        ],
        info: [],
      },
    },
  },
  customWidgets: {
    area: {
      title: 'Result Over Time',
      subTitle: 'Total Articles',
      component: 'result_over_time',
      graphType: 'area',
      data: {
        title: 'Result Over Time',
        subTitle: 'Total Articles',
        summary: {
          subtext: '',
          value: '182',
        },
        data: [
          {
            label: 'May 1',
            value: 28000,
          },
          {
            label: 'May 8',
            value: 10000,
          },
          {
            label: 'May 15',
            value: 15000,
          },
          {
            label: 'May 22',
            value: 10000,
          },
          {
            label: 'May 29',
            value: 15000,
          },
          {
            label: 'Jun 5',
            value: 20000,
          },
          {
            label: 'Jun 12',
            value: 15000,
          },
          {
            label: 'Jun 19',
            value: 20000,
          },
          {
            label: 'Jun 26',
            value: 15000,
          },
          {
            label: 'Jul 2',
            value: 18000,
          },
          {
            label: 'Jul 9',
            value: 15000,
          },
          {
            label: 'Jul 16',
            value: 18000,
          },
          {
            label: 'Jul 22',
            value: 15000,
          },
          {
            label: 'Jul 29',
            value: 18000,
          },
          {
            label: 'Aug 6',
            value: 18000,
          },
        ],
        labels: [
          {
            label: 'label',
            value: 'value',
            color: '#675ef2',
            colorOpacity: '0.3',
            color1: '#675ef2',
            colorOpacity1: '0',
          },
        ],
        info: [],
      },
    },
    column: {
      title: 'Result Over Time',
      subTitle: 'Total Articles',
      component: 'result_over_time',
      graphType: 'result_over_time_column',
      data: {
        title: 'Result Over Time',
        subTitle: 'Total Articles',
        summary: {
          subtext: '',
          value: '182',
        },
        data: [
          {
            label: 'May 1',
            broadcast: '10000',
            print: '10000',
            online: '8000',
          },
          {
            label: 'May 8',
            broadcast: '5000',
            print: '2500',
            online: '2500',
          },
          {
            label: 'May 15',
            broadcast: '5000',
            print: '5000',
            online: '5000',
          },
          {
            label: 'May 22',
            broadcast: '5000',
            print: '2500',
            online: '2500',
          },
          {
            label: 'May 29',
            broadcast: '5000',
            print: '5000',
            online: '5000',
          },
          {
            label: 'Jun 5',
            broadcast: '10000',
            print: '5000',
            online: '5000',
          },
          {
            label: 'Jun 12',
            broadcast: '5000',
            print: '5000',
            online: '5000',
          },
          {
            label: 'Jun 19',
            broadcast: '5000',
            print: '10000',
            online: '5000',
          },
          {
            label: 'Jun 26',
            broadcast: '5000',
            print: '5000',
            online: '5000',
          },
          {
            label: 'Jul 2',
            broadcast: '6000',
            print: '6000',
            online: '6000',
          },
          {
            label: 'Jul 9',
            broadcast: '5000',
            print: '5000',
            online: '5000',
          },
        ],
        labels: [
          {
            label: 'Print',
            value: 'print',
            color: '#D62884',
          },
          {
            label: 'Broadcast',
            value: 'broadcast',
            color: '#F282BD',
          },
          {
            label: 'Online',
            value: 'online',
            color: '#FFC9E5',
          },
        ],
        info: [],
      },
    },
  },
  dashboardDetails: [],
  selectedWidgets: {
    people: {
      people_volume_analysis: true,
      people_coverage_over_time: true,
      people_top_journalist_by_sentiment: true,
    },
  },
};
