import * as d3 from 'd3';
import { colorBox, initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';
import geoJSONData from './geoJson.json';
// import { countryCoordinates } from './countries';

export const worldMap = function worldMap() {
  let config = {
    ...initialValues,
    interpolateColors: [colorBox[0], colorBox[1]],
    strokeWidth: 1,
    strokeColor: '#fff',
  };

  // Draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      // find the country
      geoJSONData.features.forEach((feature) => {
        const country = data.find(
          (item) => item.label === feature.properties.iso_a2
        );

        feature.properties.value = country?.value;
      });

      const projection = d3
        .geoEquirectangular()
        .fitSize([config.width, config.height], geoJSONData);

      const pathGenerator = d3.geoPath().projection(projection);

      const sampleMap = geoJSONData.features.map((item) => {
        return Number(item.properties.value);
      });

      // Get min and max values
      const minValue = d3.min(sampleMap);
      const maxValue = d3.max(sampleMap);

      const colorScale = d3
        .scaleLinear()
        .domain([minValue, maxValue]) // pass the whole dataset to a scaleQuantile’s domain
        .range(config.interpolateColors);

      selected
        .selectAll('.worldmap-path')
        .data(geoJSONData.features)
        .join(
          (enter) => {
            enter
              .append('path')
              .attr('class', 'worldmap-path')
              .attr('d', (d) => pathGenerator(d))
              .attr('stroke-width', config.strokeWidth)
              .attr('stroke', config.strokeColor)
              .style('fill', function (d, i) {
                const uRate = d.properties.value;
                return uRate ? colorScale(uRate) : config.defaultColor;
              });
          },
          (update) =>
            update
              .attr('d', (d) => pathGenerator(d))
              .attr('stroke-width', config.strokeWidth)
              .attr('stroke', config.strokeColor)
              .style('fill', function (d, i) {
                const uRate = d.properties.value;
                return uRate ? colorScale(uRate) : config.defaultColor;
              }),
          (exit) => {
            exit.remove();
          }
        );
      setUpEvents(config, selected, 'worldmap-path');
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
