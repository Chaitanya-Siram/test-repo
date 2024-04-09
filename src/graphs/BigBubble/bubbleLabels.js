import * as d3 from 'd3';
import { formatNumber } from '../utils/graphGrid';

// Calculate the maximum number of characters that fit inside the bubble
function calculateMaxCharacters(radius, fontSize) {
  const availableWidth = 2 * radius - radius * 0.55; // Adjust padding as needed
  const avgCharacterWidth = fontSize * 0.6; // Adjust factor as needed
  return Math.floor(availableWidth / avgCharacterWidth);
}

export function bubbleLabelValue(eleRef, config) {
  const scaleLabel = d3
    .scaleLinear()
    .range([8, config.bubbleLabelFontSize || 14])
    .domain([config.minR, config.maxR]);

  const scaleValue = d3
    .scaleLinear()
    .range([9, config.bubbleValueFontSize || 16])
    .domain([config.minR, config.maxR]);

  const scaleDyValue = d3
    .scaleLinear()
    .range([0, -6])
    .domain([config.minR, config.maxR]);

  function bubbleLabel(elementRef) {
    elementRef
      .style('text-anchor', 'middle')
      .attr('dy', (d) => scaleLabel(d.radius))
      .style('font-size', (d) => scaleLabel(d.radius))
      .text((d) => {
        const maxCharacters = calculateMaxCharacters(
          d.radius,
          scaleLabel(d.radius)
        );

        if (d.radius - (config.bubblePadding || 5) < 20) {
          return '';
        }
        if (d.data.label.length > maxCharacters) {
          return (
            d.data.label.substr(0, maxCharacters - 3) +
            (maxCharacters - 3 < 1 ? '' : '..')
          );
        }
        return d.data.label;
      })
      .append('title')
      .text((d) => d.data.label);
  }
  eleRef
    .selectAll('.bubble-label')
    .data((d) => [d])
    .join(
      (enter) => {
        enter.append('text').attr('class', 'bubble-label').call(bubbleLabel);
      },
      (update) => update.call(bubbleLabel),
      (exit) => exit.remove()
    );

  function bubbleValue(elementRef) {
    elementRef
      .style('text-anchor', 'middle')
      .attr('dy', (d) => {
        return d.radius - (config.bubblePadding || 5) < 20
          ? Math.floor(scaleLabel(d.radius) / 2)
          : scaleDyValue(d.radius);
      })
      .style('font-size', (d) => scaleValue(d.radius))
      .text((d) => {
        const maxCharacters = calculateMaxCharacters(
          d.radius,
          scaleValue(d.radius)
        );

        if (d.radius - (config.bubblePadding || 5) < 15) {
          return '';
        }
        const formattedValue = formatNumber(d.data.value);
        if (formattedValue.length > maxCharacters) {
          return (
            formattedValue.substr(0, maxCharacters - 3) +
            (maxCharacters - 3 < 1 ? '' : '..')
          );
        }
        return formattedValue;
      })
      .append('title')
      .text((d) => d.data.value);
  }
  eleRef
    .selectAll('.bubble-value')
    .data((d) => [d])
    .join(
      (enter) => {
        enter.append('text').attr('class', 'bubble-value').call(bubbleValue);
      },
      (update) => update.call(bubbleValue),
      (exit) => exit.remove()
    );
}
