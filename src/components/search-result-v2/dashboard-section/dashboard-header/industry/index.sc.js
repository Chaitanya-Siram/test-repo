import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  width: 100%;
  height: max-content;
  background-color: ${({ theme }) => theme.background};
  padding-top: 1rem;
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
  flex-shrink: 0;
  border-radius: 0.3125rem;
  opacity: 0.5;
  background: #eceff3;
`;
