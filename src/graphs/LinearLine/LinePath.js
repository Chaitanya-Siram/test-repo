import * as d3 from 'd3';
import { colorBox, initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';

export const linePath = function linePath() {
  let config = {
    ...initialValues,
    enableCurve: false,
    enableStep: false,
    areaLineStroke: '#8676FF',
    areaLineStrokeWidth: 2,
    r: 5,
    enablePointCircle: false,
    // pointCircleFill: "none",
    pointCircleStroke: '#8676FF',
    pointCircleStrokeWidth: 2,
    enableThreshold: false,
    thresholdStroke: 'red',
    thresholdStrokeWidth: 2,
    enableGradient: false,
    disableCircleLabel: true,
  };

  // draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      const t = d3.transition().duration(config.duration);

      // selected.selectAll("defs").remove();

      function lg(eleRef) {
        const gradientOffset = eleRef
          // .attr("cx", "25%")
          // .attr("cy", "25%")
          // .attr("r", "65%")
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '100%')
          .attr('id', function (d, i) {
            return 'gradOffset-' + i;
          });

        gradientOffset
          .selectAll('.stop')
          .data((d) => {
            return [d];
          })
          .join(
            (enter) => {
              enter
                .append('stop')
                .attr('class', 'stop')
                .attr('offset', '50%')
                .attr('stop-color', (d) => d[0]?.color)
                .attr('stop-opacity', (d) => d[0]?.colorOpacity || 0.5);
            },
            (update) => {
              update
                .attr('offset', '50%')
                .attr('stop-color', (d) => d[0]?.color)
                .attr('stop-opacity', (d) => d[0]?.colorOpacity || 0.5);
            },
            (exit) => exit.remove()
          );

        gradientOffset
          .selectAll('.stop1')
          .data((d) => {
            return [d];
          })
          .join(
            (enter) => {
              enter
                .append('stop')
                .attr('class', 'stop1')
                .attr('offset', '100%')
                .attr('stop-color', (d) => d[0]?.color1 || '#fff')
                .attr('stop-opacity', (d) => d[0]?.colorOpacity1 || 0.5);
            },
            (update) => {
              update
                .attr('offset', '100%')
                .attr('stop-color', (d) => d[0]?.color1 || '#fff')
                .attr('stop-opacity', (d) => d[0]?.colorOpacity1 || 0.5);
            },
            (exit) => exit.remove()
          );
      }

      function createDefs(elementRef) {
        elementRef
          .selectAll('.gradientOffset')
          .data((d) => {
            return d;
          })
          .join(
            (enter) => {
              enter
                .append('linearGradient')
                .attr('class', 'gradientOffset')
                .call(lg);
            },
            (update) => update.call(lg),
            (exit) => exit.remove()
          )
          .call(lg);
      }

      selected
        .selectAll('.defs')
        .data((d) => {
          return [d];
        })
        .join(
          (enter) => {
            enter.append('defs').attr('class', 'defs').call(createDefs);
          },
          (update) => update.call(createDefs),
          (exit) => exit.remove()
        )
        .call(createDefs);

      const lineConst = d3.line().x(function (d, i) {
        return config.xScale(d.label);
      });

      const areaConsts = d3.area().x(function (d, i) {
        return config.xScale(d.label);
      });

      if (config.enableCurve) {
        areaConsts.curve(d3.curveMonotoneX);
        lineConst.curve(d3.curveMonotoneX); // apply smoothing to the line
      } else if (config.enableStep) {
        areaConsts.curve(d3.curveStepAfter);
        lineConst.curve(d3.curveStepAfter); // apply smoothing to the line
      }

      const lineFunc = function (datum, boolean) {
        return lineConst.y(function (d) {
          return config.yScale(boolean ? d.value : 0);
        })(datum);
      };

      const slineFunc = function (datum, boolean) {
        return lineConst.y(function (d) {
          return config.yScale(boolean ? d.accValue : 0);
        })(datum);
      };

      const area = function (datum, boolean) {
        return areaConsts
          .y0(function (d, i) {
            return config.yScale(config.minY < 0 ? config.minY : 0);
          })
          .y1(function (d, i) {
            return config.yScale(boolean ? d.value : 0);
          })(datum);
      };
      // Construct an stacked area generator.

      const sarea = function (datum, boolean) {
        return areaConsts
          .y0(function (d, i) {
            return boolean
              ? config.yScale(d.accValue - d.value)
              : config.yScale(0);
          })
          .y1(function (d, i) {
            return boolean ? config.yScale(d.accValue) : config.yScale(0);
          })(datum);
      };

      // Construct an range area generator.
      const rband = function () {
        return areaConsts
          .y0(function (d, i) {
            return config.yScale(d.value);
          })
          .y1(function (d) {
            return config.yScale(d.lastLineValue);
          });
      };

      if (config.graphType === 'rband') {
        selected
          .selectAll('.band-bg')
          .data((d, i) => {
            d.map((entry, j) => {
              const temp = entry.map((ele, k) => {
                const t = JSON.parse(JSON.stringify(ele));
                t.lastLineValue = d[d.length - 1][k].value;
                return t;
              });
              return temp;
            });
            return [d[0]];
          })
          .join(
            (enter) => {
              enter
                .append('path')
                .attr('class', 'band-bg')
                .attr('fill', config.bandBGColor || '#f6f6f6')
                .transition(t)
                .attr('d', rband());
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          )
          .transition(t)
          .attr('d', rband());
      }

      function mainBaseFunc(elementRef) {
        elementRef
          .selectAll('.line-path')
          .data((d, i) => {
            d.map((entry) => {
              const temp = entry.map((ele) => {
                const t = JSON.parse(JSON.stringify(ele));
                t.lastIndex = entry.length;
                return t;
              });
              return temp;
            });
            const filterD = [];
            d.forEach((element) => {
              filterD.push(element.filter((ele) => ele.value >= 0));
            });
            return filterD;
          })
          .join(
            (enter) => {
              const base = enter.append('path').attr('class', 'line-path');
              if (config.graphType === 'area' || config.graphType === 'sarea') {
                base
                  .attr(
                    'fill',
                    config.graphType === 'line' || config.graphType === 'rband'
                      ? 'none'
                      : (d, i) => {
                          return config.enableGradient
                            ? `url(#gradOffset-${i})`
                            : d[0]?.color
                            ? d[0]?.color
                            : colorBox[(i % colorBox.length) - 1];
                        }
                  )
                  .attr('d', (d) =>
                    config.graphType === 'area'
                      ? area(d, false)
                      : sarea(d, false)
                  )

                  .transition(t)
                  .style(
                    'opacity',
                    config.graphType === 'area' ? (d, i) => 1 - 0.1 * i : 1
                  )
                  .attr(
                    'fill',
                    config.graphType === 'line' || config.graphType === 'rband'
                      ? 'none'
                      : (d, i) =>
                          config.enableGradient
                            ? `url(#gradOffset-${i})`
                            : d[0]?.color
                            ? d[0]?.color
                            : colorBox[(i % colorBox.length) - 1]
                  )
                  .attr('d', (d) =>
                    config.graphType === 'area' ? area(d, true) : sarea(d, true)
                  );
              } else {
                base
                  .attr(
                    'fill',
                    config.graphType === 'line' || config.graphType === 'rband'
                      ? 'none'
                      : (d, i) =>
                          d[0]?.color
                            ? d[0]?.color
                            : colorBox[(i % colorBox.length) - 1]
                  )
                  .attr('stroke', (d, i) => {
                    const colorsArr = d.map((colorEle) => colorEle?.color);
                    const colorVal = colorsArr.filter(function (felement) {
                      return felement !== undefined;
                    });
                    if (colorVal[i + 1]) {
                      return colorVal[i];
                    } else {
                      return colorBox[i % colorBox.length];
                    }
                  })
                  .attr('stroke-width', config.lineStrokeWidth || 2.5)
                  .attr('d', (d) => lineFunc(d, false))
                  .transition(t)
                  .attr('d', (d) => lineFunc(d, true))
                  .attr('stroke-dashoffset', 0);
              }
            },
            (update) => {
              if (config.graphType === 'area' || config.graphType === 'sarea') {
                update
                  .attr(
                    'fill',
                    config.graphType === 'line' || config.graphType === 'rband'
                      ? 'none'
                      : (d, i) =>
                          config.enableGradient
                            ? `url(#gradOffset-${i})`
                            : d[0]?.color
                            ? d[0]?.color
                            : colorBox[(i % colorBox.length) - 1]
                  )
                  .transition(t)
                  .style(
                    'opacity',
                    config.graphType === 'area' ? (d, i) => 1 - 0.1 * i : 1
                  )
                  .attr(
                    'fill',
                    config.graphType === 'line' || config.graphType === 'rband'
                      ? 'none'
                      : (d, i) =>
                          config.enableGradient
                            ? `url(#gradOffset-${i})`
                            : d[0]?.color
                            ? d[0]?.color
                            : colorBox[(i % colorBox.length) - 1]
                  )
                  .attr('d', (d) =>
                    config.graphType === 'area' ? area(d, true) : sarea(d, true)
                  );
              } else {
                update
                  .attr('stroke', (d, i) => {
                    const colorsArr = d.map((colorEle) => colorEle?.color);
                    const colorVal = colorsArr.filter(function (felement) {
                      return felement !== undefined;
                    });
                    if (colorVal[i]) {
                      return colorVal[i];
                    } else {
                      return colorBox[i % colorBox.length];
                    }
                  })
                  .attr('stroke-width', config.lineStrokeWidth || 2.5)
                  .attr('d', (d) => lineFunc(d, false))
                  .transition(t)
                  .attr(
                    'fill',
                    config.graphType === 'line' || config.graphType === 'rband'
                      ? 'none'
                      : (d, i) =>
                          d[0]?.color
                            ? d[0]?.color
                            : colorBox[(i % colorBox.length) - 1]
                  )
                  .attr('d', (d) => lineFunc(d, true))
                  .attr('stroke-dashoffset', 0);
              }
            },
            (exit) => {
              exit
                .transition(t)
                .attr('d', (d) =>
                  config.graphType === 'area'
                    ? area(d, false)
                    : config.graphType === 'sarea'
                    ? sarea(d, false)
                    : lineFunc(d, false)
                )
                .remove();
            }
          );
      }

      selected
        .selectAll('.line-path-group')
        .data((d) => [d])
        .join(
          (enter) => {
            enter
              .append('g')
              .attr('class', 'line-path-group')
              .call(mainBaseFunc);
          },
          (update) => update.call(mainBaseFunc),
          (exit) => exit.remove()
        );

      if (config?.summary?.thresholdArr?.length && config.enableThreshold) {
        selected
          .selectAll('.threshold-line-path')
          .data(config.summary.thresholdArr)
          .join(
            (enter) => {
              enter
                .append('line')
                .attr('class', 'threshold-line-path')
                .attr('stroke', (d) => d?.color || config.thresholdStroke)
                .attr('stroke-width', config.thresholdStrokeWidth)
                .attr('x1', 0)
                .attr('y1', (d) => config.yScale(d.value))
                .attr('x2', config.graphAreaW * 0.95)
                .attr('y2', (d) => config.yScale(d.value))
                .attr('stroke-dasharray', 5)
                .attr('stroke-dashoffset', 0);
            },
            (update) =>
              update
                .attr('y1', (d) => config.yScale(d.value))
                .attr('y2', (d) => config.yScale(d.value)),
            (exit) => {
              exit.remove();
            }
          );

        if (!config.disableThreshouldLabel) {
          selected
            .selectAll('.threshold-line-path-text')
            .data(config.summary.thresholdArr)
            .join(
              (enter) => {
                enter
                  .append('text')
                  .attr('class', 'threshold-line-path-text')
                  .attr('x', config.graphAreaW * 0.94)
                  .attr('y', (d) => config.yScale(d.value) - 5)
                  .attr('text-anchor', 'end')
                  .attr('fill', (d) => d?.color || config.thresholdStroke)
                  .text((d) => `${d.label}-${d.value}`);
              },
              (update) => update,
              (exit) => {
                exit.remove();
              }
            );
        }
      } else {
        selected.selectAll('.threshold-line-path').remove();
        selected.selectAll('.threshold-line-path-text').remove();
      }

      if (config.graphType !== 'line' && config.enableAreaLine) {
        selected
          .selectAll('.line-path-area-line')
          .data((d, i) => {
            d.map((entry) => {
              const temp = entry.map((ele) => {
                const t = JSON.parse(JSON.stringify(ele));
                t.lastIndex = entry.length;
                return t;
              });
              return temp;
            });
            return d;
          })
          .join(
            (enter) => {
              enter
                .append('path')
                .attr('class', 'line-path-area-line')
                .attr('fill', 'none')
                .attr('stroke', (d, i) => {
                  return d[i]?.dashLineColor
                    ? d[i]?.dashLineColor
                    : config.areaLineStroke;
                })
                .attr('stroke-width', config.areaLineStrokeWidth)
                .attr('d', (d) =>
                  config.graphType === 'sarea'
                    ? slineFunc(d, false)
                    : lineFunc(d, false)
                )
                .transition(t)
                .attr('d', (d) =>
                  config.graphType === 'sarea'
                    ? slineFunc(d, true)
                    : lineFunc(d, true)
                )
                .attr('stroke-dasharray', (d, i) =>
                  d[i]?.enableDash ? '3,3' : '0,0'
                );
            },
            (update) =>
              update

                .transition(t)
                .attr('stroke', (d, i) => {
                  return d[i]?.dashLineColor
                    ? d[i]?.dashLineColor
                    : config.areaLineStroke;
                })
                .attr('stroke-width', config.areaLineStrokeWidth)
                .attr('d', (d) =>
                  config.graphType === 'sarea'
                    ? slineFunc(d, true)
                    : lineFunc(d, true)
                )
                .attr('stroke-dashoffset', 0),
            (exit) => {
              exit.remove();
            }
          );
      }

      if (config.enablePointCircle) {
        const lineCircleGrpMain = selected
          .selectAll('.line-circle-grp')
          .data((d, i) => d.flat(Infinity))
          .join(
            (enter) => {
              const lineCircleGrp = enter
                .append('g')
                .attr('class', 'line-circle-grp')
                .attr('transform', (d, i) => {
                  return `translate(${config.xScale(d.label)},${config.yScale(
                    d.value
                  )})`;
                });

              lineCircleGrp.selectAll('.line-circle').remove();
              lineCircleGrp.selectAll('.line-circle-label').remove();

              lineCircleGrp
                .append('circle')
                .attr('class', 'line-circle')
                .attr('r', (d) => {
                  return d.value > 0 ? config.r : 0;
                })
                .style('stroke', (d, i) => {
                  return (
                    d.dashLineColor ||
                    d?.color1 ||
                    d?.color ||
                    config.pointCircleStroke
                  );
                })
                .style('stroke-width', config.pointCircleStrokeWidth)
                .style('fill', config.pointCircleFill || '#fff');

              if (!config.disableCircleLabel) {
                lineCircleGrp
                  .append('text')
                  .attr('class', 'line-circle-label')
                  .attr('x', config.r * 1.5)
                  .attr('y', (d) => {
                    return (d.labelIndex % 2 === 0 ? -1 : 1) * config.r * 3;
                  })
                  .text((d) => (isNaN(d.value) ? '' : d.value || ''));
              }
            },
            (update) =>
              update.attr('transform', (d, i) => {
                return `translate(${config.xScale(d.label)},${config.yScale(
                  d.value
                )})`;
              }),
            (exit) => {
              exit.remove();
            }
          );

        lineCircleGrpMain.selectAll('.line-circle').remove();
        lineCircleGrpMain.selectAll('.line-circle-label').remove();

        lineCircleGrpMain
          .append('circle')
          .attr('class', 'line-circle')
          .attr('r', (d) => {
            return d.value > 0 ? config.r : 0;
          })
          .style('stroke', (d, i) => {
            return (
              d.dashLineColor ||
              d?.color1 ||
              d?.color ||
              config.pointCircleStroke
            );
          })
          .style('stroke-width', config.pointCircleStrokeWidth)
          .style('fill', config.pointCircleFill || '#fff');
        if (!config.disableCircleLabel) {
          lineCircleGrpMain
            .append('text')
            .attr('class', 'line-circle-label')
            .attr('x', config.r * 1.5)
            .attr('y', (d) => {
              return (d.labelIndex % 2 === 0 ? -1 : 1) * config.r * 3;
            })
            .text((d) => (isNaN(d.value) ? '' : d.value || ''));
        }
      }

      if (config.enableAllPointToolTip) {
        const tooltipWidth = config.xScale.step() * 0.8;
        const tooltipHeight = 60;
        const tooltipArrowLength = 10;
        const ToolTextXAlign = 5;
        const ToolTextYAlign = 18;
        const toolLegR = config.toolLegR || 5;

        const toolLegend = (selectedItem, x, y, dataIndex) => {
          const legGrp = selectedItem
            .append('g')
            .attr('class', 'line-point-tooltip-legend-grp')
            .attr('transform', (d, i) => {
              return `translate(${x},${y})`;
            });
          legGrp
            .append('circle')
            .attr('class', 'line-point-tooltip-legend')
            .attr('cy', -1 * (toolLegR * 0.85))
            .attr('r', toolLegR)
            .style('stroke', (d, i) =>
              data[dataIndex][i].value ? data[dataIndex][i]?.color : '#fff'
            )
            .style('stroke-width', config.pointCircleStrokeWidth)
            .style('fill', config.pointCircleFill);
          legGrp
            .append('text')
            .attr('class', 'line-point-tooltip-v1')
            .attr('x', toolLegR * 1.75)
            .text((d, i) => {
              return data[dataIndex][i].value || '';
            });
        };

        const toolTipFun = (selectedItem) => {
          selectedItem
            .attr('transform', (d, i) => {
              const tempArr = data.map((ele) => {
                return ele[i].value || 0;
              });
              const maxOfList = d3.max(tempArr);

              return `translate(${
                config.xScale(d.label) - tooltipWidth * 0.2
              },${
                config.yScale(maxOfList) -
                (tooltipHeight + tooltipArrowLength + 5)
              })`;
            })
            .style('display', (d, i) => {
              return data[0][i].value || data[1][i].value ? '' : 'none';
            });
          selectedItem.selectAll('.line-point-tooltip-rect').remove();
          selectedItem.selectAll('.line-point-tooltip-title').remove();
          selectedItem.selectAll('.line-point-tooltip-legend-grp').remove();
          selectedItem
            .append('rect')
            .attr('class', 'line-point-tooltip-rect')
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight)
            .attr('fill', 'white')
            .attr('stroke', '#DCDFF0');

          selectedItem
            .append('text')
            .attr('class', 'line-point-tooltip-title')
            .attr('x', ToolTextXAlign)
            .attr('y', ToolTextYAlign)
            .text((d) => {
              return d.label;
            });

          toolLegend(selectedItem, ToolTextXAlign * 2, ToolTextYAlign * 2, 0);
          toolLegend(selectedItem, ToolTextXAlign * 2, ToolTextYAlign * 3, 1);
        };

        const mainToolTipGrp = selected
          .selectAll('.line-point-tooltip')
          .data((d, i) => d[0] || [])
          .join(
            (enter) => {
              const tooltipGrp = enter
                .append('g')
                .attr('class', 'line-point-tooltip');

              toolTipFun(tooltipGrp);
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          );

        toolTipFun(mainToolTipGrp);
      }

      selected.transition(t).attr('width', config.width);

      selected
        .selectAll('.line-bg-rect')
        .data((d, i) => {
          return d[0].map((ele, ii) => {
            const newEle = { ...ele };
            for (let iii = 0; iii < d.length; iii++) {
              newEle[d[iii][ii].labelText] = d[iii][ii].value;
              newEle[`${d[iii][ii].labelText}Color`] = d[iii][ii]?.color;
            }
            return newEle;
          });
        })
        .join(
          (enter) => {
            enter
              .append('rect')
              .attr('class', 'line-bg-rect')
              .attr('fill', 'transparent')
              .attr('x', (d, i) =>
                i === 0
                  ? config.xScale.step() * i
                  : config.xScale.step() / 2 + config.xScale.step() * (i - 1)
              )
              .attr('width', (d, i) =>
                i === 0
                  ? config.xScale.step() / 2
                  : data[0].length - 1 === i
                  ? config.xScale.step() / 2
                  : config.xScale.step()
              )
              .attr('height', config.graphAreaH);
          },
          (update) => update,
          (exit) => {
            exit.remove();
          }
        )
        .attr('x', (d, i) =>
          i === 0
            ? config.xScale.step() * i
            : config.xScale.step() / 2 + config.xScale.step() * (i - 1)
        )
        .attr('width', (d, i) =>
          i === 0
            ? config.xScale.step() / 2
            : data[0].length - 1 === i
            ? config.xScale.step() / 2
            : config.xScale.step()
        )
        .attr('height', config.graphAreaH);

      if (config.rectIndicator) {
        selected
          .selectAll('.line-rect-indicator-rect')
          .data([data[config.selected || 0]])
          .join(
            (enter) => {
              enter
                .append('rect')
                .attr('class', 'line-rect-indicator-rect')
                .style('fill', config.indicatorColor || '#cccccc80')
                .attr(
                  'x',
                  config.selected === 0
                    ? config.xScale.step() * config.selected
                    : config.xScale.step() / 2 +
                        config.xScale.step() * (config.selected - 1)
                )
                .attr('width', (d, i) =>
                  config.selected === 0
                    ? config.xScale.step() / 2
                    : data[0].length - 1 === config.selected
                    ? config.xScale.step() / 2
                    : config.xScale.step()
                )
                .attr('y', 0)
                .transition(t)
                .attr('height', config.graphAreaH);
            },
            (update) => update,
            (exit) => {
              exit.transition(t).attr('height', 0).attr('width', 0).remove();
            }
          )
          .transition(t)
          .style('fill', config.indicatorColor || '#cccccc80')
          .attr(
            'x',
            config.selected === 0
              ? config.xScale.step() * config.selected
              : config.xScale.step() / 2 +
                  config.xScale.step() * (config.selected - 1)
          )
          .attr('width', (d, i) =>
            config.selected === 0
              ? config.xScale.step() / 2
              : data[0].length - 1 === config.selected
              ? config.xScale.step() / 2
              : config.xScale.step()
          )
          .attr('y', 0)
          .attr('height', config.graphAreaH);
      }

      setUpEvents(config, selected, 'line-bg-rect');
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
