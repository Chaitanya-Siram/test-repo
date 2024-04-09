import styled from 'styled-components';

export const CampaignsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0rem 0rem 0.71429rem 0.71429rem;
  background: #fff;
`;
export const CampaignsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.div`
  color: var(--grey-grey-1, #656b8a);
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
`;

export const AddCampaignWrapper = styled.div`
  align-items: center;
  flex-direction: column;
  color: #8676ff;
  justify-content: center;
  border-radius: 0.3125rem;
  border: 1px solid #d9d9d9;
  background: #fff;
  height: 9.638rem;
  gap: 0.46rem;
  width: 7.5rem;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};

  &:hover {
    cursor: pointer;
  }
  &.disabled {
    pointer-events: none;
  }
`;

export const AddCampaignText = styled.div`
  color: ${({ theme }) => theme.primary}
  ont-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
`;

export const DisplayCampaigns = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.6rem;
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
`;

export const SingleCampaignWrapper = styled.div`
  width: 14.375rem;
  background: #fff;
  border-radius: var(--corner-5-px, 0.3125rem);
  border: 1px solid #d9d9d9;
`;

export const CampaigntNameInput = styled.input`
  background: #ffffff;
  border: none;
  color: var(--grey-dark-2, #161a34);
  border-radius: 0.3125rem 0.3125rem 0px 0px;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 0.875rem; /* 116.667% */
  letter-spacing: -0.015rem;
  width: 12.2rem;
  height: 2.39063rem;
  padding: 0.75rem 0.9rem;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:focus-visible {
    outline: none;
  }
`;

export const CampaignKeywords = styled.textarea`
  background: #ffffff;
  border: none;
  color: var(--grey-dark-2, #161a34);
  border-radius: 0px 0px 0.3125rem 0.3125rem;
  width: 12.2rem;
  height: 6.9rem;
  padding: 0.69rem 0.9rem;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.015rem;
  resize: none;
  &:focus-visible {
    outline: none;
  }
`;

export const TextIconWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #d9d9d9;
  &:hover .delete-campaign {
    visibility: visible;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  border-radius: 0.3125rem;
  transition: background-color 0.3s ease;
  visibility: hidden;
`;
export const SentimemtsCampaignWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
`;

export const SentimemtsCampaignButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.625rem;
  flex-direction: row;
  gap: 0.38rem;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  border: 1px solid var(--grey-border-drak, #c3c7d9);
  background: #fff;
  border-radius: 0.3125rem;
  &:hover {
    cursor: pointer;
  }
`;
