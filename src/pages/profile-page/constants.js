import { events, gridLine } from '../../constants/widgets';

export const areaConfig = {
  graphType: 'area',
  gridXYLabelFontSize: 12,
  enableCurve: true,
  enableGradient: true,
  enableAreaLine: true,
  areaLineStroke: '#E20074',
  enableTooltip: true,
  ...events,
  yAxisType: 'number',
  yLabelAlignment: 50,
  yAxisTicksFormat: true,
  enableNeedle: false,
  gridXTicks: 6,
  gridYTicks: 6,
  ...gridLine,
};

export const radarConfig = {
  backgroundType: 'circle1',
  startAngle: -1 * Math.PI,
  endAngle: Math.PI,
  enableArcBG: '#F0F2F5',
  arcDividerStrokeColor: 'none',
  innerRadius: 0.2, // 0.01 - 0.5
  enablePolyline: true,
  arcLabel: true,
  radarBGStroke: '#969DA5',
};
