import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const WorkspaceContainer = styled.div`
  height: ${(props) => (props.full ? 'auto' : 'calc(50% - 0.5rem/2)')};
  /* width: ${(props) => (props.full ? '18rem' : '18.75rem')}; */
  width: 18.75rem;
  display: flex;
  box-sizing: border-box;
  padding: ${(props) =>
    !props.isWorkspace
      ? ''
      : props.full
      ? '1.25rem 1.25rem 0 1.25rem'
      : '1.25rem'};

  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(2, 2, 2, 0.1);
  border-radius: 1rem;
  justify-content: center;
  overflow: hidden;
`;

export const Containerwpr = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.75rem 0.75rem 1rem 0.75rem;

  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 75%
    ),
    url(${({ imgURL }) => imgURL});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
`;

export const Upperwpr = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Upperleft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const UpperRight = styled.div`
  display: flex;
  gap: 0.25rem;
  height: fit-content;
  justify-content: end;
`;

export const CircleIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  justify-content: flex-start;
  height: 30px;
  width: 30px;
  &:hover {
    width: 124px;
    justify-content: space-between;
  }
  border-radius: 30px;
  background: #ffffff;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
`;

export const Bottomwpr = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Descwpr = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Infowpr = styled.div`
  font-weight: 400;
  font-size: 0.6rem;
  color: #ffffff;
  display: flex;
  align-items: center;
`;

export const FulLabelwpr = styled.div`
  padding: 0.2rem 1rem 0.25rem;
  font-weight: 600;
  font-size: 10px;
  color: #ffffff;
  background: #eb566e;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const FullTitlewpr = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
`;

export const Fulldescwpr = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 1rem;
`;

export const FulLine = styled.div`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
`;

export const FullNumBoxwpr = styled.div`
  width: fit-content;
  & > span {
    font-weight: 700;
    font-size: 0.75rem;
    color: #ffffff;
    opacity: 0.6;
  }
`;

export const Numberwpr = styled.div`
  display: flex;
`;

export const NumBox = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #ffffff;
  & > span {
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-left: 0.25rem;
  }
`;

export const Changewpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: end;
  margin: 0 0 6px 4px;
  color: ${(props) => (props.isPositive ? '#50B601' : '#ED3F47')};
  & > svg {
    stroke: ${(props) => (props.isPositive ? '#50B601' : '#ED3F47')};
    > path {
      fill: ${(props) => (props.isPositive ? '#50B601' : '#ED3F47')};
    }
    transform: rotate(${(props) => (props.isPositive ? '0' : '180deg')});
  }
  & span {
    color: ${(props) => (props.isPositive ? '#50B601' : '#ED3F47')};
    margin: 0 0 0px 2px;
    line-height: 10px;
  }
`;

export const Iconwpr = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const Imgwpr = styled.div``;

//

export const Popoverwpr = styled.div`
  box-sizing: border-box;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  border-radius: 6px;
  padding: 0.75rem;
  bottom: -4.25rem;
  right: 0px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  gap: 0.5rem;
  cursor: pointer;
  flex-direction: column;
  width: 10.25rem;
  transition: all 0.3s ease-in;
  cursor: auto;
`;

export const PopItem = styled.div`
  width: 100%;
  font-weight: 400;
  cursor: pointer;
  font-size: 13px;
  color: #000000;
`;

export const Hoverwpr = styled(Link)`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
`;

export const MainWrp = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 1rem;
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
  border-bottom: ${(props) =>
    props?.isEmptyState ? 'none' : '1px solid #e8e8e8'};
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
      color: '#555555';
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

export const EmptyWrp = styled.div`
  display: flex;
  padding: 1.5rem 0rem 5.0625rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;
export const EmptySubText = styled.div`
  color: #585858;
  font-family: Inter;
  font-size: 0.75rem;
  // font-size: rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.1875rem; /* 158.333% */
  letter-spacing: -0.015rem;
`;

export const LinkText = styled(NavLink)`
  text-decoration: none;
  color: #5f39f8;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.1875rem; /* 158.333% */
  letter-spacing: -0.015rem;
`;
