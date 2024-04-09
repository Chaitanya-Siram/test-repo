import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #f3f4f8;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
export const ProfileTitle = styled.div`
  color: #000000;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
`;
export const ProfileDescription = styled.div`
  color: #585858;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.015rem;
`;
export const BorderDiv = styled.div`
  height: 0.0625rem;
  background: #e8e8e8;
`;
export const StatsWrp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.12rem;
`;

export const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
export const StatsItemLabel = styled.div`
  color: #000;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.01063rem;
`;
export const StatsItemValue = styled.div`
  color: #656b8a;
  text-align: center;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.015rem;
`;
export const FooterContainer = styled.div``;
export const CardBottom = styled.div`
  height: 8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
`;

export const SocialMediaWrp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;
export const MediaContainer = styled.div`
  display: flex;
  background: rgb(243, 244, 248);
  flex-direction: row;
  gap: 0.4rem;
  border-radius: 50%;
  height: 1.25rem;
  width: 1.25rem;
  &:hover {
    cursor: pointer;
  }
`;
export const TagsWrp = styled.div`
  width: 95%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.375rem;
    flex-wrap: wrap;
  }
`;
