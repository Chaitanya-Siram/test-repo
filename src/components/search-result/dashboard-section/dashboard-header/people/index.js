import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AddContentContainer,
  AddContentWrp,
  AddItemContainer,
  KeywordWrap,
  AddText,
  ComponentWrapper,
  ItemContainer,
  KeywordItem,
  KeywordValue,
  AddWordWrp,
  InputWrp,
  KeywordValueInput,
  MainContent,
} from '../brand/index.sc';

import { Button } from '../../../../button';
import { theme } from '../../../../../constants/theme';
import { useSelector } from 'react-redux';
import Done from '../../../../../assets/icons/Done';
import AddKeyword from '../AddKeyword';
import Close from '../../../../../assets/icons/Close';
import { IconWrp } from '../index.sc';

const People = (props) => {
  const {
    tabKeywords,
    handlePeople,
    hideAnalyze,
    handler,
    handleSubmit,
    handleUpdates,
    setStoringKeywords = () => {},
  } = props;
  const [peopleData, setPeopleData] = useState(
    tabKeywords?.peopleKeywords || []
  );
  const [personEditing, setPersonEditing] = useState(false);
  const [personIndex, setPersonIndex] = useState(undefined);
  const [personValue, setPersonValue] = useState('');
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    setPeopleData(tabKeywords?.peopleKeywords || []);
    // setStoringKeywords(tabKeywords?.peopleKeywords || []);
  }, [tabKeywords?.peopleKeywords]);

  const handleAnalyze = () => {
    handler(peopleData);
    handleSubmit &&
      handleSubmit({
        peopleData,
      });
  };
  const handleReceiveKeyword = (data) => {
    const finalData = [...peopleData, data];
    setPeopleData(finalData);
    handlePeople && handlePeople?.({ peopleData: finalData });
    handleUpdates && handleUpdates?.({ peopleData: finalData });
  };

  const handleRemoveKeyword = (idx) => {
    const updatedArray = [...peopleData].filter((ele, i) => i !== idx);
    setPeopleData(updatedArray);
    handlePeople && handlePeople?.({ peopleData: updatedArray });
    handleUpdates && handleUpdates?.({ peopleData: updatedArray });
  };

  const btnStyle = {
    width: '6.6rem',
    height: '2.75rem',
    borderRadius: '0.313rem',
  };

  const disabledStyle = {
    background: '#C3C7D9',
    color: theme[selectedTheme].logoText,
    cursor: 'not-allowed',
  };
  const [hoverData, setHoverData] = useState();
  const handleShowCloseIcon = (item, i) => {
    setHoverData(i + item);
  };
  const handleHideCloseIcon = () => {
    setHoverData();
  };

  const handleEditClick = (item, index, isEditCheck) => {
    setPersonEditing(!isEditCheck);
    setPersonIndex(index);
    setPersonValue(item);
  };

  const changeHandler = (e) => {
    setPersonValue(e.target.value);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && personValue) {
      const updatedPeopleData = peopleData?.map((item, ind) => {
        if (ind === index) {
          item = personValue;
        } else {
          return item;
        }

        return item;
      });
      setPeopleData(updatedPeopleData);
      setStoringKeywords(updatedPeopleData);
      setPersonEditing(false);
      handlePeople && handlePeople?.({ peopleData: updatedPeopleData });
      handleUpdates && handleUpdates?.({ peopleData: updatedPeopleData });
    }
  };

  const handleBlur = (event, index) => {
    event.key = 'Enter';
    handleKeyDown(event, index);
    setPersonEditing(false);
    setPersonValue('');
  };
  return (
    <ComponentWrapper>
      <MainContent>
        <ItemContainer>
          <AddContentWrp style={{ width: hideAnalyze && '100%' }}>
            <AddContentContainer>
              <AddText>Add Person Name</AddText>
              <AddItemContainer>
                {peopleData?.map((item, i) => (
                  <KeywordWrap key={i}>
                    {!(personEditing && i === personIndex) ? (
                      <KeywordItem
                        key={i}
                        onMouseEnter={() => handleShowCloseIcon(item, i)}
                        onMouseLeave={() => handleHideCloseIcon(item, i)}
                      >
                        <KeywordValue
                          onClick={() =>
                            handleEditClick(item, i, personEditing)
                          }
                        >
                          {item}
                        </KeywordValue>
                        {hoverData === i + item ? (
                          <IconWrp onClick={() => handleRemoveKeyword(i)}>
                            <Close
                              color={theme[selectedTheme].primary}
                              width="14"
                              height="14"
                            />
                          </IconWrp>
                        ) : (
                          <IconWrp>
                            <Done />
                          </IconWrp>
                        )}
                      </KeywordItem>
                    ) : (
                      <KeywordItem>
                        <AddWordWrp>
                          <InputWrp
                            onClick={() =>
                              handleEditClick(item, i, personEditing)
                            }
                          >
                            <KeywordValueInput
                              className="add"
                              name="person"
                              autoFocus
                              value={personValue}
                              onChange={changeHandler}
                              onKeyDown={(e) => handleKeyDown(e, i)}
                              onBlur={(e) => handleBlur(e, i)}
                            />
                          </InputWrp>
                        </AddWordWrp>
                      </KeywordItem>
                    )}
                  </KeywordWrap>
                ))}
                {peopleData?.length < 1 && (
                  <AddKeyword
                    coachMarkId="coach-people-keywords-wrp"
                    handleSendKeyword={handleReceiveKeyword}
                  />
                )}
              </AddItemContainer>
            </AddContentContainer>
          </AddContentWrp>
          {!hideAnalyze && (
            <Button
              coachMarkId="coach-people-analyze-wrp"
              title="Analyze"
              backgroundColor={theme[selectedTheme].primary}
              color={theme[selectedTheme].logoText}
              onClick={handleAnalyze}
              btnStyle={btnStyle}
              disable={peopleData?.length === 0}
              disableStyle={disabledStyle}
            />
          )}
        </ItemContainer>
      </MainContent>
    </ComponentWrapper>
  );
};

export default People;

People.propTypes = {
  tabKeywords: PropTypes.object,
  handlePeople: PropTypes.func,
  hideAnalyze: PropTypes.bool,
  handler: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleUpdates: PropTypes.func,
  setStoringKeywords: PropTypes.func,
};

People.defaultProps = {
  tabKeywords: [],
};
