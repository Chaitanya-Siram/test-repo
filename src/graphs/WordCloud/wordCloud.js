import * as d3 from 'd3';
import * as d3Cloud from 'd3-cloud';
import { colorBox, initialValues } from '../utils/graphConst';
import { setUpEvents } from '../utils/graphEvents';

export const wordCloud = function wordCloud() {
  let config = {
    ...initialValues,
    rotate: false,
    maxData: 15,
  };

  // draw the graph here
  function graph(selected) {
    selected.each(function (data) {
      function draw(wcdata) {
        function wcChange(eleRef) {
          eleRef
            .style('fill', function (d, i) {
              return d.color || colorBox[i % colorBox.length];
            })
            .style('font-size', function (d) {
              return d.size;
            })
            .attr('transform', function (d) {
              return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .text(function (d) {
              return d.text;
            });
        }
        selected
          .selectAll('.word-cloud-text')
          .data(wcdata)
          .join(
            (enter) => {
              enter
                .append('text')
                .attr('class', 'word-cloud-text')
                .attr('text-anchor', 'middle')
                .call(wcChange);
            },
            (update) => update.call(wcChange),
            (exit) => {
              exit.remove();
            }
          );
      }

      const dcounts = d3.extent(data.map((ele) => ele.value));

      const fontSize = d3
        .scaleLog()
        .domain(dcounts)
        .range([
          config.minFontSize || 10,
          config.maxFontSize || config.width / 20,
        ]);

      const layout = d3Cloud()
        .size([config.width, config.height])
        .words(
          data.map(function (d) {
            return { ...d, text: d.label, size: fontSize(d.value) };
          })
        )
        .font('Inter')
        .fontWeight(700)
        .padding(3) // space between words
        .spiral('rectangular')
        .rotate(function () {
          return config.rotate ? ~~(Math.random() * 2) * 90 : 0;
        })
        .fontSize(function (d) {
          return d.size;
        }) // font size of words
        .on('end', draw);
      layout.start();

      setUpEvents(config, selected, 'word-cloud-text');
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
