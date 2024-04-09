import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import SearchIcon from '../search-component/assets/icons/SearchIcon.js';
import {
  // IconCon,
  // IconWrapper,
  SearchInputContainer,
  SearchWrapper,
} from './index.sc.js';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Import a Prism.js theme CSS
import './CustomLanguageDefinition.js'; // Import your custom language definition
import './CustomLanguageCss.css'; // Import your custom CSS styles
// import ClearIcon from '../search-component/assets/icons/Clear.js';
function SearchComponent(props) {
  const {
    value,
    placeholder = 'Search Keywords, multiple keywords or query',
    onChange,
    // onClick,
    onFocus,
    // chip = false,
    isFocused = false,
  } = props;

  // const [searchValues, setSearchValues] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isIconContainerHovered, setIsIconContainerHovered] = useState(false);

  // const handleKeyDown = (e) => {
  //   if (e?.key === 'Enter') {
  //     const returnValue = e.target.value;
  //     if (!returnValue) return;
  //     if (chip) {
  //       setSearchValues((old) => [...old, returnValue]);
  //       onClick && onClick(e.target.name, [...searchValues, returnValue]);
  //     } else {
  //       onClick && onClick(e.target.name, returnValue);
  //     }
  //   }
  // };

  // const handleButtonClick = (e) => {
  //   if (inputRef) {
  //     const returnValue = inputRef.current.value;
  //     if (chip) {
  //       setSearchValues((old) => [...old, returnValue]);
  //       onClick &&
  //         onClick(inputRef.current.name, [...searchValues, returnValue]);
  //     } else {
  //       onClick && onClick(inputRef.current.name, returnValue);
  //     }
  //   }
  // };

  const handleChange = (event) => {
    onChange && onChange(event);
  };

  // const clearInput = () => {
  //   setFilteredData([]);
  //   onChange({ target: { name, value: '' } });
  // };

  const handleInputFocus = () => {
    onFocus && onFocus();
    setIsIconContainerHovered(true);
  };

  // const handleInputBlur = () => {
  //   onBlur && onBlur();
  //   // setIsIconContainerHovered(false);
  // };

  const handleIconContainerMouseEnter = () => {
    setIsIconContainerHovered(true);
  };

  const handleIconContainerMouseLeave = () => {
    if (!isFocused) {
      setIsIconContainerHovered(false);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setIsIconContainerHovered(false);
    } else {
      setIsIconContainerHovered(true);
    }
  }, [isFocused]);

  return (
    <SearchWrapper>
      <SearchInputContainer
        onMouseEnter={handleIconContainerMouseEnter}
        onMouseLeave={handleIconContainerMouseLeave}
      >
        {/* <InputSearch
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          isHovered={isIconContainerHovered}
          isFocused={isFocused}
          className={`${disabled ? 'disabled' : ''}`}
          disabled={disabled}
        /> */}
        <Editor
          value={value}
          onValueChange={(code) => {
            handleChange({
              target: {
                value: code,
              },
            });
          }}
          placeholder={placeholder}
          highlight={(code) => highlight(code, languages.customLanguage)}
          padding={10}
          style={{
            fontSize: '0.9375rem',
            width: '100%',
          }}
          onClick={handleInputFocus}
          // onFocus={handleInputFocus}
          textareaClassName="text-area-class"
          preClassName="pre-area-class"
        />
        {/* <IconCon isHovered={isIconContainerHovered}>
          <IconWrapper
            onClick={clearInput}
            className={`clear-icon ${value ? 'active' : 'hidden'}`}
          >
            <ClearIcon strokeColor="#999999" width="14" height="14" />
          </IconWrapper>
           <IconWrapper
            className="search-icon"
            onClick={(e) => handleButtonClick(e)}
          >
            <SearchIcon strokeColor="#999999" width="22" height="22" />
          </IconWrapper>
        </IconCon> */}
      </SearchInputContainer>
    </SearchWrapper>
  );
}

export default SearchComponent;

// Define prop types for InputComponent
SearchComponent.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  // onClick: PropTypes.func,
  // chip: PropTypes.bool,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool,
};
