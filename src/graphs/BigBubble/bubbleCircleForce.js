import * as d3 from 'd3';
import { colorBox, initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';

export const bubbleCircleForce = function bubbleCircleForce() {
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
      const dataSet = { children: [] };
      data.forEach((element, i) => {
        dataSet.children.push({ children: element });
      });

      // location to centre the bubbles
      const centre = { x: config.graphAreaW / 2, y: config.graphAreaH / 2 };

      // strength to apply to the position forces
      const forceStrength = 0.03;

      // charge is dependent on size of the bubble, so bigger towards the middle
      function charge(d) {
        return Math.pow(d.radius, 2.0) * 0.01;
      }

      // create a force simulation and add forces to it
      const simulation = d3
        .forceSimulation()
        .force('charge', d3.forceManyBody().strength(charge))
        .force('center', d3.forceCenter(centre.x, centre.y))
        .force('x', d3.forceX().strength(forceStrength).x(centre.x))
        .force('y', d3.forceY().strength(forceStrength).y(centre.y))
        .force(
          'collision',
          d3.forceCollide().radius((d) => d.radius + config.spaceBetweenCircle)
        );

      // force simulation starts up automatically, which we don't want as there aren't any nodes yet
      simulation.stop();
      const packLayout = d3
        .pack()
        .size([config.graphAreaW, config.graphAreaH])
        .padding(10);

      const rootNode = d3.hierarchy(dataSet).sum(function (d) {
        return d.value;
      });

      packLayout(rootNode);
      const nodes = rootNode
        .descendants()
        .filter((obj) => !obj.children)
        .map((d) => ({
          ...d,
          radius: d.r,
          x: d3.randomInt(0, config.graphAreaW),
          y: d3.randomInt(0, config.graphAreaH),
        }));

      selected
        .selectAll('.bubble-group')
        .data(nodes, (d) => d.id)
        .join(
          (enter) => {
            const bubble = enter.append('g').attr('class', 'bubble-group');
            const bubbles = bubble
              .append('circle')
              .attr('class', 'bubble-group-circle')
              .classed('bubble', true)
              .attr('r', (d) => {
                return d.radius;
              })
              .style(
                'fill',
                (d, i) => d.color || colorBox[i % colorBox.length]
              );

            simulation.nodes(nodes).on('tick', ticked).restart();

            function ticked() {
              bubbles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
            }
          },
          (update) => update,
          (exit) => {
            exit.remove();
          }
        );

      setUpEvents(config, selected, 'bubble-group');
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
