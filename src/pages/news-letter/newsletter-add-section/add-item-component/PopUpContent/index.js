import React, { useState } from 'react';
import {
  ButtonsContainer,
  ContentHeaderDescp,
  ContentHeaderTitle,
  ContentHeaderWrp,
  ContentPopWrp,
  OptImgWrp,
  OptionBtns,
  OptionBtnsWrp,
  OptionImg,
} from './index.sc';
import Proptypes from 'prop-types';

import templateOne from '../../../../../assets/img/template 1.png';
import templateTwo from '../../../../../assets/img/template 2.png';
import templateThree from '../../../../../assets/img/template 3.png';
import { Button } from '../../../../../components/button';
import { useSelector } from 'react-redux';
import { theme } from '../../../../../constants/theme';

const SeletTempPopUpContent = ({ cancelToggler, applyTemplate }) => {
  const buttonValues = [
    {
      id: 1,
      name: 'Option 1',
      imageUrl: templateOne,
      config: {
        titleColor: '#000000',
        descriptionColor: '#000000',
        backgroundColor: '#FFFFFF',
        dateColor: '#000000',
      },
    },
    {
      id: 2,
      name: 'Option 2',
      imageUrl: templateTwo,
      config: {
        titleColor: '#FFFFFF',
        descriptionColor: '#FFFFFF',
        backgroundColor: '#5F39F8',
        dateColor: '#FFFFFF',
      },
    },
    {
      id: 3,
      name: 'Option 3',
      imageUrl: templateThree,
      config: {
        titleColor: '#FFFFFF',
        descriptionColor: '#FFFFFF',
        backgroundColor: '#000000',
        imageUrl:
          'https://article-download-bucket.s3.amazonaws.com/uploads_images/background_768e0706-000e-47d0-90df-fd0cf01e0838_20240220075337.png?AWSAccessKeyId=AKIA56EJC52LQ4XMPKWP&Signature=QAzU44szTfUA4tsnyS5vRq7wnhE%3D&Expires=1739951617',
        dateColor: '#FFFFFF',
      },
    },
  ];

  const [selectedOption, setSelectedOption] = useState(buttonValues[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleToggle = () => {
    cancelToggler(false);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <ContentPopWrp>
      <div>
        <ContentHeaderWrp>
          <ContentHeaderTitle>Select Template</ContentHeaderTitle>
          <ContentHeaderDescp>
            Choose a preset template to start with.
          </ContentHeaderDescp>
        </ContentHeaderWrp>

        <OptImgWrp>
          <OptionBtnsWrp>
            {buttonValues.map((value, index) => (
              <OptionBtns
                key={value?.name}
                onClick={() => handleOptionClick(value)}
                isSelected={selectedOption?.id === value?.id}
              >
                {value?.name}
              </OptionBtns>
            ))}
          </OptionBtnsWrp>
          <OptionImg
            src={selectedOption?.imageUrl}
            alt="Image"
            isSelected={selectedOption?.id}
          />
        </OptImgWrp>
      </div>
      <ButtonsContainer>
        <Button
          title={'Cancel'}
          backgroundColor={theme[selectedTheme].background}
          color={theme[selectedTheme].primary}
          onClick={handleToggle}
          border={theme[selectedTheme].primary}
        />
        <Button
          title={'Apply'}
          backgroundColor={theme[selectedTheme].primary}
          onClick={() => applyTemplate(selectedOption)}
        />
      </ButtonsContainer>
    </ContentPopWrp>
  );
};

export default SeletTempPopUpContent;

SeletTempPopUpContent.propTypes = {
  cancelToggler: Proptypes.func,
  applyTemplate: Proptypes.func,
};
