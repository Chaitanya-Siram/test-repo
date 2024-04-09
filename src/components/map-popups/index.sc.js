import styled from 'styled-components';

// for mediaType popup

export const MediatypePopwrpr = styled.div`
  width: fit-content;
  background-color: ${({ theme }) => theme.secondaryBackground};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ArclInfowpr = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.2rem;
`;

export const HorizontalStrip = styled.div`
  height: 3px;
  width: ${(props) => props.width};
  background-color: ${(props) => props.backgroundColor};
`;

export const DesContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const StripBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

// Campaign monitor

export const CampaignPopwpr = styled.div`
  width: 6.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CampDeswpr = styled.div`
  width: 100%;
`;

export const Campinfowpr = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.2rem;
`;

export const FitContent = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: ${(props) => (props.isReverse ? 'column-reverse' : 'column')};
  gap: ${(props) => props.gap};
`;

// General styles
export const MidBold = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.6rem;
  font-weight: 600;
`;

export const MidLight = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.55rem;
  font-weight: 400;
`;

export const BigMidBold = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.65rem;
  font-weight: 600;
`;

export const BigMiddleGray = styled.div`
  color: #585858;
  font-size: 0.65rem;
  font-weight: 400;
`;

//
export const SecMidgray = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  color: #585858;
`;

export const SecLightgray = styled.div`
  font-size: 0.65rem;
  font-weight: 400;
  color: #585858;
`;

export const SecLight = styled.div`
  font-size: 0.65rem;
  font-weight: 400;
  color: ${({ theme }) => theme.secondaryText};
`;

export const SecMidBold = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.secondaryText};
`;

export const SecMidLight = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
  color: ${({ theme }) => theme.secondaryText};
`;

export const FitHorizontal = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${(props) => props.gap};
`;

export const SquareBox = styled.div`
  width: ${(props) => props.width || '.75rem'};
  height: ${(props) => props.height || '.75rem'};
  background-color: ${({ background }) => background};
`;
