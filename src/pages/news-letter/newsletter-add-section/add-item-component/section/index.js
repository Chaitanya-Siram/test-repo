import React, { useRef, useState } from 'react';
import {
  SectionDescriptionHoverContainer,
  SectionHeading,
  SectionHeadingHoverContainer,
  SectionWrapper,
} from './index.sc';
import Proptypes from 'prop-types';
import SectionColorPicker from '../section-color-picker';

const NewsLetterSection = ({
  newsLetter,
  setNewsLetter,
  setPreviousState,
  rowId,
  title,
  description,
  data,
}) => {
  const [textItemDetails, setTextItemDetails] = useState({
    sectionTitle:
      data?.columnComponent?.sectionData?.sectionTitle ||
      `Section ${rowId + 1 || 1}`,
    sectionDescription:
      data?.columnComponent?.sectionData?.sectionDescription || '',
  });
  const [titleColor, setTitleColor] = useState(
    data?.columnComponent?.sectionData?.titleColor || '#000000'
  );
  const [titleBackgroundColor, setTitleBackgroundColor] = useState(
    data?.columnComponent?.sectionData?.titleBackgroundColor || '#ffffff'
  );

  const [descriptionColor, setDescriptionColor] = useState(
    data?.columnComponent?.sectionData?.descriptionColor || '#000000'
  );
  const [descriptionBackgroundColor, setDescriptionBackgroundColor] = useState(
    data?.columnComponent?.sectionData?.descriptionBackgroundColor || '#ffffff'
  );

  const descriptionRef = useRef();
  const titleRef = useRef();

  const [titleHover, setTitleHover] = useState(false);
  const [descriptionHover, setDescriptionHover] = useState(false);

  const updateComponentDataForRow = (newComponentData, rowId) => {
    const rowIndex = newsLetter.findIndex((row) => row.rowId === rowId);
    if (rowIndex !== -1) {
      const updatedNewsLetter = [...newsLetter];
      // Ensure rowItems array is present
      if (!updatedNewsLetter[rowIndex]) {
        updatedNewsLetter[rowIndex] = [];
      }

      // Ensure columnComponent object is present
      if (!updatedNewsLetter[rowIndex]?.columnComponent) {
        updatedNewsLetter[rowIndex] = {
          columnId: 'a', // Adjust as needed
          columnComponent: {},
        };
      }

      // Update componentData
      updatedNewsLetter[rowIndex].columnComponent.sectionData =
        newComponentData;

      setNewsLetter(updatedNewsLetter);
      setPreviousState((prev) => ({
        ...prev,
        newsletter_body:
          updatedNewsLetter[rowIndex].columnComponent.componentData,
      }));
    }
  };

  const changeTextDetails = (e, rowId) => {
    const { name, value } = e.target;
    setTextItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const temp = {
      ...getData(),
      [name]: value,
    };
    updateComponentDataForRow(temp, rowId);
  };

  const getData = () => {
    return {
      ...textItemDetails,
      titleColor,
      titleBackgroundColor,
      descriptionColor,
      descriptionBackgroundColor,
    };
  };

  // const calculateRows = (text) => {
  //   const lines = text?.split('\n')?.length;
  //   return Math.max(lines, 1);
  // };

  const calculateRows = (text, textareaWidth) => {
    const charactersPerLine = textareaWidth / 6; // Adjust this value based on your font size and layout
    const linesFromNewLines = text?.split('\n')?.length;
    const linesFromContinuedText = Math.ceil(text?.length / charactersPerLine);
    return Math.max(linesFromNewLines, linesFromContinuedText, 1);
  };

  return (
    <SectionWrapper>
      <SectionHeadingHoverContainer
        onMouseEnter={() => {
          setTitleHover(true);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setTitleHover(false);
          }, 250);
        }}
      >
        <SectionHeading
          ref={titleRef}
          sectionColor={titleColor}
          placeholder={`Section ${rowId + 1 || 1}`}
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            backgroundColor: titleBackgroundColor,
            padding: '0.25rem',
          }}
          name={'sectionTitle'}
          value={textItemDetails?.sectionTitle}
          onChange={(e) => {
            changeTextDetails(e, rowId);
            if (titleRef.current) {
              titleRef.current.style.height = 'auto';
              titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
            }
          }}
          rows={1}
        />

        <SectionColorPicker
          onChangeColor={(color) => {
            setTitleColor(color);
            updateComponentDataForRow(
              { ...getData(), titleColor: color },
              rowId
            );
          }}
          defaultColor={'#000000'}
          color={titleColor}
          showBackground={true}
          onChangeBackgroundColor={(color) => {
            setTitleBackgroundColor(color);
            updateComponentDataForRow(
              { ...getData(), titleBackgroundColor: color },
              rowId
            );
          }}
          backgroundColor={titleBackgroundColor}
          defaultBackgroundColor={'#000000'}
          show={titleHover}
        />
      </SectionHeadingHoverContainer>

      <SectionDescriptionHoverContainer
        onMouseEnter={() => {
          setDescriptionHover(true);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setDescriptionHover(false);
          }, 250);
        }}
      >
        <SectionHeading
          ref={descriptionRef}
          sectionColor={descriptionColor}
          placeholder="Section Description"
          name={'sectionDescription'}
          value={textItemDetails?.sectionDescription}
          onChange={(e) => {
            changeTextDetails(e, rowId);
            if (descriptionRef.current) {
              descriptionRef.current.style.height = 'auto'; // Reset height to auto
              descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
            }
          }}
          rows={1}
          style={{
            backgroundColor: descriptionBackgroundColor,
            padding: '0.25rem',
          }}
        />
        <SectionColorPicker
          onChangeColor={(color) => {
            setDescriptionColor(color);
            updateComponentDataForRow(
              { ...getData(), descriptionColor: color },
              rowId
            );
          }}
          defaultColor={'#000000'}
          color={descriptionColor}
          showBackground={true}
          onChangeBackgroundColor={(color) => {
            setDescriptionBackgroundColor(color);
            updateComponentDataForRow(
              { ...getData(), descriptionBackgroundColor: color },
              rowId
            );
          }}
          backgroundColor={descriptionBackgroundColor}
          defaultBackgroundColor={'#0000000'}
          show={descriptionHover}
        />
      </SectionDescriptionHoverContainer>
    </SectionWrapper>
  );
};

NewsLetterSection.propTypes = {
  newsLetter: Proptypes.any,
  setNewsLetter: Proptypes.func,
  setPreviousState: Proptypes.func,
  rowId: Proptypes.func,
  title: Proptypes.string,
  description: Proptypes.string,
  data: Proptypes.object,
};
export default NewsLetterSection;
