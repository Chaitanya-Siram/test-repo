/* eslint-disable indent */
import * as d3 from 'd3';
import { initialValues } from './graphConst';

const ranges = [
  { divider: 1e18, suffix: 'E' },
  { divider: 1e15, suffix: 'P' },
  { divider: 1e12, suffix: 'T' },
  { divider: 1e9, suffix: 'G' },
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'k' },
];

export const formatNumber = (n) => {
  if (n === 0 || n < 1000 || Number.isNaN(n)) {
    return n;
  }
  for (let i = 0; i < ranges.length; i++) {
    if (n < 0) {
      return '-' + formatNumber(-n);
    }
    if (n >= ranges[i].divider) {
      const formattedValue = (n / ranges[i].divider).toFixed(1);
      if (formattedValue.endsWith('.0')) {
        return parseInt(formattedValue) + ranges[i].suffix;
      } else {
        return formattedValue + ranges[i].suffix;
      }
    }
  }
  return n.toString();
};

export const getFormatDate = (dateString) => {
  const containsAmPm = dateString.includes('AM') || dateString.includes('PM');
  const isTwelveAm = dateString.includes('12:00 AM');
  const isDateLong = dateString.length > 10;
  if (containsAmPm) {
    if (isTwelveAm) {
      return dateString.slice(0, 10) + '..';
    } else {
      return dateString.slice(10);
    }
  }
  if (isDateLong) {
    return dateString.slice(0, 10) + '..';
  }
  return dateString;
};

