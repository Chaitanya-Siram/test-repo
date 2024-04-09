import * as d3 from 'd3';

// export const onResetFunc = (className, config) => {
//   // d3.select(config.$svgNode).on('click', function (event, d) {
//   //   // event.stopPropagation();
//   //   const svg = d3.select(this);
//   //   const nodes = svg?.selectAll(`.${className}`)?.nodes();
//   //   nodes?.forEach(function (node) {
//   //     node.classList.remove('unselected');
//   //     node.classList.remove('selected');
//   //   });
//   // });
//   const classSelected = d3.select(config.$svgNode).selectAll(`.${className}`);
//   classSelected.classed('selected', false);
//   classSelected.classed('unselected', false);
// };
// let previousSelectedNode = null;

export const onClickFunc = (selected, className, config) => {
  // d3.select(config.$svgNode).on('click', function (event, d) {
  //   // event.stopPropagation();
  //   const svg = d3.select(this);
  //   const nodes = svg?.selectAll(`.${className}`)?.nodes();
  //   nodes?.forEach(function (node) {
  //     node.classList.remove('unselected');
  //     node.classList.remove('selected');
  //   });
  // });

  // Sujay bhaiya's code
  const classSelected = selected.selectAll(`.${className}`);
  classSelected.style('cursor', 'pointer').on('click', function (event, d) {
    const siblings = selected.selectAll(`.${className}`);
    siblings.classed('unselected', true);
    d3.select(this).node().classList.remove('unselected');
    d3.select(this).node().classList.add('selected');
    config.handleOnClick(event, d);
    event.stopPropagation();
  });

  // const classSelected = selected.selectAll(`.${className}`);
  // classSelected.style('cursor', 'pointer').on('click', function (event, d) {
  //   const clickedElement = d3.select(this);
  //   const siblings = selected.selectAll(`.${className}`);
  //   const isPreviouslyClicked = clickedElement.classed('selected');

  //   // Remove both "selected" and "unselected" classes from all elements
  //   classSelected.classed('selected', false).classed('unselected', false);

  //   if (!isPreviouslyClicked) {
  //     // Add "unselected" class to all elements except the clicked one
  //     siblings.each(function () {
  //       if (!d3.select(this).node().isEqualNode(clickedElement.node())) {
  //         d3.select(this).node().classList.add('unselected');
  //       }
  //     });

  //     // Toggle the "selected" class for the clicked element
  //     clickedElement.node().classList.toggle('selected');
  //     clickedElement.node().classList.remove('unselected');
  //   }

  //   config.handleOnClick(event, d);
  //   event.stopPropagation();
  // });
};

// export const onMouseOverOut = (selected, className, overFunc, outFunc) => {
//   selected
//     .selectAll(`.${className}`)
//     .style('cursor', 'pointer')
//     .on('mouseover', overFunc)
//     .on('mouseout', outFunc);
//   selected
//     .selectAll(`.${className}`)
//     .style('cursor', 'pointer')
//     .on('mouseover', function (event, d) {
//       const siblings = selected.selectAll(`.${className}:not(:hover)`);
//       siblings.classed('unselected', true);

//       overFunc.call(this, event, d);
//     })
//     .on('mouseout', function (event, d) {
//       const siblings = selected.selectAll(`.${className}:not(:hover)`);
//       siblings.classed('unselected', false);

//       outFunc.call(this, event, d);
//     });
// };

export const onMouseOverOut = (selected, className, overFunc, outFunc) => {
  // const classSelected = selected.selectAll(`.${className}`);
  // classSelected
  //   .style('cursor', 'pointer')
  //   .on('mouseover', function (event, d) {
  //     const hoveredElement = d3.select(this);
  //     if (!hoveredElement.classed('selected')) {
  //       const siblings = selected.selectAll(`.${className}`);
  //       siblings.classed('unselected', true);
  //       hoveredElement.classed('unselected', false);
  //       console.log('working in');
  //     }
  //     overFunc(event, d);
  //   })
  //   .on('mouseout', function (event, d) {
  //     const hoveredElement = d3.select(this);
  //     if (!hoveredElement.classed('selected')) {
  //       const siblings = selected.selectAll(`.${className}`);
  //       siblings.classed('unselected', false);
  //       console.log('working out');
  //     }
  //     outFunc(event, d);
  //   });
  //
  // const classSelected = selected.selectAll(`.${className}`);
  // classSelected
  //   .style('cursor', 'pointer')
  //   .on('mouseover', function (event, d) {
  //     const hoveredElement = d3.select(this);
  //     if (!hoveredElement.classed('selected')) {
  //       const siblings = selected.selectAll(`.${className}`);
  //       siblings.classed('unselected', true);
  //       hoveredElement.classed('unselected', false);
  //     }
  //     overFunc(event, d);
  //   })
  //   .on('mouseout', function (event, d) {
  //     const hoveredElement = d3.select(this);
  //     if (!hoveredElement.classed('selected')) {
  //       const siblings = selected.selectAll(`.${className}`);
  //       siblings.classed('unselected', false);
  //     }
  //     outFunc(event, d);
  //   });
};

export const onMouseEnterMoveLeave = (
  selected,
  className,
  enterFunc,
  moveFunc,
  leaveFunc
) => {
  selected
    .selectAll(`.${className}`)
    .style('cursor', 'pointer')
    .on('mouseenter', function (event, d) {
      const hoveredElement = d3.select(this);

      const siblings = selected.selectAll(`.${className}`);
      siblings.classed('hover-unselected', true);
      selected
        .selectAll(`.${className}.selected`)
        .classed('hover-unselected', false);
      hoveredElement
        .classed('hover-unselected', false)
        .classed('hover-selected', true);

      enterFunc(event, d);
    })
    .on('mousemove', moveFunc)
    .on('mouseleave', function (event, d) {
      const siblings = selected.selectAll(`.${className}`);
      siblings
        .classed('hover-unselected', false)
        .classed('hover-selected', false);
      leaveFunc(event, d);
    });
};

export const setUpEvents = (config, selected, className) => {
  setTimeout(function () {
    if (config.handleOnClick) {
      onClickFunc(selected, className, config);
    }

    if (config.handleMouseOver && config.handleMouseOut) {
      onMouseOverOut(
        selected,
        className,
        config.handleMouseOver,
        config.handleMouseOut
      );
    }

    if (
      config.handleMouseEnter &&
      config.handleMouseLeave &&
      config.handleMouseMove
    ) {
      onMouseEnterMoveLeave(
        selected,
        className,
        config.handleMouseEnter,
        config.handleMouseMove,
        config.handleMouseLeave
      );
    }
  }, 1000);
};
