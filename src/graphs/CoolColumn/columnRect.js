import * as d3 from 'd3';
import { initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';
import { rectLabels, topLabels } from './labelUtils';

export const columnRect = function columnRect() {
  let config = {
    ...initialValues,
    enableTopLabels: false,
    enableRectLabels: false,
    columnWidth: 16,
    columnPadding: 2,
    columnGroupPadding: 2,
  };

  const t = d3
    .transition()
    .delay(function (d, i) {
      return i * 3;
    })
    .duration(config.duration);
  // draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      const xWidth = config.xScale.bandwidth() - config.columnPadding;

      config.columnWidth =
        config.columnWidth < xWidth ? config.columnWidth : xWidth;

      selected
        .selectAll('.bar-group')
        .data(data)
        .join(
          (enter) => {
            enter.append('g').attr('class', 'bar-group');
          },
          (update) => update,
          (exit) => {
            exit.remove();
          }
        );

      if (config.enableTopLabels) {
        selected
          .selectAll('.bar-label-group')
          .data(data[data.length - 1])
          .join(
            (enter) => {
              const labelGrp = enter
                .append('g')
                .attr('class', 'bar-label-group')
                .attr('transform', (d, i) => {
                  return `translate(${
                    config.xScale(d.label) + config.xScale.bandwidth() / 2
                  }, ${config.yScale(config.maxY * 1.15)})`;
                });

              labelGrp.call(topLabels, config, t);
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          )
          .call(topLabels, config, t);
      }

      const columnRectFunc = function (eleRef) {
        eleRef
          .attr('data-gi', (d) => d.labelIndex)
          .style('fill', (d, i) => {
            return config.barLevelColor ? d[`${d.labelText}BarColor`] : d.color;
          })
          .attr('width', (d) =>
            d.accValue === 0
              ? 0
              : config.graphType === 'group'
              ? config.columnWidth / data.length - config.columnGroupPadding
              : config.columnWidth
          )

          .attr('x', (d, i) =>
            config.graphType === 'group'
              ? config.xScale(d.label) +
                (xWidth - config.columnWidth) / 2 +
                d.labelIndex * (config.columnWidth / data.length)
              : config.xScale(d.label) + (xWidth - config.columnWidth) / 2
          );
      };

      const columnRectHeightFunc = function (eleRef) {
        eleRef
          .attr('y', (d, i) =>
            config.graphType === 'group'
              ? d.value < 0
                ? config.yScale(0)
                : config.yScale(d.value)
              : config.yScale(d.accValue)
          )
          .attr('height', (d, i) => {
            const barHeight =
              config.yScale(0) - config.yScale(parseFloat(d.value));
            return barHeight < 0 ? -1 * barHeight : barHeight;
          });
      };

      selected
        .selectAll('.bar-group')
        .selectAll('.column-rect')
        .data((d, i) =>
          d.map((entry) => {
            const temp = entry;
            temp.labelIndex = i;
            return temp;
          })
        )
        .join(
          (enter) => {
            enter
              .append('rect')
              .attr('class', 'column-rect')
              .call(columnRectFunc)
              .attr('y', config.height - (config.height - config.graphAreaH))
              .transition(t)
              .call(columnRectHeightFunc);
          },
          (update) =>
            update
              .transition(t)
              .call(columnRectHeightFunc)
              .call(columnRectFunc),
          (exit) => {
            exit.transition(t).attr('height', 0).attr('width', 0).remove();
          }
        );

      if (config.enableRectLabels) {
        selected.selectAll('.bar-group').call(rectLabels, config, t, xWidth);
      }

      setUpEvents(config, selected, 'column-rect');
    });

    return selected;
  }

  graph.config = function graphConfig(val) {
    if (!arguments.length) {
      return config;
    }
    config = Object.assign(config, val);
    return graph;
  };

  return graph;
};
