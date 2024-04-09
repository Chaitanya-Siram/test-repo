import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const DotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  cursor: pointer;
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #000;
`;

export const Menu = styled.div`
  min-width: 6.25rem;
  width: max-content;
  max-height: ${(props) => props.ITEM_HEIGHT && props.ITEM_HEIGHT * 4}rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 1.56rem;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  min-height: ${({ ITEM_HEIGHT }) => ITEM_HEIGHT}rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  span {
    font-size: 0.85rem;
  }
  &:hover {
    background-color: #f2f2f2;
  }
`;
