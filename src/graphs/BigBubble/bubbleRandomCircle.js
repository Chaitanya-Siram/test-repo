import * as d3 from 'd3';
import { initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';
import { formatNumber } from '../utils/graphGrid';

function generateRandomBubble(
  radius,
  width,
  height,
  existingBubbles,
  maxAttempts = 100
) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate random coordinates for the bubble's center
    const bubbleX = Math.random() * (width - 2 * radius) + radius * 2;
    const bubbleY = Math.random() * (height - 2 * radius) + radius * 2;

    // Check if the bubble is within the width and height bounds
    if (
      bubbleX - radius < 0 ||
      bubbleX + radius > width ||
      bubbleY - radius < 0 ||
      bubbleY + radius > height
    ) {
      continue; // Skip this attempt and try again
    }

    // Check for collisions with existing bubbles
    let collision = false;
    for (let i = 0; i < existingBubbles.length; i++) {
      const bubble = existingBubbles[i];
      const bubbleXExisting = bubble[0];
      const bubbleYExisting = bubble[1];
      const bubbleRadiusExisting = bubble[2];

      const distance = Math.sqrt(
        Math.pow(bubbleX - bubbleXExisting, 2) +
          Math.pow(bubbleY - bubbleYExisting, 2)
      );
      if (distance <= radius + bubbleRadiusExisting) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      // No collision, create a new bubble array
      const newBubble = [bubbleX, bubbleY, radius];
      return newBubble;
    }
  }

  // Max attempts reached, return null
  return null;
}

const randomBubble = (data, config) => {
  const { graphAreaW, graphAreaH } = config;
  const existingBubbles = [];
  // Generate 10 random bubbles with a radius of 5, inside a 100x100 area
  for (let i = 0; i < data.length; i++) {
    const newBubble = generateRandomBubble(
      data[i].r,
      graphAreaW,
      graphAreaH,
      existingBubbles
    );

    if (newBubble) {
      data[i].x =
        newBubble[0] > config.graphAreaL
          ? newBubble[0] - config.graphAreaL
          : newBubble[0];
      data[i].y = newBubble[1];
      data[i].r = newBubble[2];
      existingBubbles.push(newBubble);
    } else {
      data[i] = null;
    }
  }

  const finalData = data.filter((item) => item !== null);

  return finalData;
};

export const bubbleRandomCircle = function bubbleRandomCircle() {
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

      const diff = (config.graphAreaW - config.graphAreaH) / 2;

      const packLayout = d3
        .pack()
        .size([config.graphAreaW - diff / 2, config.graphAreaH + diff / 2])
        .padding(d3.randomInt(1, 3));

      const rootNode = d3.hierarchy(dataSet).sum(function (d) {
        return d.value;
      });

      packLayout(rootNode);
      const nodes = rootNode.descendants().filter((obj) => !obj.children);

      const bubblesData = randomBubble(nodes, config);

      const bubbleGrp = selected
        .selectAll('.bubble-grp')
        .data(bubblesData)
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

      function bubbleCircle(elementRef) {
        elementRef
          .style('fill', (d, i) => d.data.color)
          .style('opacity', config.opacity || '0.8')
          .style('stroke', 'white')
          .attr('data-depth', (d) => d.depth);
      }

      bubbleGrp
        .selectAll('circle')
        .data((d) => [d])
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('class', (d) =>
                d.children ? 'bubble-circle-parent' : 'bubble-circle'
              )
              .call(bubbleCircle)
              .attr('r', 0)
              .transition(t)
              .attr('r', function (d) {
                return d.r;
              }),
          (update) =>
            update
              .transition(t)
              .call(bubbleCircle)
              .attr('r', function (d) {
                return d.r;
              }),
          (exit) => {
            exit.transition(t).attr('r', 0).remove();
          }
        );

      // Calculate the maximum number of characters that fit inside the bubble
      function calculateMaxCharacters(radius, fontSize) {
        const availableWidth = 2 * radius - radius * 0.55; // Adjust padding as needed
        const avgCharacterWidth = fontSize * 0.6; // Adjust factor as needed
        return Math.floor(availableWidth / avgCharacterWidth);
      }

      function bubbleLabel(elementRef) {
        elementRef
          .style('text-anchor', 'middle')
          .attr('dy', '12px')
          .style('font-size', config.bubbleLabelFontSize || 12)
          .text((d) => {
            const maxCharacters = calculateMaxCharacters(
              d.r,
              config.bubbleLabelFontSize || 12
            ); // 12 is the font size

            if (maxCharacters < 5) {
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
      bubbleGrp
        .selectAll('.bubble-label')
        .data((d) => [d])
        .join(
          (enter) => {
            enter
              .append('text')
              .attr('class', 'bubble-label')
              .style('transform', 'scale(.1)')
              .call(bubbleLabel)
              .transition(t)
              .style('transform', 'scale(1)');
          },
          (update) =>
            update
              .call(bubbleLabel)
              .transition(t)
              .style('transform', 'scale(1)'),
          (exit) => exit.remove()
        );

      function bubbleValue(elementRef) {
        elementRef
          .style('text-anchor', 'middle')
          .attr('dy', (d) => {
            const maxCharacters = calculateMaxCharacters(
              d.r,
              config.bubbleLabelFontSize || 12
            ); // 12 is the font size

            return maxCharacters < 5 ? '6px' : '-4px';
          })
          .style('font-size', config.bubbleValueFontSize || 16)
          .text((d) => {
            const maxCharacters = calculateMaxCharacters(
              d.r,
              config.bubbleValueFontSize || 16
            ); // 12 is the font size
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
      bubbleGrp
        .selectAll('.bubble-value')
        .data((d) => [d])
        .join(
          (enter) => {
            enter
              .append('text')
              .attr('class', 'bubble-value')
              .style('transform', 'scale(.1)')
              .call(bubbleValue)
              .transition(t)
              .style('transform', 'scale(1)');
          },
          (update) =>
            update
              .call(bubbleValue)
              .transition(t)
              .style('transform', 'scale(1)'),
          (exit) => exit.remove()
        );

      setUpEvents(config, selected, 'bubble-grp');
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
