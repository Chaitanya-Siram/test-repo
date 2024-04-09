import * as d3 from 'd3';
import { initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';

export const bubbleCircle = function bubbleCircle() {
  let config = {
    ...initialValues,
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
      const dataSet = { children: [] };
      data.forEach((element, i) => {
        dataSet.children.push({ children: element });
      });

      const packLayout = d3
        .pack()
        .size([config.graphAreaW, config.graphAreaH])
        .padding(d3.randomInt(5, 20));

      const rootNode = d3.hierarchy(dataSet).sum(function (d) {
        return d.value;
      });

      packLayout(rootNode);
      // console.log("rootNode.descendants()", rootNode.descendants());
      selected
        .selectAll('circle')
        .data(rootNode.descendants().filter((obj) => !obj.children))
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('class', (d) =>
                d.children ? 'bubble-circle-parent' : 'bubble-circle'
              )
              .style('fill', (d, i) => d.data.color)
              .style('opacity', config.opacity || '0.8')
              .style('stroke', 'white')
              .attr('data-depth', (d) => d.depth)
              .attr('cx', function (d) {
                return d.x;
              })
              .attr('cy', function (d) {
                return d.y;
              })
              .attr('r', 0)
              .transition(t)
              .attr('r', function (d) {
                return d.r;
              }),
          (update) => update,
          (exit) => {
            exit.transition(t).attr('r', 0).remove();
          }
        )
        .transition(t)
        .style('fill', (d, i) => d.data.color)
        .style('opacity', config.opacity || '0.8')
        .style('stroke', 'white')
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        })
        .attr('r', function (d) {
          return d.r;
        });

      setUpEvents(config, selected, 'bubble-circle');
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
