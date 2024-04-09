import React, { useEffect, useMemo, useState } from 'react';
import * as Styles from './index.sc';
import Brand from '../brand';
import People from '../people';
import PropTypes from 'prop-types';
import { Button } from '../../../../button';
import { useSelector } from 'react-redux';
import { theme } from '../../../../../constants/theme';

const Custom = ({
  tabKeywords,
  handler,
  handleSubmit,
  selectedItems,
  selectedChartsCountConfig,
  handleUpdates,
  setStoringKeywords = () => { },
}) => {
  const [keywordData, setKeywordData] = useState({
    brandData: [],
    competitionData: [],
    peopleData: [],
  });

  const handleBrand = (e) => {
    setKeywordData({ ...keywordData, ...e });
    handleUpdates && handleUpdates({ ...keywordData, ...e });
  };
  const handlePeople = (e) => {
    setKeywordData({ ...keywordData, ...e });
    handleUpdates && handleUpdates({ ...keywordData, ...e });
  };
  const handleAnalyze = () => {
    handler(keywordData);
    handleSubmit && handleSubmit(keywordData);
  };
  const brandKeywords = useMemo(
    () => tabKeywords?.brandKeywords || [],
    [tabKeywords?.brandKeywords]
  );
  const competitionKeywords = useMemo(
    () => tabKeywords?.competitionKeywords || [],
    [tabKeywords?.competitionKeywords]
  );
  const peopleKeywords = useMemo(
    () => tabKeywords?.peopleKeywords || [],
    [tabKeywords?.peopleKeywords]
  );
  useEffect(() => {
    setKeywordData({
      brandData: brandKeywords,
      competitionData: competitionKeywords,
      peopleData: peopleKeywords,
    });
    // setStoringKeywords({
    //   brandData: brandKeywords,
    //   competitionData: competitionKeywords,
    //   peopleData: peopleKeywords,
    // });
  }, [brandKeywords, competitionKeywords, peopleKeywords]);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
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

  return (
    <Styles.Wrapper>
      <Styles.InputRow>
        {selectedChartsCountConfig?.brand > 0 && (
          <Styles.BrandWrapper
            style={{
              width: selectedChartsCountConfig?.brand > 0 && '100%',
            }}
          >
            <Brand
              tabKeywords={{
                brandKeywords: keywordData?.brandData,
                competitionKeywords: keywordData?.competitionData,
              }}
              hideAnalyze={true}
              handleUpdates={handleBrand}
              hideBrandKeywords={!(selectedChartsCountConfig?.brand > 0)}
              hideCompetitionKeywords={
                !(selectedChartsCountConfig?.brandComp > 0)
              }
            ></Brand>
          </Styles.BrandWrapper>
        )}

        {selectedChartsCountConfig?.people > 0 && (
          <Styles.PeopleWrapper
            style={{
              width:
                selectedChartsCountConfig?.people > 0 &&
                !(selectedChartsCountConfig?.brandComp > 0) &&
                '100%',
            }}
          >
            <People
              handlePeople={handlePeople}
              hideAnalyze={true}
              tabKeywords={{ peopleKeywords: keywordData.peopleData }}
            ></People>
          </Styles.PeopleWrapper>
        )}
        <Styles.ButtonWrapper>
          {Object.keys(selectedChartsCountConfig)
            .filter((key) => key !== 'industry')
            .some((key) => selectedChartsCountConfig[key] > 0) && (
              <Button
                title="Analyze"
                coachMarkId='brand-competition-people-custom-analyze-wrp'
                backgroundColor={theme[selectedTheme].primary}
                color={theme[selectedTheme].logoText}
                onClick={handleAnalyze}
                btnStyle={btnStyle}
                disable={
                  (selectedChartsCountConfig.people > 0 &&
                    keywordData?.peopleData?.length === 0) ||
                  (selectedChartsCountConfig.brandComp > 0 &&
                    (keywordData.competitionData.length === 0 ||
                      keywordData.brandData.length === 0)) ||
                  (selectedChartsCountConfig.brandNotcomp > 0 &&
                    keywordData.brandData.length === 0)
                }
                disableStyle={disabledStyle}
              />
            )}
        </Styles.ButtonWrapper>
      </Styles.InputRow>
    </Styles.Wrapper>
  );
};

Custom.propTypes = {
  tabKeywords: PropTypes.object,
  handler: PropTypes.func,
  handleSubmit: PropTypes.func,
  selectedItems: PropTypes.func,
  selectedChartsCountConfig: PropTypes.object,
  handleUpdates: PropTypes.func,
  setStoringKeywords: PropTypes.func,
};

export default Custom;
