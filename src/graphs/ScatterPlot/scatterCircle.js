import * as d3 from 'd3';
import ColorParser from '../utils/colorParser';
import { initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';

export const scatterCircle = function scatterCircle() {
  let config = {
    ...initialValues,
  };

  // draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      // const circleGrps = selected.selectAll("circle").data(data);
      // circleGrps.exit().remove();

      // circleGrps
      //   .enter()
      //   .append("circle")
      //   .merge(circleGrps)
      //   .attr("cx", config.x)
      //   .attr("cy", config.graphAreaH)
      //   .attr("r", config.r)
      //   .style("fill", function (d) {
      //     return d.color ? ColorParser(d.color) : "#000";
      //   })
      //   .transition()
      //   .delay(function (d, i) {
      //     return i * 3;
      //   })
      //   .duration(config.duration)
      //   .attr("cy", config.y);

      const t = d3
        .transition()
        .delay(function (d, i) {
          return i * 3;
        })
        .duration(config.duration);

      selected
        .selectAll('circle')
        .data(data)
        .join(
          (enter) => {
            enter
              .append('circle')
              .attr('class', 'scatter-circle')
              .attr('cx', config.x)
              .attr('cy', config.graphAreaH)
              .attr('r', config.r)
              .style('fill', function (d) {
                return d.color ? ColorParser(d.color) : '#000';
              })
              .transition(t)
              .attr('cy', config.y);
          },
          (update) => update,
          (exit) => {
            exit.transition(t).attr('r', 0);
          }
        ) // combine the enter and exit method .join(enter=>enter.append('circle',update=>update,exit=>{}))
        .transition(t)
        .attr('cx', config.x)
        .attr('r', config.r)
        .style('fill', function (d) {
          return d.color ? ColorParser(d.color) : '#000';
        })
        .attr('cy', config.y);

      setUpEvents(config, selected, 'scatter-circle');
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
