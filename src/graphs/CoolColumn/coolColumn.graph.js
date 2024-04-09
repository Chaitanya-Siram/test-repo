import * as d3 from 'd3';
import RootGraph from '../utils/rootGraph';
import graphBucket from '../utils/graphBucket';
import { initialValues, colorBox } from '../utils/graphConst';
import { getGraphUtils } from '../utils/graphUtils';
import { getAccArr } from './columnUtils';

class CoolColumnGraph extends RootGraph {
  setData(data) {
    const inData = JSON.parse(JSON.stringify(data));
    this.labels = inData?.labels
      ? inData?.labels
      : [{ label: 'label', value: 'value' }];

    // this.data = inData?.data;
    const mainData = JSON.parse(JSON.stringify(inData?.data));
    const dataLength = mainData.length || 15;
    this.data = mainData.filter(
      (ele, i) => i < (this.config.maxData || dataLength)
    );

    this.filteredData = this.data;
    const formattedData = [];
    // process data object with multiple values
    for (let k = 0; k < this.labels.length; k++) {
      const items = [];
      for (let i = 0; i < this.filteredData.length; i++) {
        const value = this.filteredData[i][this.labels[k].value];
        const currentItem = JSON.parse(JSON.stringify(this.filteredData[i]));
        this.labels.forEach((ele) => {
          delete currentItem[ele.value];
        });
        const item = {
          ...currentItem,
          label: this.filteredData[i].label,
          value: parseFloat(value),
          accValue:
            (formattedData[k - 1] && formattedData[k - 1][i]?.accValue
              ? formattedData[k - 1][i]?.accValue
              : 0) + parseFloat(value),
          labelText: this.labels[k].label,
          index: i,
          color: this.labels[k].color
            ? this.labels[k].color
            : this.data[i].color
            ? this.data[i].color
            : colorBox[(this.labels.length > 1 ? k : i) % colorBox.length],
          rawData: this.filteredData[i],
        };
        items.push(item);
      }
      formattedData.push(items);
    }
    this.graphData = formattedData;

    // console.log("this.graphData", this.graphData);
  }

  setConfig(configObj = {}) {
    this.config = configObj;
  }

  drawGraph() {
    super.drawGraph();
    const data = this.graphData[0];
    let config = {
      ...this,
      ...initialValues,
      width: this.width,
      height: this.height,
      xAxisType: 'text',
      graphType: 'group',
      enableFullColumn: false,
      gridXTicks: 8,
      ...this.config,
    };

    let { minX, maxX, minY, maxY, graphAreaH, graphAreaW, graphAreaL } =
      getGraphUtils(
        config,
        config.graphType === 'group'
          ? this.graphData.flat(Infinity)
          : getAccArr(this.graphData)
      );

    if (
      config.graphType === 'timeline' ||
      (config.graphType !== 'stack' && config.enableFullColumn)
    ) {
      maxY = 100;
    }

    const xScale = d3
      .scaleBand()
      .range([0, graphAreaW])
      .domain(
        data.map(function (d, i) {
          return d.label;
        })
      );

    const xScaleN = d3
      .scaleLinear()
      .range([0, graphAreaW])
      .domain([minX < 0 ? minX : 0, maxX + (maxX / 100) * 10]);

    const yScale = d3
      .scaleLinear()
      .range([
        graphAreaH,
        config.graphTopPadding +
          (config.enableFullColumn && config.enableTopLabels
            ? config.fontSize * 3
            : 0),
      ])
      .domain([
        minY < 0 ? minY : 0,
        maxY +
          (maxY / 100) *
            (config.graphType === 'timeline' || config.enableFullColumn
              ? 1
              : 25),
      ]);

    config = {
      ...config,
      xScaleN,
      xScale,
      yScale,
      graphAreaH,
      graphAreaW,
      minY,
      maxY,
      showAllLabels: true,
    };

    // y-axis
    const yAxis = graphBucket.yAxis().config(config);
    this.$graphGrp.datum([data]).call(yAxis);

    //  rect
    const rects = graphBucket.columnRect().config(config);

    const rectGrps = this.$graphGrp.selectAll('.columnRectGroup').node()
      ? this.$graphGrp.selectAll('.columnRectGroup')
      : this.$graphGrp.append('g');

    rectGrps
      .attr('class', 'columnRectGroup')
      .attr('transform', 'translate(' + graphAreaL + ',0)')
      .datum(this.graphData)
      .call(rects);

    // x-axis
    const xAxis = graphBucket.xAxis().config(config);
    this.$graphGrp.datum([data]).call(xAxis);
  }

  onResetFunc() {
    const classSelected = this.$graphGrp.selectAll('.column-rect');
    classSelected.classed('selected', false);
    classSelected.classed('unselected', false);
  }
}

export default CoolColumnGraph;
