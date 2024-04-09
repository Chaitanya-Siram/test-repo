import { widgetImg, widgetPlaceHolders } from '../assets/img/widgetsImg';
import GeoBreakDown from '../components/geographical_breakdown';
import HorizontalMultiBar from '../components/horizontal-bar';
import L1Carousel from '../components/l1-carousel';
import RecentSearches from '../components/recent-searches';
import SingleArticle from '../components/single-article';
import TopFiveSearches from '../components/top-five-searches';
import UberStatsSentiment from '../components/uber-stats-sentiment';
import UberStatsVolume from '../components/uber-stats-volume';
import UberStats from '../components/user-stats';
import {
  BigBubble,
  CoolColumn,
  GreatGuage,
  LinearLine,
  PieGraph,
  Radar,
  WordCloud,
  RadialPieChart,
  BestBar,
  USMapChart,
  WorldMapGraph,
  CoolColumn3D,
} from '../graphs';

const handleOnClick = (event, d, i) => {
  console.log('handleOnClick', event, d, i);
};

const handleMouseOver = (event, d, i) => {
  // console.log('handleMouseOver', event, d, i);
};

const handleMouseOut = (event, d, i) => {
  // console.log('handleMouseOut', event, d, i);
};

const handleMouseEnter = (event, d, i) => {
  // console.log('handleMouseEnter', event, d, i);
};

const handleMouseMove = (event, d, i) => {
  // console.log('handleMouseMove', event, d, i);
};

const handleMouseLeave = (event, d, i) => {
  // console.log('handleMouseLeave', event, d, i);
};

export const events = {
  handleOnClick,
  handleMouseOver,
  handleMouseOut,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
};

export const gridLine = {
  enableGridXLine: false,
  enableGridYLine: true,
  gridLineStrokeWidth: 1,
  gridLineXStroke: '#d9dbde',
};

export const noGridLine = { enableGridXLine: false, enableGridYLine: true };

export const L1GridLineConfig = {
  gridYTicks: 6,
  hideYAxis: false,
  gridLineYStroke: '#d9dbdedd',
  gridLineStrokeWidth: 1,
  enableGridXLine: false,
  enableGridYLine: true,
};

export const L1GridLineBarConfig = {
  hideYAxis: true,
  gridLineXStroke: '#d9dbdedd',
  gridLineStrokeWidth: 1,
  enableGridXLine: true,
  enableGridYLine: false,
};

export const coolColumn3DConfig = {
  graphType: 'column',
  gridXYLabelFontSize: 12,
  enableTooltip: true,
  gridYTicks: 6,
  ...events,
};

