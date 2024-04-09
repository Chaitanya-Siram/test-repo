import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AddContentContainer,
  AddContentWrp,
  AddItemContainer,
  AddText,
  ComponentWrapper,
  ItemContainer,
  KeywordWrap,
  KeywordItem,
  KeywordValue,
  AddWordWrp,
  InputWrp,
  KeywordValueInput,
  MainContent,
  // SectionHeader,
  // SectionTitle,
} from './index.sc';
import { IconWrp } from '../index.sc';
import { Button } from '../../../../button';
import { theme } from '../../../../../constants/theme';
import { useSelector } from 'react-redux';
import Done from '../../../../../assets/icons/Done';
import AddKeyword from '../AddKeyword';
import Close from '../../../../../assets/icons/Close';

const Brand = ({
  tabKeywords,
  hideAnalyze,
  handleUpdates,
  handler,
  handleSubmit,
  hideCompetitionKeywords = false,
  hideBrandKeywords = false,
  maxBrandKeywords = 1,
  setStoringKeywords = () => { },
}) => {
  const brandKeywords = useMemo(
    () => tabKeywords?.brandKeywords || [],
    [tabKeywords]
  );
  const competitionKeywords = useMemo(
    () => tabKeywords?.competitionKeywords || [],
    [tabKeywords]
  );

  const [brandData, setBrandData] = useState(brandKeywords);
  const [competitionData, setCompetitionData] = useState(competitionKeywords);
  const [brandEditing, setBrandEditing] = useState(false);
  const [brandIndex, setBrandIndex] = useState(undefined);
  const [brandValue, setBrandValue] = useState('');
  const [saveKeyWord, setSaveKeyWord] = useState('');
  const [competitionEditing, setCompetitionEditing] = useState(false);
  const [competitionIndex, setCompetitionIndex] = useState(undefined);
  const [competitionValue, setCompetitionValue] = useState('');

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    setBrandData(brandKeywords);
    setCompetitionData(competitionKeywords);
    // setStoringKeywords({ brandKeywords, competitionKeywords });
  }, [brandKeywords, competitionKeywords]);

  // if no analyze button, handle changes and update a state in parent

  // const handleAddRemoveChart = () => {};
  function handleAnalyze() {
    handler({ brandData, competitionData });
    handleSubmit && handleSubmit({ brandData, competitionData });
  }

  const handleReceiveBrandKeyword = (data) => {
    const finalData = [...brandData, data];
    setBrandData(finalData);
    handleUpdates && handleUpdates?.({ brandData: finalData, competitionData });
  };

  const handleReceiveCompetitionKeyword = (data) => {
    const finalData = [...competitionData, data];
    setCompetitionData(finalData);
    handleUpdates && handleUpdates?.({ brandData, competitionData: finalData });
  };

  const handleRemoveKeyword = (item, idx) => {
    let updatedArray = [];
    if (item === 'brand') {
      updatedArray = [...brandData].filter((ele, i) => i !== idx);
      setBrandData(updatedArray);
      handleUpdates &&
        handleUpdates?.({ brandData: updatedArray, competitionData });
    } else {
      updatedArray = [...competitionData].filter((ele, i) => i !== idx);
      setCompetitionData(updatedArray);
      handleUpdates &&
        handleUpdates?.({ brandData, competitionData: updatedArray });
    }
  };

  const disabledStyle = {
    background: '#C3C7D9',
    color: theme[selectedTheme].logoText,
    cursor: 'not-allowed',
  };
  const [hoverDataComp, setHoverDataComp] = useState();
  const [hoverDataBrand, setHoverDataBrand] = useState();

  const handleShowCloseIconComp = (item, i) => {
    setHoverDataComp(i + item);
  };
  const handleHideCloseIconComp = () => {
    setHoverDataComp();
  };
  const handleShowCloseIconBrand = (item, i) => {
    setHoverDataBrand(i + item);
  };
  const handleHideCloseIconBrand = () => {
    setHoverDataBrand();
  };

  const handleEditClick = (item, index, isEditCheck, saveKeyWordText) => {
    if (saveKeyWordText === 'brand') {
      setBrandEditing(!isEditCheck);
      setBrandIndex(index);
      setBrandValue(item);
    } else if (saveKeyWordText === 'competition') {
      setCompetitionEditing(!isEditCheck);
      setCompetitionIndex(index);
      setCompetitionValue(item);
    }
    setSaveKeyWord(saveKeyWordText);
  };

  const changeHandler = (e) => {
    if (e.target.name === 'brand') {
      setBrandValue(e.target.value);
    } else if (e.target.name === 'competition') {
      setCompetitionValue(e.target.value);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && brandValue && saveKeyWord === 'brand') {
      const updatedBrandData = brandData?.map((item, ind) => {
        if (ind === index) {
          item = brandValue;
        } else {
          return item;
        }
        return item;
      });
      setBrandData(updatedBrandData);
      setBrandEditing(false);
      setStoringKeywords((prev) => {
        return [updatedBrandData, prev];
      });
      handleUpdates &&
        handleUpdates?.({ brandData: updatedBrandData, competitionData });
    } else if (
      event.key === 'Enter' &&
      competitionValue &&
      saveKeyWord === 'competition'
    ) {
      const updatedCompetitionData = competitionData?.map((item, ind) => {
        if (ind === index) {
          item = competitionValue;
        } else {
          return item;
        }
        return item;
      });
      setCompetitionData(updatedCompetitionData);
      setCompetitionEditing(false);
      setStoringKeywords((prev) => {
        return [updatedCompetitionData, prev];
      });
      handleUpdates &&
        handleUpdates?.({ brandData, competitionData: updatedCompetitionData });
    }
  };

  const handleBlur = (event, index) => {
    event.key = 'Enter';
    if (saveKeyWord === 'brand') {
      handleKeyDown(event, index);
      setBrandEditing(false);
      setBrandValue('');
    } else if (saveKeyWord === 'competition') {
      handleKeyDown(event, index);
      setCompetitionEditing(false);
      setCompetitionValue('');
    }
  };

  return (
    <ComponentWrapper>
      {/* <SectionHeader>
        <SectionTitle>Brand & Competitive Dashboard</SectionTitle>
        <Button
          title="Add/Remove Charts"
          backgroundColor={theme[selectedTheme].background}
          color={theme[selectedTheme].primary}
          border={`1px solid ${theme[selectedTheme].primary}`}
          onClick={handleAddRemoveChart}
          btnStyle={{ borderRadius: '0.5rem' }}
          //   icon={<AddRemoveChart width="1rem" height="1rem" />}
        />
      </SectionHeader> */}
      <MainContent>
        <ItemContainer>
          <AddContentWrp style={{ width: hideAnalyze && '100%' }}>
            {!hideBrandKeywords && (
              <AddContentContainer>
                <AddText>Brand Keywords</AddText>
                <AddItemContainer>
                  {brandData.map((item, i) => (
                    <KeywordWrap key={i}>
                      {!(brandEditing && i === brandIndex) ? (
                        <KeywordItem
                          key={i}
                          onMouseEnter={() => handleShowCloseIconBrand(item, i)}
                          onMouseLeave={() => handleHideCloseIconBrand(item, i)}
                        >
                          <KeywordValue
                            onClick={() =>
                              handleEditClick(item, i, brandEditing, 'brand')
                            }
                          >
                            {item}
                          </KeywordValue>
                          {hoverDataBrand === i + item ? (
                            <IconWrp
                              onClick={() => handleRemoveKeyword('brand', i)}
                            >
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
                                handleEditClick(item, i, brandEditing, 'brand')
                              }
                            >
                              <KeywordValueInput
                                className="add"
                                name="brand"
                                autoFocus
                                value={brandValue}
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
                  {brandData?.length <= maxBrandKeywords - 1 && (
                    <AddKeyword
                      coachMarkId='coach-brand-keywords-wrp'
                      handleSendKeyword={handleReceiveBrandKeyword}
                      isDisabled={brandData?.length >= maxBrandKeywords}
                    />
                  )}
                </AddItemContainer>
              </AddContentContainer>
            )}
            {!hideCompetitionKeywords && (
              <AddContentContainer>
                <AddText>Competition Keywords</AddText>
                <AddItemContainer>
                  {competitionData.map((item, i) => (
                    <KeywordWrap key={i}>
                      {!(competitionEditing && i === competitionIndex) ? (
                        <KeywordItem
                          key={i}
                          onMouseEnter={() => handleShowCloseIconComp(item, i)}
                          onMouseLeave={() => handleHideCloseIconComp(item, i)}
                        >
                          <KeywordValue
                            onClick={() =>
                              handleEditClick(
                                item,
                                i,
                                competitionEditing,
                                'competition'
                              )
                            }
                          >
                            {item}
                          </KeywordValue>
                          {hoverDataComp === i + item ? (
                            <IconWrp
                              onClick={() =>
                                handleRemoveKeyword('competition', i)
                              }
                            >
                              <Close
                                color={theme[selectedTheme].primary}
                                width="14px"
                                height="14px"
                              />
                            </IconWrp>
                          ) : (
                            <IconWrp>
                              <Done width="14px" height="14px" />
                            </IconWrp>
                          )}
                        </KeywordItem>
                      ) : (
                        <KeywordItem>
                          <AddWordWrp>
                            <InputWrp
                              onClick={() =>
                                handleEditClick(
                                  item,
                                  i,
                                  competitionEditing,
                                  'competition'
                                )
                              }
                            >
                              <KeywordValueInput
                                className="add"
                                name="competition"
                                autoFocus
                                value={competitionValue}
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
                  {competitionData?.length < 5 && (
                    <AddKeyword
                      coachMarkId='coach-competition-keywords-wrp'
                      handleSendKeyword={handleReceiveCompetitionKeyword}
                      isDisabled={competitionData?.length >= 5}
                    />
                  )}
                </AddItemContainer>
              </AddContentContainer>
            )}
          </AddContentWrp>
          {!hideAnalyze && (
            <Button
              coachMarkId='coach-brand-competition-analyze-wrp'
              title={'Analyze'}
              backgroundColor={theme[selectedTheme].primary}
              onClick={handleAnalyze}
              disable={brandData.length === 0}
              disableStyle={disabledStyle}
              btnStyle={{ width: '6rem', height: '2.7rem' }}
            />
          )}
        </ItemContainer>
      </MainContent>
    </ComponentWrapper>
  );
};

export default Brand;

Brand.propTypes = {
  tabKeywords: PropTypes.any,
  hideAnalyze: PropTypes.bool,
  handleUpdates: PropTypes.func,
  handler: PropTypes.func,
  handleSubmit: PropTypes.func,
  hideCompetitionKeywords: PropTypes.bool,
  hideBrandKeywords: PropTypes.bool,
  maxBrandKeywords: PropTypes.number,
  setStoringKeywords: PropTypes.func,
};
