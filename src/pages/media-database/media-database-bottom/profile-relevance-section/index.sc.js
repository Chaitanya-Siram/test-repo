import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  height: 1rem;
`;

export const TopBarWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TopbarLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const SelectAllSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
export const CheckBoxWrp = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const SelectAllText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  color: ${({ theme }) => theme.secondaryText};
`;

export const TextContent = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem; /* 125% */
  letter-spacing: -0.025rem;
  margin: 0;
  padding: 0;
`;

export const SortWrp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const RelevanceText = styled.p`
  color: ${({ theme }) => theme.closeButton};
  /* AMX_Style/Txt_13px_Medium */
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
`;

export const SortByText = styled.p`
  color: ${({ theme }) => theme.closeButton};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;
export const SortByOptionsText = styled.p`
  color: ${({ theme, selected }) =>
    selected ? theme.background : theme.darkText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  padding: 0.5rem 0.9rem;
  background: ${({ selected, theme }) =>
    selected ? theme.primary : theme.background};
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
  }
`;

export const DropDownWrp = styled.div`
  width: 10rem;
  position: absolute;
  right: 0;
  top: 2rem;
  background: ${({ theme }) => theme.background};
  z-index: 10;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  border-radius: var(--corner-5-px, 0.3125rem);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const BottomProfilesMainWrp = styled.div`
  width: 100%;
`;

export const Wrp = styled.div``;
