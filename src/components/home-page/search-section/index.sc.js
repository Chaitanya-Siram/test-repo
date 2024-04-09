import styled from 'styled-components';

export const SearchWrp = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 1.25rem;
  display: flex;
  transition: 400ms ease-out;
  z-index: 2;
  width: calc(40% - 0.5rem);
  border-radius: 1rem;
  &.active {
    width: 100%;
    height: 30rem;
    grid-template-rows: 1fr;
    transition: 400ms ease-out;
  }
`;

export const NavWrp = styled.div`
  height: 100%;
  position: ${({ role }) => (role === 'Analyst' ? 'unset' : 'absolute')};
  transition: all 600ms ease-in-out;
  left: calc(40% + 0.5rem);
  width: ${({ role }) => (role === 'Analyst' ? 'unset' : 'calc(60% - 2rem)')};
  &.active {
    transition: all 600ms ease-in-out;
    left: 100%;
  }
`;
export const SearchFocusBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(160, 167, 198, 0.6);
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms ease;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;
