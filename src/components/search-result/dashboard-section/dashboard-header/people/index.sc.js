import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  width: 100%;
  height: 7.3rem;
  background-color: ${({ theme }) => theme.background};
  padding: 1rem 1.76rem;
`;
export const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.14rem;
`;
export const SectionTitle = styled.div`
  color: ${({ theme }) => theme.darkText};
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.01063rem;
`;
export const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 0.63rem;
`;
export const AddContentWrp = styled.div`
  width: calc(100% - 6.6rem);
  display: flex;
  align-items: center;
  gap: 0.63rem;
`;
export const AddContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.69rem;
`;
export const AddText = styled.div`
  color: ${({ theme }) => theme.darkText};
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
`;
export const AddItemContainer = styled.div`
  width: 100%;
  height: 2.75rem;
  padding: 0.37rem 0.33rem;
  display: flex;
  align-items: center;
  gap: 0.31rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: rgb(236, 239, 243, 0.7);
`;
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
