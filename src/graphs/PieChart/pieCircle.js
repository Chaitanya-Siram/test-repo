import * as d3 from 'd3';
import ColorParser from '../utils/colorParser';
import { colorBox, initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';

export const pieCircle = function pieCircle() {
  let config = {
    ...initialValues,
    piePadding: 20,
    overRideDefault: false,
    innerRadius: 0,
    arcLabelFontsize: 10,
    labelColor: '#000',
    subLabelColor: '#000',
    enableCenterText: false,
    arcDividerStrokeColor: 'white',
    startAngle: 0,
    endAngle: Math.PI * 2,
    needleBreathing: 20,
    percentValue: true,
    // graphType: 'pie',
  };

  // draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      const t = d3
        .transition()
        .delay(function (d, i) {
          return i * 3;
        })
        .duration(config.duration);

      const mt = d3
        .transition()
        .delay(function (d, i) {
          return i * 3;
        })
        .duration(config.duration / 10);

      let clearArea =
        config.width < config.height ? config.width : config.height;

      if (!config.overRideDefault) {
        config = {
          ...config,
          piePadding: clearArea * 0.06,
        };
      }
      clearArea = clearArea / 2 - config.piePadding;

      const createPie = d3
        .pie()
        .startAngle(config.startAngle)
        .endAngle(config.endAngle)
        .value((d) => d.value)
        .sort(null);

      // const arc = d3
      // .arc()
      // .innerRadius(clearArea * config.innerRadius)
      // .outerRadius(clearArea);

      const arc = d3
        .arc()
        .innerRadius((d, i) =>
          config.graphType === 'pie'
            ? clearArea * config.innerRadius
            : clearArea -
              (d.data.labelIndex + 1) * (clearArea * config.innerRadius)
        )
        .outerRadius((d) =>
          config.graphType === 'pie'
            ? clearArea
            : clearArea - d.data.labelIndex * (clearArea * config.innerRadius)
        )
        .padAngle(
          data.length === 1 ? 0 : config.padAngle ? config.padAngle : 0.001
        );

      const outerArc = d3
        .arc()
        .innerRadius(clearArea * 0.9)
        .outerRadius(clearArea * 0.9);

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      function arcTween() {
        return function (d) {
          const interpolate = d3.interpolate(this._current, d);
          const _this = this;
          return function (t) {
            _this._current = interpolate(t);
            return arc(_this._current);
          };
        };
      }

      function arcTween1() {
        return function (d) {
          const interpolate = d3.interpolate(
            {
              ...this._current,
              startAngle: config.startAngle,
              endAngle: config.startAngle,
            },
            d
          );
          const _this = this;
          return function (t) {
            _this._current = interpolate(t);
            return arc(_this._current);
          };
        };
      }

      const posCalc = function (d2, labelIndex) {
        return (
          (config.width - clearArea * (config.innerRadius * 2.5) * labelIndex) *
          0.45 *
          (midAngle(d2) > 0 ? 1 : -1)
        );
      };

      function polyAttrTween() {
        return function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            const d2 = interpolate(t);
            const pos = outerArc.centroid(d2);
            pos[0] = posCalc(d2, d.data.labelIndex);
            return 'translate(' + pos + ')';
          };
        };
      }

      function styleTweenFunc() {
        return function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            const d2 = interpolate(t);
            return midAngle(d2) > 0 ? 'start' : 'end';
          };
        };
      }

      function centerGrp(elementRef) {
        elementRef.selectAll('*').remove();

        elementRef
          .append('text')
          .attr('class', 'circle-path-center-label')
          .style('text-anchor', 'middle')
          .style('font-weight', 'bold')
          .style('fill', config.labelColor)
          .style('font-size', `${clearArea * 0.175}px`)
          .style('transform', (d, i) => {
            return `translate(0px, ${-1 * clearArea * 0.03}px)`;
          })
          .text((d) => d.label);

        elementRef
          .append('text')
          .attr('class', 'circle-path-center-sub-label')
          .style('text-anchor', 'middle')
          .style('font-size', `${clearArea * 0.1}px`)
          .style('fill', config.subLabelColor)
          .style('transform', (d, i) => {
            return `translate(0px, ${clearArea * 0.13}px)`;
          })
          .text((d) => d.subLabel);
      }

      // const prevData = selected.selectAll('.pie-path').node()
      //   ? selected.selectAll('.pie-path').data()
      //   : data.map((ele) => ({ label: 'label', value: 0, safeValue: 0 }));

      if (config.enableCenterText) {
        selected
          .selectAll('.circle-path-center-grp')
          .data([config.summary])
          .join(
            (enter) => {
              enter
                .append('g')
                .attr('class', 'circle-path-center-grp')
                .call(centerGrp);
            },
            (update) => update.call(centerGrp),
            (exit) => {
              exit.remove();
            }
          );
      }

      if (config.enableArcBG) {
        const bgWrp = selected
          .selectAll('.pie-bg-wrp')
          .data(
            createPie([{ label: '', value: 100, color: config.enableArcBG }])
          )
          .join(
            (enter) => {
              enter.append('g').attr('class', 'pie-bg-wrp');
            },
            (update) => update,
            (exit) => exit.remove()
          );

        bgWrp
          .selectAll('.pie-path-bg')
          .data(
            createPie([{ label: '', value: 100, color: config.enableArcBG }])
          )
          .join(
            (enter) => {
              enter
                .append('path')
                .attr('class', 'pie-path-bg')
                .transition(mt)
                .attrTween('d', arcTween1())
                .attr('stroke', config.arcDividerStrokeColor)
                .attr('fill', (d, i) => {
                  return d.data.color || ColorParser(colorBox[i]);
                })
                .style('stroke-width', '2px')
                .style('opacity', 1);
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          );
        // .transition(mt)
        // .attr("stroke", config.arcDividerStrokeColor)
        // .attr("fill", (d, i) => {
        //   return d.data.color || ColorParser(colorBox[i]);
        // })
        // .style("stroke-width", "2px")
        // .style("opacity", 1)
        // .attrTween("d", arcTween());
      }

      selected
        .selectAll('.pie-path-grp')
        .data(data)
        .join(
          (enter) => {
            enter.append('g').attr('class', 'pie-path-grp');
          },
          (update) => update,
          (exit) => exit.remove()
        );

      selected
        .selectAll('.pie-path-grp')
        .selectAll('.pie-path')
        .data((d, i) => {
          return createPie(d);
        })
        .join(
          (enter) => {
            enter
              .append('path')
              .attr('class', 'pie-path')
              .transition(t)
              .attrTween('d', arcTween1())
              .style('stroke', config.arcDividerStrokeColor)
              .style('fill', (d, i) => {
                return d.data.color || ColorParser(colorBox[i]);
              })
              .style('stroke-width', '2px')
              .style('opacity', 1);
          },
          (update) =>
            update
              .transition(t)
              .style('stroke', config.arcDividerStrokeColor)
              .style('fill', (d, i) => {
                return d.data.color || ColorParser(colorBox[i]);
              })
              .style('stroke-width', '2px')
              .style('opacity', 1)
              .attrTween('d', arcTween()),
          (exit) => {
            exit.remove();
          }
        );

      if (config.enablePolyline) {
        selected
          .selectAll('.pie-path-grp')
          .selectAll('.pie-path-polyline')
          .data((d) => createPie(d))
          .join(
            (enter) => {
              enter
                .append('polyline')
                .attr('class', 'pie-path-polyline')
                .attr('fill', 'none')
                .attr('stroke', (d) => d.data.color || '#000')
                .transition(t)
                .attrTween('points', function (d) {
                  this._current = this._current || d;
                  const interpolate = d3.interpolate(this._current, d);
                  this._current = interpolate(0);
                  return function (t) {
                    const d2 = interpolate(t);
                    const pos = outerArc.centroid(d2);
                    pos[0] = posCalc(d2, d.data.labelIndex);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                  };
                });
            },
            (update) =>
              update
                .transition(t)
                .attr('fill', 'none')
                .attr('stroke', (d) => d.data.color || '#000')
                .attrTween('points', function (d) {
                  this._current = this._current || d;
                  const interpolate = d3.interpolate(this._current, d);
                  this._current = interpolate(0);
                  return function (t) {
                    const d2 = interpolate(t);
                    const pos = outerArc.centroid(d2);
                    pos[0] = posCalc(d2, d.data.labelIndex);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                  };
                }),
            (exit) => {
              exit.remove();
            }
          );

        selected
          .selectAll('.pie-path-grp')
          .selectAll('.pie-path-polyline-legends')
          .data((d) => createPie(d))
          .join(
            (enter) => {
              enter
                .append('text')
                .attr('class', 'pie-path-polyline-legends')
                .attr('dy', '.35em')
                .text(function (d) {
                  return d.data.label;
                })
                .transition(t)
                .attrTween('transform', polyAttrTween())
                .styleTween('text-anchor', styleTweenFunc());
            },
            (update) =>
              update
                .attr('dy', '.35em')
                .text(function (d) {
                  return d.data.label;
                })
                .transition(t)
                .attrTween('transform', polyAttrTween())
                .styleTween('text-anchor', styleTweenFunc()),
            (exit) => {
              exit.remove();
            }
          );
      }

      if (config.enableNeedle) {
        const needleSpec = {
          width: clearArea * (config.needleWidth || config.innerRadius / 4),
          height:
            clearArea -
            clearArea * (config.innerRadius + config.innerRadius * 0.5),
        };
        const valueToRadian =
          config.startAngle < 0
            ? (-1 * config.startAngle + config.endAngle) / 100
            : config.endAngle / 100;

        selected
          .selectAll('.band-bg')
          .select('defs')
          .data([0])
          .join(
            (enter) => {
              const defs = enter.append('defs');
              defs.selectAll('*').remove();
              const gradientOffset = defs
                .append('linearGradient')
                .attr('class', 'gradientOffset')
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '0%')
                .attr('y2', '100%')
                .attr('id', 'gradOffset-indicator');

              gradientOffset
                .append('stop')
                .attr('offset', '0%')
                .attr('stop-color', config.indicatorColor2 || '#000000')
                .attr('stop-opacity', config.colorOpacity || 1);

              gradientOffset
                .append('stop')
                .attr('offset', '100%')
                .attr('stop-color', config.indicatorBottomColor || '#fff')
                .attr('stop-opacity', config.colorOpacityBottom || 1);
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          );

        selected
          .selectAll('.circle-path-n')
          .data((d, i) => {
            return [{ ...config.summary }];
          })
          .join(
            (enter) => {
              enter
                .append('path')
                .attr('class', 'circle-path-n')
                .attr(
                  'd',
                  (d, i) =>
                    `M${needleSpec.width / 2} 0 L${
                      -1 * (needleSpec.width / 2)
                    } -0 L${-1 * (needleSpec.width / 2)} ${
                      -1 * needleSpec.height
                    } L${needleSpec.width / 2} ${-1 * needleSpec.height} Z`
                )
                .style(
                  'fill',
                  config.needleFillColor || 'url(#gradOffset-indicator)'
                )
                .style('stroke', config.needleStrokeColor || 'none')
                .style('stroke-width', config.needleStrokeWidth || 1)
                .style(
                  'transform',
                  `rotate(${config.startAngle * (180 / Math.PI)}deg)`
                )
                .transition()
                .duration(config.duration / 2)
                .ease(d3.easeLinear)
                .style('transform', (d) => {
                  return `rotate(${parseInt(
                    (config.startAngle + valueToRadian * d.value) *
                      (180 / Math.PI)
                  ).toFixed(2)}deg)`;
                });
            },
            (update) => update,
            (exit) => {
              exit.remove();
            }
          )
          .transition(t)
          .style('transform', (d) => {
            return `rotate(${parseInt(
              (config.startAngle + valueToRadian * d.value) * (180 / Math.PI)
            ).toFixed(2)}deg)`;
          });
      }

      function labelDisplay(d) {
        const diff = d.endAngle - d.startAngle;

        return diff > 1;
      }

      // Calculate the maximum number of characters that fit inside the bubble
      function calculateMaxCharacters(radius, fontSize) {
        const availableWidth = 2 * radius - radius * 0.55; // Adjust padding as needed
        const avgCharacterWidth = fontSize * 0.6; // Adjust factor as needed
        return Math.floor(availableWidth / avgCharacterWidth);
      }

      config.arcLabel &&
        selected
          .selectAll('.pie-path-grp')
          .selectAll('.pie-path-label')
          .data((d) => createPie(d))
          .join(
            (enter) => {
              enter
                .append('text')
                .attr('class', 'pie-path-label')
                .style('text-anchor', 'middle')
                .style('fill', 'white')
                .style('pointer-events', 'none')
                .style('font-size', config.arcLabelFontsize)
                .attr(
                  'transform',
                  (d) => `translate(${arc.centroid(d).map((ele) => ele / 2)})`
                )
                .transition(t)
                .attr('transform', (d) => `translate(${arc.centroid(d)})`)
                .text((d) => {
                  const maxCharacters = calculateMaxCharacters(
                    clearArea / 2,
                    config.arcPathLabelFontSize || 10
                  ); // 12 is the font size
                  if (d.data.label.length > maxCharacters) {
                    return (
                      d.data.label.substr(0, maxCharacters - 3) +
                      (maxCharacters - 3 < 1 ? '' : '..')
                    );
                  }
                  return labelDisplay(d) ? d.data.label : '';
                });
              // .text(function (d) {
              //   return labelDisplay(d) ? d.data.label : '';
              // });
              // .tween('text', (d, i, nodes) => {
              //   const interpolator = d3.interpolate(prevData[i], d)
              //   return (t) =>
              //     d3.select(nodes[i]).text(parseInt(interpolator(t).value))
              // })
            },
            (update) =>
              update
                .transition(t)
                .attr('transform', (d) => `translate(${arc.centroid(d)})`)
                .text((d) => {
                  const maxCharacters = calculateMaxCharacters(
                    clearArea / 2,
                    config.arcPathLabelFontSize || 10
                  ); // 12 is the font size
                  if (d.data.label.length > maxCharacters) {
                    return (
                      d.data.label.substr(0, maxCharacters - 3) +
                      (maxCharacters - 3 < 1 ? '' : '..')
                    );
                  }
                  return labelDisplay(d) ? d.data.label : '';
                }),
            // .text(function (d) {
            //   return labelDisplay(d) ? d.data.label : '';
            // }),
            // .tween('text', (d, i, nodes) => {
            //   const interpolator = d3.interpolate(prevData[i], d)
            //   return (t) =>
            //     d3.select(nodes[i]).text(parseInt(interpolator(t).value))
            // })
            (exit) => {
              exit.remove();
            }
          );

      function radiansToPercentage(d) {
        const radians = d.endAngle - d.startAngle;
        const fullCircleRadians = 2 * Math.PI;
        const percentage = parseFloat(
          (radians / fullCircleRadians) * 100
        ).toFixed(1);

        if (percentage.toString().endsWith('.0')) {
          return `${parseInt(percentage)}%`;
        } else {
          return `${percentage}%`;
        }
      }

      config.arcLabel &&
        selected
          .selectAll('.pie-path-grp')
          .selectAll('.pie-path-value')
          .data((d) => createPie(d))
          .join(
            (enter) => {
              enter
                .append('text')
                .attr('class', 'pie-path-value')
                .style('text-anchor', 'middle')
                .style('fill', 'white')
                .style('pointer-events', 'none')
                .style('font-size', config.arcLabelFontsize)
                .attr(
                  'transform',
                  (d) => `translate(${arc.centroid(d).map((ele) => ele / 2)})`
                )
                .transition(t)
                .attr(
                  'transform',
                  (d) =>
                    `translate(${[
                      arc.centroid(d)[0],
                      arc.centroid(d)[1] + (config.arcValueY || 15),
                    ]})`
                )
                .text(function (d) {
                  return labelDisplay(d)
                    ? config.percentValue
                      ? radiansToPercentage(d)
                      : d.data.value
                    : '';
                });
            },
            (update) =>
              update
                .transition(t)
                .attr(
                  'transform',
                  (d) =>
                    `translate(${[
                      arc.centroid(d)[0],
                      arc.centroid(d)[1] + (config.arcValueY || 15),
                    ]})`
                )
                .text(function (d) {
                  return labelDisplay(d)
                    ? config.percentValue
                      ? radiansToPercentage(d)
                      : d.data.value
                    : '';
                }),

            (exit) => {
              exit.remove();
            }
          );

      setUpEvents(config, selected, 'pie-path');
      // setUpEvents(config, selected, 'pie-path-label');
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
