import * as d3 from 'd3';
import { initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';
import { bubbleLabelValue } from './bubbleLabels';

export const bubbleCircleForceV2 = function bubbleCircleForceV2() {
  let config = {
    ...initialValues,
    spaceBetweenCircle: 3,
  };

  // const t = d3
  //   .transition()
  //   .delay(function (d, i) {
  //     return i * 3;
  //   })
  //   .duration(config.duration);

  // draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      const bubbleData = data[0];
      const numNodes = data[0].length;
      const randomPointsArr = Array.from(
        { length: numNodes },
        d3.randomUniform(0, 1)
      );
      const nodes = d3.range(numNodes).map(function (d, i) {
        return {
          ...bubbleData[i],
          data: bubbleData[i],
          radius: config.scaleRadius(bubbleData[i].value),
          value1: randomPointsArr[i],
        };
      });
      // console.log('bubbleData', bubbleData, nodes);
      d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(5))
        .force(
          'x',
          d3.forceX().x(function (d) {
            return config.xScale(d.value1);
          })
        )
        .force(
          'y',
          d3.forceY().y(function (d) {
            return config.graphAreaH / 2;
          })
        )
        .force(
          'collision',
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on('tick', ticked);

      const minR = d3.min(nodes.map((ele) => ele.radius));
      const maxR = d3.max(nodes.map((ele) => ele.radius));

      config = {
        ...config,
        minR,
        maxR,
      };

      function ticked() {
        nodes.forEach((node) => {
          node.x = Math.max(
            node.radius,
            Math.min(
              config.graphAreaW - (node.radius + (config.bubblePadding || 5)),
              node.x
            )
          );
          node.y = Math.max(
            node.radius,
            Math.min(
              config.graphAreaH - (node.radius + (config.bubblePadding || 5)),
              node.y
            )
          );
        });
        const bubbleGrp = selected
          .selectAll('.bubble-grp')
          .data(nodes)
          .join(
            (enter) => {
              enter
                .append('g')
                .attr('class', 'bubble-grp')
                .style('transform', (d) => {
                  return `translate(${d.x}px,${d.y}px)`;
                });
            },
            (update) =>
              update.style('transform', (d) => {
                return `translate(${d.x}px,${d.y}px)`;
              }),
            (exit) => exit.remove()
          );

        bubbleGrp
          .selectAll('.bubble-circle')
          .data((d) => [d])
          .join(
            (enter) => {
              enter
                .append('circle')
                .attr('class', 'bubble-circle')
                .attr('r', function (d) {
                  return d.radius - (config.bubblePadding || 5);
                })
                .style('fill', function (d) {
                  return d.color;
                });
            },
            (update) =>
              update
                .attr('r', function (d) {
                  return d.radius - (config.bubblePadding || 5);
                })
                .style('fill', function (d) {
                  return d.color;
                }),
            (exit) => exit.remove()
          );

        bubbleGrp.call(bubbleLabelValue, config);
        setUpEvents(config, selected, 'bubble-grp');
      }
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
