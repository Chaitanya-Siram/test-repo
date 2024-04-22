import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AddContentContainer,
  AddContentWrp,
  AddItemContainer,
  AddText,
  ComponentWrapper,
  ItemContainer,
  KeywordItem,
  KeywordValue,
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
  const { tabKeywords = [] } = props;
  const [peopleData, setPeopleData] = useState(tabKeywords);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    setPeopleData(tabKeywords);
  }, [tabKeywords]);

  const handleAnalyze = () => {};
  const handleReceiveKeyword = (data) => {
    const finalData = [...peopleData, data];
    setPeopleData(finalData);
  };

  const handleRemoveKeyword = (idx) => {
    const updatedArray = [...peopleData].filter((ele, i) => i !== idx);
    setPeopleData(updatedArray);
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

  return (
    <ComponentWrapper>
      <MainContent>
        <ItemContainer>
          <AddContentWrp>
            <AddContentContainer>
              <AddText>Add Person Name</AddText>
              <AddItemContainer>
                {peopleData.map((item, i) => (
                  <KeywordItem key={i}>
                    <KeywordValue>{item}</KeywordValue>
                    <Done />
                    <IconWrp onClick={() => handleRemoveKeyword(i)}>
                      <Close
                        color={theme[selectedTheme].closeButton}
                        width="14"
                        height="14"
                      />
                    </IconWrp>
                  </KeywordItem>
                ))}
                <AddKeyword
                  coachMarkId="coach-people-keywords-wrp"
                  handleSendKeyword={handleReceiveKeyword}
                />
              </AddItemContainer>
            </AddContentContainer>
          </AddContentWrp>
          <Button
            coachMarkId="coach-people-analyze-wrp"
            title="Analyze"
            backgroundColor={theme[selectedTheme].primary}
            color={theme[selectedTheme].logoText}
            onClick={handleAnalyze}
            btnStyle={btnStyle}
            disable={peopleData.length === 0}
            disableStyle={disabledStyle}
          />
        </ItemContainer>
      </MainContent>
    </ComponentWrapper>
  );
};

export default People;

People.propTypes = {
  tabKeywords: PropTypes.array,
};

People.defaultProps = {
  tabKeywords: [],
};
