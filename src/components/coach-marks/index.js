import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  BackdropMask,
  ButtonWrp,
  // CoachDescription,
  // CoachLabel,
  // CoachMarksWrp,
  HighlightBackdrop,
  HighlightPopover,
  HighlightRipple,
  PopoverContent,
  SkipButton,
} from './index.sc';
import { Button } from '../button';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';

const CoachMarks = ({ steps: stepsConfig, toggler }) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const highlight = useCallback(
    (id) => {
      // remove the existing highlighted elements
      // setIsActive(false);

      const element = document.getElementById(id);

      if (element) {
        const elementDimension = element.getBoundingClientRect();
        // highlight helper
        const top = elementDimension.top + window.scrollY;
        const bottom = elementDimension.bottom + window.scrollY;
        const left = elementDimension.left + window.scrollX;
        const width = elementDimension.width;
        const height = elementDimension.height;
        const right = elementDimension.right;

        setIsActive(true);
        if (!stepsConfig[currentIndex]?.intro) {
          const highlightElement = document.getElementById('highlight-circle');
          const topValue = (top + bottom) / 2;
          const leftValue = (left + right) / 2;
          highlightElement.style = `
        top: ${topValue}px;
        left: ${leftValue}px;
        // width: ${width}px;
        // height: ${height}px;
      `;

          // // Get the parent element
          const parentElement = document.querySelector('#tour-backdrop-mask');
          parentElement.style.top = `${topValue}px`;
          parentElement.style.left = `${leftValue}px`;
        }
        // popover
        const elementBottom = elementDimension.bottom + window.scrollY;
        const elementLeft = elementDimension.left + window.scrollX;
        const elementRight = elementDimension.right;
        const elementWidth = elementDimension.width;

        const popoverEle = document.getElementById('lb-popover');

        const align = elementLeft > window.innerWidth / 2 ? 'left' : 'right';
        const verticalAlign = elementBottom < window.innerHeight / 2 ? 'bottom' : 'top';

        // console.log(align, 'align');

        let popoverEleStyleString = `
        top: ${elementBottom + 5}px;
      `;
        // Conditionally add 'left' or 'right' based on the 'align' variable
        if (align === 'left') {
          popoverEleStyleString += window?.location?.pathname?.includes('create-news-letter')
            ? `left:  ${((elementLeft - elementWidth) + 3 * 16)}px;`
            : `left:  ${elementLeft - elementWidth - 1.5 * 16}px;`;
          // 1.5rem is the current padding value for left and right of app
        } else {
          // The below is logic for add content button.
          stepsConfig[currentIndex]?.id === 'coach-add-news-letter-wrp' && window?.location?.pathname?.includes('create-news-letter')
            ? popoverEleStyleString += `left:  ${((elementLeft - elementWidth) + 4 * 16)
            }px;` : popoverEleStyleString += `left:  ${(elementLeft + elementRight) / 2
            }px;`;
        }
        if (verticalAlign === 'top' && (stepsConfig[currentIndex]?.id === 'coach-add-remove-charts-wrap' || stepsConfig[currentIndex]?.id === 'coach-add-news-letter-wrp')) {
          popoverEleStyleString += `top: ${(elementBottom - 250)}px;`;// 1.5rem is the current padding value for left and right of app
        }

        if (stepsConfig[currentIndex]?.intro) {
          popoverEleStyleString = 'top : 20%;left : 38%';
        }
        popoverEle.style = popoverEleStyleString;
      }
    },
    [currentIndex, stepsConfig]
  );

  // const prevStep = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex((old) => old - 1);
  //   }
  // };

  const nextStep = () => {
    if (currentIndex < stepsConfig.length - 1) {
      setCurrentIndex((old) => old + 1);
    }
  };

  const handleSkip = () => {
    // setCurrentIndex(stepsConfig.length);
    toggler(false);
    setIsActive(false);
  };

  useEffect(() => {
    if (!stepsConfig[currentIndex]) {
      return;
    }
    const id = stepsConfig[currentIndex]?.id;
    highlight(id);
  }, [currentIndex, highlight, stepsConfig]);

  return (
    <>
      {!stepsConfig[currentIndex]?.intro && (
        <HighlightRipple
          id="highlight-circle"
          className={`ripple ${isActive ? 'active' : ''}`}
        ></HighlightRipple>
      )}
      <HighlightPopover
        isIntro={stepsConfig[currentIndex]?.intro}
        id="lb-popover"
        className={isActive ? 'active' : ''}
      >
        <PopoverContent>{stepsConfig[currentIndex]?.content}</PopoverContent>
        {!stepsConfig[currentIndex]?.intro ? (
          <ButtonWrp>
            <SkipButton onClick={handleSkip}>Skip</SkipButton>
            {/* {currentIndex !== 0 && (
              <Button
                title="Back"
                backgroundColor={theme[selectedTheme].background}
                color={theme.dark.secondaryText}
                btnStyle={{
                  width: '4.375rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #535770',
                }}
                disableStyle={{
                  background: '#C3C7D9',
                  color: theme[selectedTheme].logoText,
                  cursor: 'not-allowed',
                }}
                onClick={prevStep}
                disable={currentIndex === 0}
              />
            )} */}
            {currentIndex !== stepsConfig.length - 1 && (
              <Button
                title="Next"
                backgroundColor={theme[selectedTheme].primary}
                color={theme.dark.text}
                btnStyle={{ width: '4.375rem', borderRadius: '0.5rem' }}
                disableStyle={{
                  background: '#C3C7D9',
                  color: theme[selectedTheme].logoText,
                  cursor: 'not-allowed',
                }}
                onClick={nextStep}
                disable={currentIndex === stepsConfig.length - 1}
              />
            )}
          </ButtonWrp>
        ) : (
          <ButtonWrp className="intro-footer">
            <Button
              title="Show me how"
              backgroundColor={theme[selectedTheme].primary}
              color={theme.dark.text}
              btnStyle={{ width: '100%', borderRadius: '0.5rem' }}
              onClick={nextStep}
            />
            <SkipButton className="intro-skip" onClick={handleSkip}>
              Skip
            </SkipButton>
          </ButtonWrp>
        )}
      </HighlightPopover>
      <HighlightBackdrop
        id="tour-backdrop"
        onClick={handleSkip}
        className={`tour-backdrop ${isActive ? 'active' : ''}`}
      >
        <BackdropMask
          style={stepsConfig[currentIndex]?.intro ? { display: 'none' } : {}}
          id="tour-backdrop-mask"
        />
      </HighlightBackdrop>
    </>
  );
};

export default CoachMarks;

CoachMarks.propTypes = {
  steps: PropTypes.array.isRequired,
  toggler: PropTypes.func,
};
