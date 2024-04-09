/* eslint-disable no-constant-condition */
import styled from 'styled-components';
export const MultiFilterContainer = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  gap: 0.5rem;
  padding: 0rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const AllWrp = styled.div`
  display: flex;
  width: ${({ index, addType }) =>
    (index === 0 || index === 1) && addType !== 'csv' ? '0' : '100%'};
  flex-wrap: wrap;
  flex-grow: ${({ index, addType }) =>
    (index === 0 || index === 1) && addType !== 'csv' ? '0.5' : '1'};
`;

export const SingleFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  margin-top: ${({ graph }) => (graph ? '1rem' : '0')};
  position: static;
`;
export const Label = styled.label`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #000000;
`;
export const SelectOptionComponent = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  border-radius: 0.375rem;
  border: none;
  background: #fff;
`;
export const DropdownOptionsList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 2.5rem;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  list-style-type: none;
  padding: 0;
  padding-top: 0.375rem;
  padding-bottom: 0.625rem;
  margin: 0;
  width: 100%;
  min-width: max-content;
  max-height: 14.5rem;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;
export const DropdownListItem = styled.li`
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.813rem;
`;
export const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.44rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const DropdownContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: 0.375rem;
  border: 1px solid #c3c7d9;
  height: 2.5rem;
  width: 100%;
`;
export const OptionTitle = styled.span`
  font-size: 0.813rem;
  line-height: 1rem;
`;

export const AlertMsg = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.0625rem;
  letter-spacing: -0.01em;
  text-align: left;
  color: #be3b93;
  padding: 0.25rem;
`;

export const OptWrp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const OptCheckBox = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
`;

export const CSVWrp = styled.div`
  width: 100%;
  height: 2.5rem;
  padding: 0.875rem;
  border-radius: ${({ theme }) => theme.primaryBorderRadius};
  border: 1px solid ${({ theme }) => theme.borders};
  gap: 0.625rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const CSVInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: fit-content;
`;

export const CSVLabel = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.0625rem;
  letter-spacing: -0.01em;
  text-align: center;
  color: #5f39f8;
  cursor: pointer;
`;

export const LinkWrp = styled.div`
  width: 100%;
  height: ${({ length }) => (length ? '25rem' : 'fit-content')};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.5rem;
  ::-webkit-scrollbar {
    width: 5px; /* Change width to adjust scrollbar thickness */
    height: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: #eee; /* Adjust background color to match your theme */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Adjust thumb color to match your theme */
    border-radius: 5px;
  }

  /* Hide scrollbar arrow buttons for a cleaner look */
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

export const LinkInput = styled.input`
  width: 100%;
  height: fit-content;
  padding: 0.875rem;
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  &:focus {
    outline: none;
  }
`;

export const LinkTextArea = styled.textarea`
  width: 100%;
  height: fit-content;
  padding: 0.875rem;
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  resize: none;
  overflow: 'scroll';
  &:focus {
    outline: none;
  }
`;

export const LinkSubmit = styled.button`
  padding: 14px;
  border-radius: 8px;
  border: 1px;
  background: linear-gradient(0deg, #e9e3ff, #e9e3ff),
    linear-gradient(0deg, #f4f1ff, #f4f1ff);
  border: 1px solid #e9e3ff;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #5f39f8;
  cursor: pointer;
`;

export const LinkMsg = styled.p`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.0625rem;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: -0.125rem;
`;

export const LinkDetailLabelFieldWrp = styled.div`
  width: 100%;
  height: fit-content;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  flex-grow: 0.5;
`;
export const LinkDetailSection = styled.div`
  width: 48%;
  height: fit-content;
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  flex-grow: 0.5;
`;

export const LinkDetailWrpFields = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LinkButtonWrp = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 5px; /* Change width to adjust scrollbar thickness */
    height: 2px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: #eee; /* Adjust background color to match your theme */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Adjust thumb color to match your theme */
    border-radius: 5px;
  }

  /* Hide scrollbar arrow buttons for a cleaner look */
  ::-webkit-scrollbar-button {
    display: none;
  }
`;
export const LinkButton = styled.button`
  width: 3rem;
  height: auto;
  padding: 0.725rem 1rem;
  margin-bottom: 0.725rem;
  border-radius: 0.4375rem;
  border: 1px;
  gap: 0.625rem;
  ${(props) =>
    props.active &&
    `
      background-color: #1c1b1f;
      color: #fff; 
    `}
`;

export const ImgWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ImgInput = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: 1px;
  gap: 0.675rem;
  border: 1px solid #e2e2e2;
`;

export const ErrorMessage = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.0625rem;
  letter-spacing: -0.01em;
  padding-bottom: 1rem;
  /* text-align: center; */
  color: #bf2b2b;
`;

export const TagWrp = styled.div`
  margin-bottom: 2rem;
`;

export const LimitInput = styled.input`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 0.813rem;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