const graphConfig = {
  bubble: {
    enableTooltip: true,
    graphType: 'bubble',
    ...events,
  },
  column: {
    graphType: 'column',
    gridXYLabelFontSize: 12,
    enableTooltip: true,
    ...events,
    yAxisType: 'number',
    yAxisTicksFormat: true,
    yLabelAlignment: 40,
    gridYTicks: 6,
    gridLineXStroke: '#d9dbdedd',
    gridLineStrokeWidth: 1,
    enableGridXLine: false,
    enableGridYLine: true,
    xAxisType: 'text',
    singleLineWrp: true,
    gridXTicks: 8,
  },
  column_fixed_width: {
    graphType: 'group',
    gutterSpace: 1,
    gridXTicks: 6,
    gridYTicks: 6,
    gridLineYStroke: '#EBEBEB',
    gridLineStrokeWidth: 1,
    enableGridYLine: true,
    enableTooltip: true,
    ...events,
  },
  coolColumn3D: {
    graphType: 'column',
    gridXYLabelFontSize: 12,
    hideXAxis: false,
    enableTooltip: true,
    gridYTicks: 6,
    yAxisType: 'number',
    // xLabelAlignment: 5,
    yAxisTicksFormat: true,
    enableRectLabels: true,
    colors: ['#675EF2', '#F54A80', '#FCAF41'],
    ...events,
  },
  coolColumn3DNoLabel: {
    graphType: 'column',
    gridXYLabelFontSize: 12,
    hideXAxis: false,
    enableTooltip: true,
    gridYTicks: 6,
    yAxisType: 'number',
    // xLabelAlignment: 5,
    yAxisTicksFormat: true,
    enableRectLabels: false,
    colors: ['#675EF2', '#F54A80', '#FCAF41'],
    ...events,
  },
  groupped_column: {
    graphType: 'group',
    gridYTicks: 6,
    gridLineYStroke: '#EBEBEB',
    gridLineStrokeWidth: 1,
    enableGridYLine: true,
    enableTooltip: true,
    yAxisType: 'number',
    yLabelAlignment: 50,
    yAxisTicksFormat: true,
    columnWidth: 32,
    ...events,
  },
  gauge: {
    startAngle: (-1 * Math.PI) / 2,
    endAngle: Math.PI / 2,
    enableArcBG: '#F0F2F5',
    arcDividerStrokeColor: 'none',
    innerRadius: 0.2, // 0.01 - 0.5
    enableNeedle: true,
  },
  gauge_meter: {
    startAngle: (-1 * Math.PI) / 2,
    endAngle: Math.PI / 2,
    enableArcBG: '#F0F2F5',
    arcDividerStrokeColor: 'none',
    innerRadius: 0.2, // 0.01 - 0.5
    enableNeedle: true,
  },
  gauge2d: {
    startAngle: Math.PI * -0.5,
    endAngle: Math.PI * 0.5,
    endRadius: 0,
    arcWidth: 20,
    arcPadding: 5,
    hideNeedle: false,
  },
  line: {
    // graphType: 'area',
    graphType: 'line',
    gridXYLabelFontSize: 12,
    enableCurve: true,
    enableGradient: true,
    enableAreaLine: true,
    areaLineStroke: '#E20074',
    enableTooltip: true,
    ...events,
    yLabelAlignment: 40,
    yAxisTicksFormat: true,
    yAxisType: 'number',
    gridYTicks: 6,
    gridXTicks: 8,
    graphAreaWMultiplayer: 0.95,
    xAxisType: 'text',
    singleLineWrp: true,
    ...gridLine,
  },
  stacked_line: {
    graphType: 'sarea',
    yAxisType: 'number',
    yDomainMultiplayer: 0.001,
    gridYTicks: 5,
    yLabelAlignment: 40,
    yAxisTicksFormat: true,
    graphAreaWMultiplayer: 1,
    ...gridLine,
  },
  area: {
    graphType: 'area',
    gridXYLabelFontSize: 12,
    enableCurve: true,
    enableGradient: true,
    enableAreaLine: false,
    areaLineStroke: '#E20074',
    enableTooltip: true,
    ...events,
    yAxisType: 'number',
    yLabelAlignment: 50,
    yAxisTicksFormat: true,
    enableNeedle: false,
    gridXTicks: 6,
    gridYTicks: 6,
    graphAreaWMultiplayer: 0.95,
    ...gridLine,
  },
  result_over_time_area: {
    graphType: 'area',
    gridXYLabelFontSize: 12,
    enableCurve: true,
    enableGradient: true,
    enableAreaLine: true,
    areaLineStroke: '#675ef2',
    enableTooltip: true,
    yAxisType: 'number',
    yLabelAlignment: 30,
    yAxisTicksFormat: true,
    graphAreaWMultiplayer: 0.98,
    ...events,
    ...gridLine,
    enableGridXLine: true,
  },
  line2d: {
    graphType: 'line',
    gridXYLabelFontSize: 12,
    enableCurve: true,
    enableGradient: true,
    enableAreaLine: true,
    areaLineStroke: '#E20074',
    enableTooltip: true,
    graphAreaWMultiplayer: 0.95,
    ...events,
    ...gridLine,
  },
  donut: {
    startAngle: -1 * (Math.PI / 2),
    endAngle: Math.PI + Math.PI / 2,
    enableArcBG: '#F0F2F5',
    arcDividerStrokeColor: 'none',
    innerRadius: 0.4, // 0.01 - 0.5
    arcLabel: true,
    enablePolyline: false,
    enableCenterText: false,
    enableTooltip: true,
    graphType: 'donut',
    ...events,
  },
  concentric_donut: {
    startAngle: Math.PI * -0.5,
    endAngle: Math.PI * 0.5,
    endRadius: 0,
    arcWidth: 20,
    arcPadding: 5,
    hideNeedle: false,
  },
  pie: {
    arcLabel: true,
    graphType: 'pie',
    enableTooltip: true,
  },
  concentric_pie: {
    startAngle: -1 * Math.PI,
    endAngle: Math.PI,
    enableArcBG: '#F0F2F5',
    arcDividerStrokeColor: 'none',
    innerRadius: 0.2, // 0.01 - 0.5
    enablePolyline: true,
    arcLabel: true,
  },
  radar: {
    backgroundType: 'circle1',
    startAngle: -1 * Math.PI,
    endAngle: Math.PI,
    enableArcBG: '#F0F2F5',
    arcDividerStrokeColor: 'none',
    innerRadius: 0.2, // 0.01 - 0.5
    enablePolyline: true,
    arcLabel: true,
  },
  word_cloud: {},
  radial_pie: { arcLabel: true },
  bar: {
    yAxisType: 'text',
    yLabelAlignment: 60,
    graphType: 'bar',
  },
  bar2d: { graphType: 'group' },
  usmap: {
    enableTooltip: true,
    ...events,
    graphType: 'us_map',
    interpolateColors: ['#675EF2', '#D2CDFF'],
  },
  worldmap: {
    graphType: 'world_map',
    enableTooltip: true,
    ...events,
  },
  stackedBar: {
    graphType: 'stack',
    yLabelAlignment: 45,
    yAxisType: 'text',
    xAxisType: 'number',
    xAxisTicksFormat: true,
    gridXTicks: 5,
    gutterSpace: 25,
  },
  butterfly: {},
  top_theme_config: {
    graphType: 'column',
    gridXYLabelFontSize: 12,
    hideYAxis: true,
    enableTooltip: true,
    ...events,
    gridXTicks: 6,
    yLabelAlignment: 5,
    singleLineWrp: true,
    maxData: 5,
  },
  top_author_config: {
    graphType: 'column',
    gridXYLabelFontSize: 12,
    hideYAxis: true,
    enableTooltip: true,
    ...events,
    enableNeedle: false,
    yLabelAlignment: 5,
    yAxisTicksFormat: true,
    yAxisType: 'number',
  },
  popular_topics_config: {
    graphType: 'column',
    gridXYLabelFontSize: 12,
    hideYAxis: true,
    enableTooltip: true,
    ...events,
    enableNeedle: false,
    yLabelAlignment: 5,
    gridXTicks: 4,
  },
};

