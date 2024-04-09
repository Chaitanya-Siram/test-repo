import styled, { css } from 'styled-components';

export const DashboardListwpr = styled.div`
  min-width: 23%;
  width: 23%;
  height: fit-content;
  overflow: hidden;
  border-radius: 0px 0px 0.625rem 0.625rem;
  background: ${({ theme }) => theme.secondaryBackground};
  position: relative;
  height: 100%;
  border-radius: 10px 10px 0px 0px;
`;
export const InputSearchBar = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  width: 100%;
  margin-right: 1rem;
`;
export const Dropdownfildwpr = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  & > span {
    width: 100%;
    font-size: 0.94rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
    margin-left: 0.25rem;
  }
  padding: 1rem 1.25rem;
  border: 1px solid #c3c7d9;
  border-width: 0 0 1px 0;
`;
export const CloseWrp = styled.div`
  cursor: pointer;
  margin: 0.2rem 0.2rem 0 0;
`;
export const RightWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.3rem;
  cursor: pointer;
`;
export const ListBoxwpr = styled.div`
  height: 100%;
  padding-bottom: 3rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const SeeMoreWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  height: 3rem;
  background: #fff;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  border-top: 1px solid rgb(195, 199, 217);
  line-height: 1.125rem;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.primary};
`;
export const ItemComponentwpr = styled.div`
  width: 100%;
  display: flex;
  height: 5rem;
  justify-content: space-between;
  background: ${({ theme, active }) =>
    active ? 'rgba(103, 94, 242, 0.1)' : theme.background};
  padding: 1.25rem;
  /* border-right: ${({ theme, active }) =>
    active ? 'rgba(103, 94, 242, 0.1)' : theme.background}; */
  ${({ active }) =>
    active &&
    css`
      border-radius: var(--corner-0-px, 0px);
      border-right: 3px solid var(--primary-8676-ff, #675ef2);
      background: linear-gradient(
          0deg,
          var(--primary-10, rgba(103, 94, 242, 0.1)) 0%,
          var(--primary-10, rgba(103, 94, 242, 0.1)) 100%
        ),
        #fff;
    `}
  /* bottom border */
  box-shadow: 0px 1px 0px 0px #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  /* border-width: 0 0 1px 0; */
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const TextBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  & div {
    ${({ active }) => active && `color : ${({ theme }) => theme.secondaryText}`}
  }
`;
export const HeadingWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Titletxtwpr = styled.div`
  font-size: 1rem;
  color: ${({ theme, active }) =>
    active ? theme.primary : theme.secondaryText};
  display: inline-block;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.17px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
export const ChipText = styled.div`
  padding: 0.2rem 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.65rem;
  color: white;
  background-color: ${({ bgcolor }) => bgcolor};
`;

export const Labeltxtwpr = styled.div`
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  color: ${({ theme, active }) =>
    active ? theme.primary : theme.secondaryText};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.24px;
`;

export const Contentwpr = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  width: 100%;
`;

export const Typetxtwpr = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme, active }) =>
    active ? theme.primary : theme.secondaryText};
  display: flex;
  align-items: center;
  /* min-width: fit-content; */
  font-family: Inter;
  font-style: normal;
  line-height: 1rem;
  letter-spacing: -0.24px;
`;

export const BookIconwpr = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
`;
