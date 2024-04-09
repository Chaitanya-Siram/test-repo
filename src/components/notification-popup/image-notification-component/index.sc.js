import styled from 'styled-components';

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  &:hover {
    cursor: pointer;
  }
`;

export const Wrp = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
`;

export const ContentWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
export const TitleWrp = styled.div``;

export const TitleText = styled.h4`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
`;

export const TextWrp = styled.div`
  display: flex;
  height: 3.875rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

// export const ImageWrp = styled.div`
//   width: 8.24881rem;
//   height: 5rem;
//   border-radius: 0.3125rem;
//   border: 1px solid #d9d9d9;
//   background: url(${(props) => props.url}), lightgray 50% / cover no-repeat;
//   background-position: center;
// `;
export const ImageWrp = styled.img`
  min-width: 8.24881rem;
  height: 5rem;
  border-radius: 0.3125rem;
  border: 1px solid #d9d9d9;
  object-fit: contain;
`;

export const ContentText = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.secondaryText};

  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
`;

export const TimeWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const TimeText = styled.p`
  color: #999;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
  padding: 0;
  margin: 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: #e8e8e8;
`;