export const graphTypes = {
  bubble: {
    label: 'Bubble',
    value: 'bubble',
    component: BigBubble,
    config: graphConfig.bubble,
    supportType: ['1d'],
  },
  column: {
    label: 'Column',
    value: 'column',
    component: CoolColumn,
    config: graphConfig.column,
    supportType: ['1d', '2d'],
  },
  result_over_time_column: {
    label: 'Column',
    value: 'result_over_time_column',
    component: CoolColumn,
    config: {
      ...graphConfig.column,
      gutterSpace: 25,
      hideYAxis: false,
      yLabelAlignment: 50,
    },
    supportType: ['1d', '2d'],
  },
  stacked_column: {
    label: 'Column',
    value: 'stacked_column',
    component: CoolColumn,
    config: {
      ...graphConfig.column,
      yLabelAlignment: 45,
      gridLineXStroke: '#d9dbdedd',
      gridLineStrokeWidth: 1,
      enableGridXLine: false,
      enableGridYLine: true,
    },
    supportType: ['1d', '2d'],
  },
  pr_impact_column: {
    label: 'Column',
    value: 'pr_impact_column',
    component: CoolColumn,
    config: { ...graphConfig.column_fixed_width, gridXTicks: 10 },
    supportType: ['1d', '2d'],
  },
  groupped_column: {
    label: 'Groupped Column',
    value: 'groupped_column',
    component: CoolColumn,
    config: {
      ...graphConfig.groupped_column,
      gutterSpace: 50,
      yLabelAlignment: 40,
    },
    supportType: ['2d'],
  },
  advanced_author_groupped_column: {
    label: 'Groupped Column',
    value: 'advanced_author_groupped_column',
    component: CoolColumn,
    config: {
      ...graphConfig.groupped_column,
      gutterSpace: 20,
      yLabelAlignment: 40,
    },
    supportType: ['2d'],
  },
  people_grouped_column: {
    label: 'Groupped Column',
    value: 'people_grouped_column',
    component: CoolColumn,
    config: {
      ...graphConfig.groupped_column,
      yLabelAlignment: 40,
      yAxisTicksFormat: true,
      yAxisType: 'number',
      gutterSpace: 70,
    },
    supportType: ['2d'],
  },
  sentiment_groupped_column: {
    label: 'Groupped Column',
    value: 'sentiment_groupped_column',
    component: CoolColumn,
    config: {
      ...graphConfig.groupped_column,
      valueInPercent: true,
      yAxisType: 'percentage',
      // gutterSpace: window.innerWidth / 7.5,
      columnWidth: 64,
    },
    supportType: ['2d'],
  },
  column_fixed_width: {
    label: 'Fixed Width Column',
    value: 'column_fixed_width',
    component: CoolColumn,
    config: graphConfig.column_fixed_width,
    supportType: ['1d', '2d'],
  },
  cool_column_3d: {
    label: '3D Data',
    value: 'cool_column_3d',
    component: CoolColumn3D,
    config: graphConfig.coolColumn3D,
    supportType: ['3d'],
  },
  cool_column_3d_NL: {
    label: '3D Data',
    value: 'cool_column_3d_NL',
    component: CoolColumn3D,
    config: graphConfig.coolColumn3DNoLabel,
    supportType: ['3d'],
  },

  gauge: {
    label: 'Gauge',
    value: 'gauge',
    component: GreatGuage,
    config: graphConfig.guage,
    supportType: ['1d'],
  },
  gauge_meter: {
    label: 'Gauge Meter',
    value: 'gauge_meter',
    component: PieGraph,
    config: graphConfig.gauge_meter,
    supportType: ['1d'],
  },
  line: {
    label: 'Line',
    value: 'line',
    component: LinearLine,
    config: graphConfig.line,
    supportType: ['1d', '2d'],
  },
  stacked_line: {
    label: 'Stacked Line',
    value: 'stacked_line',
    component: LinearLine,
    config: graphConfig.stacked_line,
    supportType: ['1d', '2d'],
  },
  pie: {
    label: 'Pie',
    value: 'pie',
    component: PieGraph,
    config: graphConfig.pie,
    supportType: ['1d'],
  },
  donut: {
    label: 'Donut',
    value: 'donut',
    component: PieGraph,
    config: graphConfig.donut,
    supportType: ['1d'],
  },
  concentric_donut: {
    label: 'Concentric Donut',
    value: 'concentric_donut',
    component: GreatGuage,
    config: graphConfig.concentric_donut,
    supportType: ['2d'],
  },
  radar: {
    label: 'Radar',
    value: 'radar',
    component: Radar,
    config: graphConfig.radar,
    supportType: ['1d'],
  },
  word_cloud: {
    label: 'Word Cloud',
    value: 'word_cloud',
    component: WordCloud,
    config: graphConfig.wordcloud,
    supportType: ['1d'],
  },
  radial_pie: {
    label: 'Radial Pie',
    value: 'radial_pie',
    component: RadialPieChart,
    config: graphConfig.radial_pie,
    supportType: ['1d'],
  },
  butterfly: {
    label: 'Butterfly',
    value: 'butterfly',
    component: HorizontalMultiBar,
    config: graphConfig.butterfly,
    supportType: ['2d'],
  },
  sentiment_by_theme_butterfly: {
    label: 'Butterfly',
    value: 'sentiment_by_theme_butterfly',
    component: HorizontalMultiBar,
    config: { ...graphConfig.butterfly, barGap: '0' },
    supportType: ['2d'],
  },
  concentric_pie: {
    label: 'Concenteric Pie',
    value: 'concentric_pie',
    component: PieGraph,
    config: graphConfig.concentric_pie,
    supportType: ['1d'],
  },
  bar: {
    label: 'Bar',
    value: 'bar',
    component: BestBar,
    config: {
      ...graphConfig.bar,
      yLabelAlignment: 80,
      yAxisTicksFormat: true,
      yAxisType: 'number',
      gridLineXStroke: '#d9dbde',
      gridLineStrokeWidth: 1,
      enableGridXLine: true,
      enableGridYLine: false,
    },
    supportType: ['1d', '2d'],
  },
  author_impact_bar: {
    label: 'Bar',
    value: 'author_impact_bar',
    component: BestBar,
    config: {
      ...graphConfig.bar,
      yLabelAlignment: 55,
      yAxisTicksFormat: true,
      yAxisType: 'text',
      hideXAxis: true,
      gutterSpace: 35,
      gridLineXStroke: '#d9dbde',
      gridLineStrokeWidth: 1,
      enableGridXLine: true,
      enableGridYLine: false,
      wrapLength: 5,
    },
    supportType: ['1d', '2d'],
  },
  top_sources_bar: {
    label: 'Bar',
    value: 'top_sources_bar',
    component: BestBar,
    config: {
      ...graphConfig.bar,
      yLabelAlignment: 70,
      yAxisTicksFormat: true,
      yAxisType: 'text',
      xAxisType: 'number',
      xAxisTicksFormat: true,
      wrapLength: 7,
      gridLineXStroke: '#d9dbde',
      gridLineStrokeWidth: 1,
      enableGridXLine: true,
      enableGridYLine: false,
    },
    supportType: ['1d', '2d'],
  },
  top_author_bar: {
    label: 'Bar',
    value: 'top_author_bar',
    component: BestBar,
    config: {
      ...graphConfig.bar,
      yLabelAlignment: 70,
      yAxisTicksFormat: true,
      yAxisType: 'text',
      xAxisType: 'number',
      xAxisTicksFormat: true,
      wrapLength: 7,
      gridLineXStroke: '#d9dbde',
      gridLineStrokeWidth: 1,
      enableGridXLine: true,
      enableGridYLine: false,
    },
    supportType: ['1d', '2d'],
  },
  us_map: {
    label: 'US Map',
    value: 'us_map',
    component: USMapChart,
    config: graphConfig.usmap,
    supportType: ['1d'],
  },
  world_map: {
    label: 'World Map',
    value: 'world_map',
    component: WorldMapGraph,
    config: graphConfig.worldmap,
    supportType: ['1d'],
  },
  grouped_bar: {
    label: 'Grouped bar',
    value: 'grouped_bar',
    component: BestBar,
    config: graphConfig.bar2d,
    supportType: ['2d'],
  },
  stacked_bar: {
    label: 'Stacked bar',
    value: 'stacked_bar',
    component: BestBar,
    maxData: 6,
    config: {
      ...graphConfig.stackedBar,
      yLabelAlignment: 50,
      gutterSpace: 40,
      wrapLength: 4,
      gridLineXStroke: '#d9dbdedd',
      gridLineStrokeWidth: 1,
      enableGridXLine: true,
      enableGridYLine: false,
    },
    supportType: ['2d'],
  },
  uber_stats: {
    label: 'Stats',
    value: 'uber_stats',
    component: UberStats,
    config: graphConfig.stackedBar,
    supportType: ['2d'],
  },
  uber_stats_volume: {
    label: 'Stats',
    value: 'uber_stats_volume',
    component: UberStatsVolume,
    config: graphConfig.stackedBar,
    supportType: ['2d'],
  },
  uber_stats_sentiment: {
    label: 'Stats',
    value: 'uber_stats_sentiment',
    component: UberStatsSentiment,
    config: graphConfig.stackedBar,
    supportType: ['2d'],
  },
  // profile_line , profile_radar
  profile_line: {
    label: 'Line',
    value: 'profile_line',
    component: LinearLine,
    config: graphConfig.area,
    supportType: ['1d', '2d'],
  },
  profile_radar: {
    label: 'Radar',
    value: 'profile_radar',
    component: Radar,
    config: graphConfig.radar,
    supportType: ['1d'],
  },
  area: {
    label: 'Area',
    value: 'area',
    component: LinearLine,
    config: graphConfig.result_over_time_area,
    supportType: ['1d', '2d'],
  },
};

