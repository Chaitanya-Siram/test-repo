import styled from 'styled-components';

export const MainWrp = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const TabTitle = styled.h3`
  font-family: Inter;
  color: #161a34;
  font-size: 0.9375rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.75rem;
  /* margin-left: 0.8rem; */
  line-height: 1.125rem;
  letter-spacing: -0.3px;
`;

export const TabSectionWrp = styled.div`
  height: calc(100% - 1.625rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.938rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
`;

export const TabSection = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem 0rem;
  border-bottom: 1px solid #e8e8e8;
  text-decoration: none;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    /* width: 2.5px; */
    /* background: var(--primary-8676-ff, #675ef2); */
    display: none;
  }

  &:hover {
    /* background: linear-gradient(
        0deg,
        var(--primary-10, rgba(103, 94, 242, 0.1)) 0%,
        var(--primary-10, rgba(103, 94, 242, 0.1)) 100%
      ),
      #fff; */
    cursor: pointer;

    &::before,
    &::after {
      display: block;
    }

    > div > p {
      color: ${({ theme }) => theme.primary};
    }

    > div > div {
      color: ${({ theme }) => theme.primary};
    }
    > div > div > span {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const TabsWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.188rem;
  width: 100%;
`;
export const TimeText = styled.div`
  font-size: 0.6875rem;
  color: #585858;
  padding-top: 0.35rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LabelText = styled.p`
  font-style: normal;
  font-size: 0.875rem;
  margin: 0;
  color: #000000;
  font-family: Inter;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.28px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const SubTextWrp = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 0.875rem;
  color: #555555;
  margin: 0;
`;

export const BoldText = styled.span`
  font-size: 0.8125rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.26px;
  color: #585858;
`;

export const ChipText = styled.div`
  width: 100%;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.65rem;
  color: white;
  background-color: ${({ bgcolor }) => bgcolor};
`;
