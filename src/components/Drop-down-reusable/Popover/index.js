import React, { useState } from 'react';
import {
  DropdownCont,
  DropdownItems,
  DropdownDescription,
  DropdownItemsWrapper,
  ItemWrapper,
  ItemTextWrap,
  ItemSubText,
  SubListWrap,
  DropdownHeaderWrapper,
  DropdownHeaderCloseIcon,
  ItemLeftContent,
  ItemArrowWrapper,
} from './index.sc';
import Close from '../../../assets/icons/Close';
import Arrow from '../../../assets/icons/Arrow';
import CustomListItems from '../CustomListItems';
import { useSelector } from 'react-redux';
import { theme } from '../../../constants/theme';
import PropTypes from 'prop-types';
const Popover = ({
  childNavigation,
  navigation,
  dropdownArray,
  setShowCustomComponent,
  closeButton = true,
}) => {
  const [expandChild, setExpandChild] = useState(false);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <DropdownCont style={{}} className="dropdownCont">
      <DropdownHeaderWrapper>
        <DropdownDescription>
          <h4>Create Dashboard</h4>
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit consectetur
            adipisicing elit.
          </p> */}
        </DropdownDescription>
        {closeButton && (
          <DropdownHeaderCloseIcon
            onClick={() => setShowCustomComponent?.(false)}
          >
            <Close color="#656B8A" />
          </DropdownHeaderCloseIcon>
        )}
      </DropdownHeaderWrapper>
      <DropdownItemsWrapper>
        {dropdownArray.map((option, index) => {
          if (option.value === 'advanced' && option.children) {
            // Render the custom-styled list item component for the 'Advanced' option
            return (
              <DropdownItems
                key={index}
                onClick={() => {
                  setExpandChild(expandChild === index ? false : index);
                }}
                expanded={expandChild === index}
              >
                <ItemWrapper>
                  <ItemLeftContent>
                    <img src={option.icon} alt="" />
                    <ItemTextWrap>
                      {option.label}
                      <ItemSubText>{option.subText}</ItemSubText>
                    </ItemTextWrap>
                  </ItemLeftContent>
                  <ItemArrowWrapper>
                    <Arrow
                      fill={theme[selectedTheme].primary}
                      isOpen={expandChild === index}
                      size="13px"
                    />
                  </ItemArrowWrapper>
                </ItemWrapper>
                {expandChild === index && (
                  <SubListWrap>
                    {option.children.map((children, childrenIndex) => (
                      <CustomListItems
                        key={childrenIndex}
                        label={children.label}
                        onClick={() => {
                          childNavigation(children.path || children.value);
                          setShowCustomComponent?.(false);
                        }}
                      />
                    ))}
                  </SubListWrap>
                )}
              </DropdownItems>

              /* Render the children options using the custom list item component */
            );
          } else {
            // Render regular list item components for other options
            return (
              <DropdownItems
                key={index}
                onClick={() => {
                  setShowCustomComponent?.(false);
                  navigation(option.path || option.value);
                }}
              >
                <ItemWrapper>
                  <ItemLeftContent>
                    <img src={option.icon} alt="" />
                    <ItemTextWrap>
                      {option.label}
                      <ItemSubText>{option.subText}</ItemSubText>
                    </ItemTextWrap>
                  </ItemLeftContent>
                </ItemWrapper>
              </DropdownItems>
            );
          }
        })}
      </DropdownItemsWrapper>
    </DropdownCont>
  );
};

Popover.propTypes = {
  navigation: PropTypes.func,
  childNavigation: PropTypes.func,
  dropdownArray: PropTypes.array,
  setShowCustomComponent: PropTypes.func,
  closeButton: PropTypes.bool,
};

export default Popover;