export const overviewWidgets = {
  result_over_time: {
    label: 'Result Over Time',
    slotType: 'full',
    allowedGraphTypes: [graphTypes.groupped_column, graphTypes.area],
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.bar, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.resultOvertime,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  media_type: {
    label: 'Media type',
    allowedGraphTypes: [graphTypes.pie, graphTypes.donut],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: {
          ...graphConfig.pie,
          enableNeedle: false,
          arcLabel: false,
        },
      },
    },
    img: widgetImg.mediaTypePie,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  sov: {
    label: 'SOV',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.mediaTypePie,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  word_cloud: {
    label: 'Word Cloud',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: WordCloud,
        config: {
          ...graphConfig.word_cloud,
          yLabelAlignment: 5,
          maxData: 5,
          minFontSize: 7,
          maxFontSize: 20,
          padding: { left: 0, top: 0, bottom: 0, right: 10 },
        },
      },
    },
    img: widgetImg.wordCloud,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  top_source: {
    label: 'Top Source',
    allowedGraphTypes: [graphTypes.bar, graphTypes.column],
    slotType: 'half',
    bentoView: {
      l1: {
        component: BestBar,
        config: {
          yAxisType: 'text',
          yLabelAlignment: 5,
          graphType: 'bar',
          gridXTicks: 4,
          enableNeedle: false,
          xAxisType: 'number',
          xAxisTicksFormat: true,
          ...L1GridLineBarConfig,
          ...events,
        },
      },
    },
    img: widgetImg.topSources,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  top_themes: {
    label: 'Top Themes',
    allowedGraphTypes: [graphTypes.bubble, graphTypes.column],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.top_theme_config,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.topTheme,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  outlet_breakdown: {
    label: 'Outlet Breakdown',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn3D,
        // graphComponent: PieGraph,
        config: {
          ...graphConfig.coolColumn3D,
          hideXAxis: true,
          hideYAxis: true,
          yLabelAlignment: 15,
          xLabelAlignment: 0,
          enableRectLabels: false,
        },
      },
    },
    img: widgetImg.outletBreakDown,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  top_author: {
    label: 'Top Author',
    allowedGraphTypes: [graphTypes.column, graphTypes.bar],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: { ...graphConfig.top_author_config, ...L1GridLineConfig },
      },
    },
    img: widgetImg.topSources,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  geographical_breakdown: {
    label: 'Geographical Breakdown',
    allowedGraphTypes: [],
    slotType: 'half',

    bentoView: {
      l1: {
        component: USMapChart,
        config: graphConfig.usmap,
        // component: L1Carousel,
        // graphComponent: GeoBreakDown,
        // config: {
        //   ...graphConfig.uber_stats_volume,
        //   enableNeedle: false,
        //   maxData: 6,
        // },
      },
    },
    img: widgetImg.geographicalBreakdown,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  sentiment: {
    label: 'Sentiment',
    allowedGraphTypes: [graphTypes.pie, graphTypes.donut],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        // graphComponent: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.mediaTypePie,
    placeholder: widgetPlaceHolders.detailsGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
};

export const brandWidgets = {
  volume_analysis: {
    type: 'brand',
    label: 'Volume Analysis',
    allowedGraphTypes: [],
    slotType: 'half',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    bentoView: {
      l1: {
        component: L1Carousel,
        graphComponent: GeoBreakDown,
        config: { ...graphConfig.uber_stats_volume, enableNeedle: false },
      },
    },
    img: widgetImg.volumeAnalysis,
    placeholder: widgetPlaceHolders.detailsGraph,
  },
  sentiment_analysis: {
    type: 'brand',
    label: 'Sentiment Analysis',
    allowedGraphTypes: [graphTypes.pie, graphTypes.donut],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        // graphComponent: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.mediaTypePie,
    placeholder: widgetPlaceHolders.detailsGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  sentiment_over_time: {
    type: 'brand',
    label: 'Sentiment Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: LinearLine,
        config: {
          ...graphConfig.line,
          enableNeedle: false,
          gridXTicks: 4,
          gridYTicks: 6,
          yAxisType: 'number',
          yLabelAlignment: 10,
          yAxisTicksFormat: true,
          hideYAxis: true,
          lineStrokeWidth: 1.5,
          // graphAreaWMultiplayer: 1,
          ...noGridLine,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.stackedBar,
    placeholder: widgetPlaceHolders.areaGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  coverage_over_time: {
    type: 'brand',
    label: 'Coverage Over Time',
    allowedGraphTypes: [graphTypes.line, graphTypes.column],
    slotType: 'half',
    bentoView: {
      l1: {
        component: LinearLine,
        config: {
          ...graphConfig.line,
          gridYTicks: 6,
          gridXTicks: 4,
          hideYAxis: true,
          yLabelAlignment: 10,
          lineStrokeWidth: 1.5,
          ...noGridLine,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.coverageOverTime,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam. Nullam enim odio, faucibus scelerisque dolor vitae, tristique blandit elit.',
    tooltipEnabled: true,
  },
  reach_over_time: {
    type: 'brand',
    label: 'Reach Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.column,
          enableNeedle: false,
          hideYAxis: true,
          gridXTicks: 6,
          gridYTicks: 6,
          gutterSpace: 15,
          yLabelAlignment: 10,
          maxData: 5,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.resultOvertime,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  media_type: {
    type: 'brand',
    label: 'Media Type',
    allowedGraphTypes: [graphTypes.groupped_column, graphTypes.line],
    slotType: 'half',
    bentoView: {
      l1: {
        component: L1Carousel,
        graphComponent: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.mediaTypeBar,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam. Nullam enim odio, faucibus scelerisque dolor vitae, tristique blandit elit.',
    tooltipEnabled: true,
  },
  sov: {
    type: 'competition',
    label: 'SOV',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: {
          ...graphConfig.donut,
          enableNeedle: false,
          innerRadius: 0.3,
          arcLabel: false,
          enableCenterText: false,
        },
      },
    },
    img: widgetImg.mediaTypePie,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  article_sentiment: {
    type: 'competition',
    label: 'Article Sentiment',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: BestBar,
        config: {
          ...graphConfig.stackedBar,
          gridXTicks: 6,
          gridYTicks: 6,
          yLabelAlignment: 5,
          gutterSpace: 15,
          wrapLength: 4,
          hideYAxis: true,
          ...L1GridLineBarConfig,
        },
      },
    },
    img: widgetImg.articleSentiment,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  competitive_coverage_over_time: {
    type: 'competition',
    label: 'Coverage Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: LinearLine,
        config: {
          ...graphConfig.line,
          gridXTicks: 6,
          gridYTicks: 6,
          hideYAxis: true,
          lineStrokeWidth: 1.5,
          ...noGridLine,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.coverageOverTime,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  competitive_reach_over_time: {
    type: 'competition',
    label: 'Reach Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: LinearLine,
        config: {
          ...graphConfig.line,
          gridXTicks: 6,
          gridYTicks: 6,
          hideYAxis: true,
          lineStrokeWidth: 1.5,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.reachOverTime,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  coverage_by_journalist: {
    type: 'competition',
    label: 'Coverage by Journalist',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.groupped_column,
          hideYAxis: true,
          gridXTicks: 6,
          gridYTicks: 6,
          gutterSpace: 15,
          yLabelAlignment: 10,
          columnWidth: 24,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.mediaTypeBar,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  coverage_by_source: {
    type: 'competition',
    label: 'Coverage by Sources',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn3D,
        config: {
          ...graphConfig.coolColumn3D,
          hideXAxis: true,
          xLabelAlignment: 0,
          gutterSpace: 15,
          hideYAxis: true,
          yLabelAlignment: 15,
          enableRectLabels: false,
          gridXTicks: 6,
        },
      },
    },
    placeholder: widgetPlaceHolders.barGraph,
    img: widgetImg.outletBreakDown,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  breakdown_by_media_type: {
    type: 'competition',
    label: 'Breakdown By Media Type',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn3D,
        config: {
          ...graphConfig.coolColumn3D,
          hideXAxis: true,
          xLabelAlignment: 0,
          gutterSpace: 15,
          hideYAxis: true,
          yLabelAlignment: 15,
          enableRectLabels: false,
        },
      },
    },
    img: widgetImg.outletBreakDown,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
};

export const industryWidgets = {
  industry_volume_analysis: {
    type: 'industry',
    label: 'Volume Analysis',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: L1Carousel,
        graphComponent: GeoBreakDown,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.volumeAnalysis,
    placeholder: widgetPlaceHolders.detailsGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  industry_sentiment_analysis: {
    type: 'industry',
    label: 'Sentiment Analysis',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        graphComponent: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    img: widgetImg.mediaTypePie,
    placeholder: widgetPlaceHolders.detailsGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  industry_coverage_by_journalist: {
    type: 'industry',
    label: 'Coverage by Journalist',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.column,
          yLabelAlignment: 0,
          arcLabel: false,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.coverageByJournalist,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  industry_coverage_by_source: {
    type: 'industry',
    label: 'Coverage by Source',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.column,
          gutterSpace: 15,
          yLabelAlignment: 5,
          ...L1GridLineConfig,
        },
      },
    },
    placeholder: widgetPlaceHolders.barGraph,
    img: widgetImg.topSourceBySentiment,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  industry_companies_mentioned: {
    type: 'industry',
    label: 'Campanies Mentioned',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: WordCloud,
        config: { ...graphConfig.word_cloud, enableNeedle: false },
      },
    },
    img: widgetImg.wordCloud,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  industry_coverage_over_time: {
    type: 'industry',
    label: 'Coverage Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: LinearLine,
        config: {
          ...graphConfig.line,
          gridXTicks: 6,
          gridYTicks: 6,
          hideYAxis: true,
          yLabelAlignment: 10,
          lineStrokeWidth: 1.5,
          ...noGridLine,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.coverageOverTime,
    placeholder: widgetPlaceHolders.lineGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  industry_coverage_by_top_publications: {
    type: 'industry',
    label: 'Coverage by top Publications',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: BestBar,
        config: {
          ...graphConfig.bar,
          gridXTicks: 5,
          enableNeedle: false,
          wrapLength: 6,
          hideYAxis: true,
          yLabelAlignment: 5,
          ...L1GridLineBarConfig,
        },
      },
    },
    img: widgetImg.topSources,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
};

export const people = {
  people_volume_analysis: {
    type: 'people',
    label: 'Volume Analysis',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: L1Carousel,
        graphComponent: GeoBreakDown,
        config: { ...graphConfig.pie, enableNeedle: false, arcLabel: false },
      },
    },
    placeholder: widgetPlaceHolders.detailsGraph,
    img: widgetImg.volumeAnalysis,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  people_coverage_over_time: {
    type: 'people',
    label: 'Coverage Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: LinearLine,
        config: {
          ...graphConfig.line,
          gridXTicks: 6,
          hideYAxis: true,
          yLabelAlignment: 10,
          lineStrokeWidth: 1.5,
          ...noGridLine,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.coverageOverTime,
    placeholder: widgetPlaceHolders.detailsGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  people_top_journalist_by_sentiment: {
    type: 'people',
    label: 'Top Journalist by Sentiment',
    allowedGraphTypes: [],
    maxData: 6,
    slotType: 'half',
    bentoView: {
      l1: {
        component: BestBar,
        config: {
          ...graphConfig.stackedBar,
          enableNeedle: false,
          yLabelAlignment: 5,
          wrapLength: 4,
          gutterSpace: 15,
          hideYAxis: true,
          ...L1GridLineBarConfig,
        },
      },
    },
    img: widgetImg.articleSentiment,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  people_top_source_by_sentiment: {
    type: 'people',
    label: 'Top Source by Sentiment',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.column,
          enableNeedle: false,
          arcLabel: false,
          gutterSpace: 15,
          yLabelAlignment: 0,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.topSourceBySentiment,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  people_popular_topics: {
    type: 'people',
    label: 'Popular Topics',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.popular_topics_config,
          enableNeedle: false,
          hideYAxis: true,
          singleLineWrp: true,
          maxData: 5,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.topTheme,
    placeholder: widgetPlaceHolders.barGraph,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,
  },
  people_media_type: {
    type: 'people',
    label: 'Media Type',
    allowedGraphTypes: [],
    slotType: 'half',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
    tooltipEnabled: true,

    bentoView: {
      l1: {
        component: CoolColumn,
        config: {
          ...graphConfig.groupped_column,
          enableNeedle: false,
          yLabelAlignment: 10,
          yAxisTicksFormat: true,
          yAxisType: 'number',
          gutterSpace: 15,
          hideYAxis: true,
          ...L1GridLineConfig,
        },
      },
    },
    img: widgetImg.mediaTypeBar,
    placeholder: widgetPlaceHolders.barGraph,
  },
};

export const advancedDashboardWidgets = {
  campaigns_impact: {
    label: 'Campaign Monitor',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.campaignMonitor,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
  },
  author_imapct: {
    label: 'Author Imapct',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.authorImpact,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
  },
  sentiment_by_themes: {
    label: 'Sentiment by Themes',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.sentiments,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut ultrices quam.',
  },
  message_congruence_by_Media: {
    label: 'Message Congruence by Media',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.messageCongruence,
  },
  message_congruence_by_total_mentions: {
    label: 'Message Congruence by total mentions',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.messageCongruence,
  },
  pr_impact_scale: {
    label: 'PR Impact Scale',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.prImpact,
  },
};

export const profileWidgets = {
  volume_analysis: {
    label: 'Volume Analysis',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.messageCongruence,
  },
  sentiment_analysis: {
    label: 'Sentiment Analysis',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.sentiments,
  },
  sentiment_over_time: {
    label: 'Sentiment Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.reach,
  },
  coverage_over_time: {
    label: 'Coverage Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.reach,
  },
  media_type: {
    label: 'Media Type',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.mediaType,
  },
  reach_over_time: {
    label: 'Reach Over Time',
    allowedGraphTypes: [],
    slotType: 'half',
    bentoView: {
      l1: {
        component: PieGraph,
        config: { ...graphConfig.pie, enableNeedle: false },
      },
    },
    img: widgetImg.reach,
  },
};

export const standardDashboards = [
  {
    label: 'Brand',
    value: 'brand',
    widgets: brandWidgets,
  },
  {
    label: 'Industry',
    value: 'industry',
    widgets: industryWidgets,
  },
  {
    label: 'People',
    value: 'people',
    widgets: people,
  },
];

export const dashboards = [
  {
    label: 'Overview',
    value: 'overview',
    widgets: overviewWidgets,
  },
  ...standardDashboards,
  {
    label: 'Advance Dashboard',
    value: 'advance_dashboard',
    widgets: advancedDashboardWidgets,
  },
  {
    label: 'Profile',
    value: 'profile',
    widgets: profileWidgets,
  },
];

const widgetObj = {};
dashboards.forEach((ele) => {
  widgetObj[ele.value] = ele.widgets;
});
widgetObj.custom = { ...people, ...industryWidgets, ...brandWidgets };

export const widgetMapping = {
  ...widgetObj,
};

export const getDashboardWidgets = (dashboardKey) => {
  const dashBoardObj = dashboards.filter((ele) => ele.value === dashboardKey);
  const dashBoardWidgets = dashBoardObj.length
    ? Object.values(dashBoardObj[0].widgets)
    : [];
  return dashBoardWidgets;
};

export const workspaceConfig = {
  recent: {
    component: RecentSearches,
  },
  top_articles: {
    component: TopFiveSearches,
  },
  single_article: {
    component: SingleArticle,
  },
};
