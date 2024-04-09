import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddLibrary from '../../../../assets/icons/AddLibrary';

const AddKeyword = ({ handleSendKeyword }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && value) {
      handleSendKeyword && handleSendKeyword(value);
      setEditing(false);
      setValue('');
    }
  };

  const handleBlur = () => {
    if (value) {
      handleSendKeyword && handleSendKeyword(value);
    }
    setEditing(false);
    setValue('');
  };

  const handleAddClick = () => {
    setEditing(true);
  };

  return (
    <KeywordItem onClick={handleAddClick}>
      <AddLibrary />
      <AddWordWrp className={editing ? 'editing' : ''}>
        {editing ? (
          <InputWrp>
            <KeywordValueInput
              className="add"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              autoFocus
            />
          </InputWrp>
        ) : (
          <KeywordValue className="add">Add</KeywordValue>
        )}
      </AddWordWrp>
    </KeywordItem>
  );
};

export default AddKeyword;

AddKeyword.propTypes = {
  handleSendKeyword: PropTypes.func,
};

export const KeywordItem = styled.div`
  width: max-content;
  height: 2rem;
  padding: 0rem 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 0.3125rem;
  border: 1px solid#C3C7D9;
  background: ${({ theme }) => theme.background};
`;
export const InputWrp = styled.div`
  border-radius: 5px;
  background: #ffffff;
  /* border: 1px solid #d1d5dc; */
  /* padding: 0rem 0.75rem; */
  display: flex;
  align-items: center;
  width: 100%;
  height: 85%;
`;
export const KeywordValueInput = styled.input`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.85rem;
  width: 100%;
  height: 99%;
  color: #000000;
  border: none;
  outline: none;
  &::placeholder {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 1rem;
    color: #999999;
  }
`;
export const KeywordValue = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.01625rem;
  &.add {
    color: #999;
    font-weight: 500;
  }
`;
export const AddWordWrp = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  &.editing {
    width: 6rem;
  }
`;
