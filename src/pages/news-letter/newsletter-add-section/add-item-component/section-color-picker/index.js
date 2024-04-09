import React, { useEffect, useRef, useState } from 'react';
import {
  FontColor,
  SectionColor,
  SectionColorIconWrp,
  SectionColorWrp,
  SectionContainer,
} from './index.sc';
import NewsletterArticlesMoreOpt from '../../../../../assets/icons/NewsletterArticlesMoreOpt';
import { SketchPicker } from 'react-color';
import Proptypes from 'prop-types';
import {
  CSVInput,
  CSVLabel,
  CSVWrp,
} from '../../../../../components/multiple-filter-component/index.sc';
import ImageUploadIcon from '../../../../../assets/icons/ImageUpload';
import { theme } from '../../../../../constants/theme';
import { useSelector } from 'react-redux';

const SectionColorPicker = ({
  onChangeColor,
  defaultColor,
  color,
  backgroundColor,
  onChangeBackgroundColor,
  defaultBackgroundColor,
  showBackground,
  showFontColor = true,
  showImageUpload,
  onChangeImage,
  show,
  dimensionsText = '',
}) => {
  const [showMoreOpts, setShowMoreOpts] = useState(false);
  const [showBackgroundOption, setShowBackgroundOption] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedBGColor, setSelectedBGColor] = useState(
    defaultBackgroundColor
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef();
  const dropdownRef = useRef(null);

  const handleChangeComplete = (color) => {
    setSelectedColor(color?.hex);
    onChangeColor && onChangeColor(color?.hex);
    // setShowMoreOpts(false);
  };

  const handleBGChangeComplete = (color) => {
    setSelectedBGColor(color?.hex);
    onChangeBackgroundColor && onChangeBackgroundColor(color?.hex);
    // setShowBackgroundOption(false);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    if (color) {
      setSelectedColor(color);
    } else if (defaultColor) {
      setSelectedColor(defaultColor);
    }
  }, [color, defaultColor]);

  useEffect(() => {
    if (backgroundColor) {
      setSelectedBGColor(backgroundColor);
    } else if (defaultBackgroundColor) {
      setSelectedBGColor(defaultBackgroundColor);
    }
  }, [backgroundColor, defaultBackgroundColor]);

  useEffect(() => {
    const calculatePosition = () => {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - dropdownRect.bottom;
        setPosition({
          x: dropdownRect.left,
          y: spaceBelow > 200 ? dropdownRect.bottom : dropdownRect.top - 200,
        });
      }
    };

    if (showMoreOpts) {
      calculatePosition();
    }
  }, [showMoreOpts]);

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowBackgroundOption(false);
      setShowMoreOpts(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <SectionContainer
      showFontColor={showFontColor}
      showBackground={showBackground}
      showImageUpload={showImageUpload}
      ref={dropdownRef}
      show={show || showMoreOpts || showBackgroundOption}
      // onMouseLeave={() => {
      //   setShowBackgroundOption(false);
      //   setShowMoreOpts(false);
      // }}
    >
      <div
        style={{
          margin: showBackground && showImageUpload ? '0.5rem' : '2rem',
        }}
      >
        <SectionColorWrp
          showImageUpload={showImageUpload}
          showBackground={showBackground}
          showFontColor={showFontColor}
        >
          {showImageUpload && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CSVWrp
                style={{
                  background: 'transparent',
                  border: 'none',
                  margin: 0,
                  padding: 0,
                  marginRight: '10px',
                }}
              >
                <CSVInput
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  ref={fileInputRef}
                  onChange={(option) =>
                    onChangeImage(option, () => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    })
                  }
                  style={{ cursor: 'pointer' }}
                  id={'file-input-color-picker'}
                />
                <CSVLabel
                  htmlFor="file-input-color-picker"
                  onClick={() => fileInputRef.current.click()}
                >
                  <ImageUploadIcon
                    color={theme[selectedTheme]?.errorButtonBackground}
                  />
                </CSVLabel>
              </CSVWrp>
              <span
                style={{
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                {dimensionsText}
              </span>
            </div>
          )}
          {showFontColor && (
            <div style={{ cursor: 'pointer' }}>
              <FontColor
                onClick={() => {
                  setShowMoreOpts(!showMoreOpts);
                  setShowBackgroundOption(false);
                }}
              >
                A
                <span
                  style={{
                    backgroundColor: selectedColor,
                    width: '1rem',
                    height: '0.3rem',
                    display: 'block',
                    border: '1px solid #888888',
                  }}
                ></span>
              </FontColor>
            </div>
          )}
          {showBackground && (
            <div style={{ cursor: 'pointer' }}>
              <SectionColor
                onClick={() => {
                  setShowBackgroundOption(!showBackgroundOption);
                  setShowMoreOpts(false);
                }}
                selectedColor={selectedBGColor}
              />
            </div>
          )}
        </SectionColorWrp>
      </div>
      {showMoreOpts && (
        <div style={{ marginTop: '-2rem' }}>
          <SketchPicker
            color={selectedColor}
            onChange={handleChangeComplete}
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
            }}
          />
        </div>
      )}

      {showBackgroundOption && (
        <div
          style={{
            marginTop: showBackground && showImageUpload ? '-0.4rem' : '-2rem',
            marginLeft: showBackground && showImageUpload ? '-3rem' : 'unset',
          }}
        >
          <SketchPicker
            color={selectedBGColor}
            onChange={handleBGChangeComplete}
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
            }}
          />
        </div>
      )}
    </SectionContainer>
  );
};

SectionColorPicker.propTypes = {
  onChangeColor: Proptypes.func,
  defaultColor: Proptypes.string,
  color: Proptypes.string,
  backgroundColor: Proptypes.string,
  onChangeBackgroundColor: Proptypes.func,
  defaultBackgroundColor: Proptypes.string,
  showBackground: Proptypes.bool,
  showFontColor: Proptypes.bool,
  showImageUpload: Proptypes.bool,
  onChangeImage: Proptypes.func,
  show: Proptypes.bool,
  dimensionsText: Proptypes.string,
};

export default SectionColorPicker;