export const xAxis = function xAxis() {
  let config = {
    ...initialValues,
    fontFamily: 'inherit',
    xAxisType: 'text',
    enableGridXLine: false,
    gridLineXStroke: '#D0D3E5',
  };

  const t = d3
    .transition()
    .delay(function (d, i) {
      return i * 3;
    })
    .duration(config.duration);

  function graph(selected) {
    selected.each((data) => {
      if (!config.hideXAxis) {
        const numOfTicks = data[0].length;
        const xAxis = selected.selectAll('.x').data([data]);

        const BrowserText = (function () {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          /**
           * Measures the rendered width of arbitrary text given the font size and font face
           * @param {string} text The text to measure
           * @param {number} fontSize The font size in pixels
           * @param {string} fontFace The font face ("Arial", "Helvetica", etc.)
           * @returns {number} The width of the text
           **/
          function getWidth(text, fontSize, fontFace) {
            context.font = fontSize + 'px ' + fontFace;
            return context.measureText(text).width;
          }

          return {
            getWidth,
          };
        })();

        const xAxist = d3.axisBottom(config.xScale);
        if (config.gridXTicks) {
          xAxist.ticks(config.gridXTicks);
        }
        if (config.xAxisType === 'text') {
          xAxist.tickFormat((d, i) => {
            if (config.singleLineWrp) {
              const xWidth =
                config.xScale.bandwidth() -
                config.gutterSpace / data.length -
                (config.groupgutterSpace || 0);
              let maxWidth =
                config.gutterSpace +
                (xWidth / data.length - (config.groupgutterSpace || 0)) * 2;
              maxWidth = maxWidth * (config.singleLineWrpWidth || 0.5);
              if (config.statusCircleRadius) {
                maxWidth = maxWidth - config.statusCircleRadius * 2;
              }
              // if showAllLabels is true we are displaying all the labels
              if (config?.showAllLabels) {
                // if we labels more than 50 dividing into every 15days
                if (numOfTicks <= 50) {
                  return getFormatDate(d);
                } else {
                  return i % Math.ceil(numOfTicks / 15) === 0
                    ? getFormatDate(d)
                    : '';
                }
              } else if (
                BrowserText.getWidth(d, config.fontSize || 16) > xWidth
              ) {
                const charLen =
                  BrowserText.getWidth(d, config.fontSize || 16) / d.length;

                const maxChar = Math.floor(maxWidth / charLen);

                if (d.length < maxChar) {
                  return d;
                }

                const skipper = Math.ceil(numOfTicks / config.gridXTicks);

                const bandWidth =
                  config.xScale.bandwidth() || config.xScale.step();
                const skippedMaxChar = Math.floor(
                  (bandWidth * (skipper > 0 ? skipper - 0.25 : 0)) / charLen
                );

                return config.gridXTicks
                  ? i % skipper === 0
                    ? d.length < skippedMaxChar
                      ? d
                      : `${d.slice(0, skippedMaxChar)}..`
                    : ''
                  : `${d.slice(0, maxChar)}..`;
              }
              return d;
            }

            // if (typeof d === 'string' && d.length - 1 > 10) {
            //   return i % Math.ceil(numOfTicks / 6) === 0
            //     ? `${d.slice(0, 7)}..`
            //     : '';
            // }
            // if showAllLabels is true we are displaying all the labels
            if (config?.showAllLabels) {
              return i % Math.ceil(numOfTicks / 15) === 0
                ? getFormatDate(d)
                : '';
            } else if (config.gridXTicks) {
              return i % Math.ceil(numOfTicks / config.gridXTicks) === 0
                ? d.length > 10
                  ? `${d.slice(0, 10)}..`
                  : d
                : '';
            }
            return d;
          });
        }
        // else {
        //   xAxist.tickFormat((d, i) => {
        //     return config.xAxisTicksFormat ? formatNumber(d) : d;
        //   });
        // }

        const xAxisn = d3.axisBottom(config.xScaleN);

        if (config.gridXTicks) {
          xAxisn.ticks(config.gridXTicks).tickSizeInner(0);
        }

        if (config.xAxisType === 'number') {
          xAxisn.tickFormat((d, i) => {
            return config.valueInPercent
              ? `${config.xAxisTicksFormat ? formatNumber(d) : d}%`
              : config.xAxisTicksFormat
              ? formatNumber(d)
              : d;
          });
        }

        const clearArea =
          config.width < config.height ? config.width : config.height;
        xAxis
          .enter()
          .append('g')
          .attr('class', 'x axis')
          .merge(xAxis)
          .attr(
            'transform',
            `translate(${config.yLabelAlignment + config.padding.left},${
              config.yScale(0) || config.graphAreaH
            })`
          )
          .transition()
          .duration(config.duration)
          .call(config.xAxisType === 'text' ? xAxist : xAxisn)
          .selectAll('text')
          .style('text-anchor', config.xAxisType === 'text' ? 'end' : 'start')
          .attr('dx', config.xAxisType === 'text' ? '-1em' : '-10')
          .attr('dy', config.xAxisType === 'text' ? '-.5em' : '0')
          .attr(
            'transform',
            config.xAxisType === 'text' ? 'rotate(-60)' : 'rotate(0)'
          )
          .attr('y', config.xAxisLabelBreatingSpace)
          .attr('font-size', config.gridXYLabelFontSize || clearArea * 0.05);

        selected
          .selectAll('.x')
          .selectAll('.tick')
          .selectAll('title')
          .data((d) => [d])
          .join((enter) => {
            enter.append('title').text((d) => d);
          })
          .text((d) => d);
        if (config.statusCircle) {
          selected
            .selectAll('.x')
            .selectAll('.tick')
            .selectAll('circle')
            .data((d) => {
              return [d];
            })
            .join(
              (enter) => {
                enter
                  .append('circle')
                  .attr('r', config.statusCircleRadius || 5)

                  .attr(
                    'cy',
                    config.xAxisLabelBreatingSpace +
                      (config.statusCircleRadius || 0)
                  )
                  .attr('fill', (d, i) => {
                    return data.length > 0
                      ? data[0].filter((ele) => ele.label === d)[0]
                          ?.statusCircleColor || 'red'
                      : 'red';
                  })
                  .attr('cx', 0)
                  .transition(t)
                  .attr('cx', (d) => {
                    const xWidth =
                      config.xScale.bandwidth() -
                      config.gutterSpace / data.length -
                      (config.groupgutterSpace || 0);
                    let maxWidth =
                      config.gutterSpace +
                      (xWidth / data.length - (config.groupgutterSpace || 0)) *
                        2;
                    maxWidth = maxWidth * (config.singleLineWrpWidth || 0.5);
                    if (config.statusCircleRadius) {
                      maxWidth = maxWidth - config.statusCircleRadius * 2;
                    }
                    let finalText = d;
                    if (
                      BrowserText.getWidth(d, config.fontSize || 16) > xWidth
                    ) {
                      const charLen =
                        BrowserText.getWidth(d, config.fontSize || 16) /
                        d.length;

                      const maxChar = Math.floor(maxWidth / charLen);

                      if (d.length < maxChar) {
                        finalText = d;
                      }
                      finalText = `${d.slice(0, maxChar)}..`;
                    }
                    // finalText = d;

                    const wordLength = BrowserText.getWidth(
                      finalText,
                      config.fontSize || 16
                    );
                    return (
                      -1 *
                      (wordLength / (config.statusCircleXSpacing || 1.8) +
                        config.statusCircleRadius * 2)
                    );
                  });
              },
              (update) => update,
              (exit) => {
                exit.remove();
              }
            )
            .transition(t)
            .attr('fill', (d, i) => {
              return data.length > 0
                ? data[0].filter((ele) => ele.label === d)[0]
                    ?.statusCircleColor || 'red'
                : 'red';
            })
            .attr('cx', (d) => {
              const xWidth =
                config.xScale.bandwidth() -
                config.gutterSpace / data.length -
                (config.groupgutterSpace || 0);
              let maxWidth =
                config.gutterSpace +
                (xWidth / data.length - (config.groupgutterSpace || 0)) * 2;
              maxWidth = maxWidth * (config.singleLineWrpWidth || 0.5);
              if (config.statusCircleRadius) {
                maxWidth = maxWidth - config.statusCircleRadius * 2;
              }
              let finalText = d;
              if (BrowserText.getWidth(d, config.fontSize || 16) > xWidth) {
                const charLen =
                  BrowserText.getWidth(d, config.fontSize || 16) / d.length;

                const maxChar = Math.floor(maxWidth / charLen);

                if (d.length < maxChar) {
                  finalText = d;
                }
                finalText = `${d.slice(0, maxChar)}..`;
              }
              // finalText = d;

              const wordLength = BrowserText.getWidth(
                finalText,
                config.fontSize || 16
              );
              return (
                -1 *
                (wordLength / (config.statusCircleXSpacing || 1.8) +
                  config.statusCircleRadius * 2)
              );
            });
        }
      }

      if (config.enableGridXLine) {
        selected
          .selectAll('.x')
          .selectAll('.tick')
          .selectAll('.x-axis-line')
          .data((d) => [d])
          .join(
            (enter) => {
              enter
                .append('line')
                .attr('class', 'x-axis-line')
                .attr('stroke', config.gridLineXStroke)
                // .attr('stroke-width', config.gridLineStrokeWidth)
                .attr('stroke-width', 0)
                .attr('y2', 0)
                .attr(
                  'y1',
                  -1 * (config.graphAreaW - config.xAxisLabelBreatingSpace)
                )
                .attr('stroke-dasharray', config.dasharray);
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          );
      }
      if (config.xLabelPos) {
        selected
          .selectAll('.x')
          .selectAll('.tick')
          .selectAll('text')
          .each(function (data) {
            const tick = d3.select(this);
            tick.attr('x', config.xScale.step() * config.xLabelPos);
            tick.attr('x', `${config.xScale.step() * config.xLabelPos}px`);
            // tick.attr("transform", (d) => {
            //   return `translate(${
            //     config.yLabelAlignment +
            //     config.padding.left +
            //     config.xScale.step() * config.xLabelPos
            //   },${config.graphAreaH})px`;
            // });
          });
      }
      if (config.tickClick) {
        const tickSelect = selected.selectAll('.tick');
        tickSelect
          .selectAll('text')
          .style('cursor', 'pointer')
          .on('click', (event, d) => {
            const clickedData = getClickedData(d, data);
            config.tickClick(event, clickedData, undefined);
          });
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

const getClickedData = (d, inData) => {
  const data = inData.length > 0 ? inData[0] : inData;
  const filteredData = data.filter((ele) => ele.label === d);
  return filteredData.length > 0 ? filteredData[0] : { label: d };
};

export const yAxis = function yAxis() {
  let config = {
    ...initialValues,
    yAxisType: 'text',
    enableGridYLine: false,
    gridLineYStroke: '#D0D3E5',
    duration: 500,
  };

  function graph(selected) {
    selected.each((data) => {
      if (!config.hideYAxis) {
        // const yAxisGroup = selected.selectAll('.y').data([data])

        // const yAxisGroup = selected
        //   .selectAll('.y')
        //   .data([data])
        //   .join(
        //     (enter) => {
        //       enter.append('g').attr('class', 'y')
        //     },
        //     (update) => update,
        //     (exit) => {
        //       exit.remove()
        //     }
        //   )

        const yaxis = d3.axisLeft(config.yScale);
        if (config.gridYTicks) {
          yaxis.ticks(config.gridYTicks);
        }
        if (config.yAxisType === 'text') {
          yaxis.tickFormat((d, i) => {
            if (typeof d === 'string' && d.length > (config.wrapLength || 8)) {
              return `${d.slice(0, config.wrapLength || 8)}..`;
            }

            return d;
          });
        } else {
          yaxis.tickFormat((d, i) => {
            return config.yAxisTicksFormat
              ? formatNumber(d)?.length > 10
                ? `${formatNumber(d).slice(0, 10)}..`
                : formatNumber(d)
              : d;
          });
        }
        // show percentage in y axis for Message Congruence
        if (config.yAxisType === 'percentage') {
          yaxis.tickFormat((d, i) => {
            return config.valueInPercent
              ? `${config.yAxisTicksFormat ? `${d}%` : `${d}`}`
              : config.yAxisTicksFormat
              ? formatNumber(d)
              : d;
          });
        }
        const clearArea =
          config.width < config.height ? config.width : config.height;

        selected
          .selectAll('.y')
          .data([data])
          .join(
            (enter) => {
              enter
                .append('g')
                .attr('class', 'y axis')
                .attr(
                  'transform',
                  `translate(${config.yLabelAlignment + config.padding.left},0)`
                )
                .transition()
                .duration(config.duration)
                .attr(
                  'font-size',
                  config.gridXYLabelFontSize || clearArea * 0.05
                )
                .attr('font-family', config.fontFamily)
                .call(yaxis);
            },
            (update) =>
              update
                .attr(
                  'transform',
                  `translate(${config.yLabelAlignment + config.padding.left},0)`
                )
                .transition()
                .duration(config.duration)
                .attr(
                  'font-size',
                  config.gridXYLabelFontSize || clearArea * 0.05
                )
                .attr('font-family', config.fontFamily)
                .call(yaxis),
            (exit) => {
              exit.remove();
            }
          );

        selected
          .selectAll('.y')
          .selectAll('.tick')
          .selectAll('title')
          .data((d) => [d])
          .join(
            (enter) => {
              enter.append('title').text((d) => d);
            },
            (update) => update.text((d) => d)
          );
      }
      if (config.enableGridYLine) {
        selected
          .selectAll('.y')
          .selectAll('.tick')
          .selectAll('.y-axis-line')
          .data((d, i) => [{ label: d, index: i }])
          .join(
            (enter) => {
              enter
                .append('line')
                .attr('class', 'y-axis-line')
                .attr('stroke', config.gridLineYStroke)
                .attr('stroke-width', (d) => {
                  return d.label !== 0 ? config.gridLineStrokeWidth : 0;
                })
                .attr('x1', 0)
                .attr(
                  'x2',
                  config.graphAreaW * (config.graphAreaWMultiplayer || 1)
                )
                .attr('stroke-dasharray', config.dasharray);
            },
            (update) =>
              update
                .attr('stroke', config.gridLineYStroke)
                .attr('stroke-width', (d) => {
                  return d.label !== 0 ? config.gridLineStrokeWidth : 0;
                })
                .attr('x1', 0)
                .attr(
                  'x2',
                  config.graphAreaW * (config.graphAreaWMultiplayer || 1)
                )
                .attr('stroke-dasharray', config.dasharray),
            (exit) => {
              exit.remove();
            }
          );
      }
    });
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
