export const compaignMapData = {
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
};

export const congruenceMapData = {
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
    ],
    labels: [
      {
        label: 'All Media',
        value: 'message_congruence',
        color: '#DE1D83',
      },
      {
        label: 'Online',
        value: 'Online',
        color: '#FF9315',
      },
      {
        label: 'Print',
        value: 'Print',
        color: '#22AAFF',
      },
      {
        label: 'Broadcast',
        value: 'Broadcast',
        color: '#8393C7',
      },
    ],
    info: [],
  },
};

export const sentimentByThemes = {
  title: 'Top Journalist by Sentiment',
  subTitle: "Author's Name",
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
    data: [],
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
};

export const authorImpactMapData = {
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
};

export const prImpactMapData = {
  gauge: {
    title: '',
    subtitle: '2020-04-17',
    summary: {
      label: '95%',
      value: 95,
      subLabel: '132/237',
      rawValue: '',
    },
    data: [
      {
        label: 'SD',
        value: 30,
        // thresholdValue: 80,
        color: '#ED3F47',
      },
      {
        label: 'D',
        value: 100,
        // thresholdValue: 20,
        color: '#FF8C00',
      },

      {
        label: 'N',
        value: 180,
        // thresholdValue: 60,
        color: '#00CE75',
      },
      // {
      //   label: 'SDR',
      //   value: 120,
      //   thresholdValue: 180,
      //   color: '#58CF6B',
      // },
      // {
      //   label: 'DR',
      //   value: 30,
      //   thresholdValue: 20,
      //   color: '#FFBA69',
      // },
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
};
