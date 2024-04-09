import styled from 'styled-components';

export const AdvancedSection = styled.div`
  width: 100%;
  height: 20rem;
  background: #f6f7fb;
  border-radius: 10px;
  position: relative;
`;
export const BodySection = styled.div`
  width: 100%;
  height: calc(100% - 3.75rem);
  padding: 1.25rem 1.625rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const SectionFooter = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 3.75rem;
  padding: 1.25rem 1.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f6f7fb;
  box-shadow: 0px -1px 0px #c3c7d9;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.938rem;
`;
export const InnerSectionTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.188rem;
  color: #000000;
`;
export const FieldSection = styled.div`
  /* display: flex;
  align-items: center;
  gap: 1.5rem; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
`;
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.438rem;
`;
export const FieldLabel = styled.div`
  font-size: 0.75rem;
  line-height: 0.938rem;
  color: #000000;
`;
export const TextInput = styled.input`
  background: #ffffff;
  border: 1px solid #675ef2;
  border-radius: 6px;
  color: #c4c4c4;
  font-size: 0.85rem;
  padding: 0.5rem;
`;
export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.313rem;
`;
export const ToggleLabel = styled.div`
  font-size: 0.625rem;
  line-height: 0.75rem;
  color: #000000;
`;
