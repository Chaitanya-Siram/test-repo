import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
  NewsLetterTextItemInput,
  NewsLetterTextItemdescription,
  // TextContent,
  TextContentWrp,
  // TextHeading,
} from './index.sc';
import Proptypes from 'prop-types';

const TextItem = ({
  title,
  description,
  editMode,
  activeElement,
  handleElementClick,
  handleBlur,
  setNewsLetter,
  rowId,
  newsLetter,
  setPreviousState,
  data,
}) => {
  const textAreaTitleBox = useRef(null);
  const textAreaDesBox = useRef(null);
  const [textItemDetails, setTextItemDetails] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    setTextItemDetails((prevDetails) => ({
      ...prevDetails,
      title,
      description,
    }));
  }, [title, description]);

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
      updatedNewsLetter[rowIndex].columnComponent.componentData =
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

    const temp = { ...textItemDetails, [name]: value, order: rowId };
    updateComponentDataForRow(temp, rowId);
  };

  const calculateRows = (text, textareaWidth) => {
    // const lines = text?.split('\n')?.length;
    // return Math.max(lines, 1);
    const charactersPerLine = textareaWidth / 6; // Adjust this value based on your font size and layout
    const linesFromNewLines = text?.split('\n')?.length;
    const linesFromContinuedText = Math.ceil(text?.length / charactersPerLine);
    return Math.max(linesFromNewLines, linesFromContinuedText, 1);
  };

  return (
    <TextContentWrp id={data?.uniqueId}>
      {/* {editMode && activeElement === `text-title-${rowId}` ? ( */}
      <NewsLetterTextItemInput
        name="title"
        ref={textAreaTitleBox}
        value={textItemDetails.title}
        placeholder={`Section ${rowId + 1}`}
        onChange={(e) => changeTextDetails(e, rowId)}
        onBlur={handleBlur}
        autoFocus
        rows={calculateRows(textItemDetails.title, 300)}
      />
      {/* ) : (
        <TextHeading
          onClick={() => {
            handleElementClick(`text-title-${rowId}`);
          }}
        >
          {textItemDetails.title}
        </TextHeading>
      )} */}
      {/* {editMode && activeElement === `text-desc-${rowId}` ? ( */}
      <NewsLetterTextItemdescription
        name="description"
        ref={textAreaDesBox}
        value={textItemDetails.description}
        placeholder="Section Description"
        onChange={(e) => changeTextDetails(e, rowId)}
        onBlur={handleBlur}
        autoFocus
        rows={calculateRows(textItemDetails.description, 300)}
      ></NewsLetterTextItemdescription>
      {/* ) : (
        <TextContent
          onClick={() => {
            handleElementClick(`text-desc-${rowId}`);
          }}
        >
          {textItemDetails.description}
        </TextContent>
      )} */}
      {/* <BackToTop /> */}
    </TextContentWrp>
  );
};

TextItem.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  editMode: Proptypes.bool,
  activeElement: Proptypes.string,
  handleElementClick: Proptypes.func,
  handleBlur: Proptypes.func,
  setNewsLetter: Proptypes.func,
  rowId: Proptypes.number,
  newsLetter: Proptypes.any,
  setPreviousState: Proptypes.func,
  data: Proptypes.any,
};

export default TextItem;
