import styled from 'styled-components';

export const HighlighterDiv = styled.div`
  position: absolute;
  transition: border 0.2s ease;
  z-index: 999;
  display: none;
  &.active {
    display: block;
  }
`;

export const HighlightPopover = styled.div`
  position: absolute;
  background: #fff;
  width: auto;
  /* min-width: 15rem; */
  max-width: 25rem;
  height: auto;
  z-index: 999;
  /* padding: ${({ isIntro }) => (!isIntro ? '1rem' : '')}; */
  /* border: 1px solid black; */
  border-radius: 0.625rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px 0px;
  display: none;
  left: 0;
  top: 0;
  transition: left 0.3s ease, top 0.3s ease;
  &.active {
    display: block;
  }
`;

export const Instruction = styled.p`
  font-size: 0.85rem;
  text-overflow: ellipsis;
`;

export const HighlightBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(22, 26, 52);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms ease;

  &.active {
    opacity: 0.4;
    pointer-events: auto;
  }
`;

export const BackdropMask = styled.div`
  display: block;
  position: absolute;
  width: 2rem;
  clip-path: circle(50%);
  height: 2rem;
  background: #ebe0e0;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
`;

export const ButtonWrp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1.5rem 1rem;

  &.intro-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 0;
    padding: 0 1.2rem 1.2rem 1.5rem;
  }
`;

export const CoachMarksWrp = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const CoachLabel = styled.div`
  color: #161a34;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
`;
export const CoachDescription = styled.div`
  color: #585858;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 138.462% */
  letter-spacing: -0.01625rem;
`;
export const PopoverContent = styled.div`
  width: 100%;
  height: 100%;
`;
export const HighlightRipple = styled.div`
  position: absolute;
  z-index: 999;
  display: none;
  &.active {
    display: block;
  }
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 1px solid #675ef2;
  -webkit-transition: height 0.25s ease, width 0.25s ease;
  transition: height 0.25s ease, width 0.25s ease;

  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid #675ef2;
  }

  &:before {
    -webkit-animation: ripple 2s linear infinite;
    animation: ripple 2s linear infinite;
  }
  &:after {
    -webkit-animation: ripple 2s linear 1s infinite;
    animation: ripple 2s linear 1s infinite;
  }

  &:hover:before,
  &:hover:after {
    -webkit-animation: none;
    animation: none;
  }
`;
export const SkipButton = styled.div`
  cursor: pointer;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  color: #675ef2;
  &.intro-skip {
    color: #656b8a;
    text-align: center;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.125rem; /* 120% */
    letter-spacing: -0.01875rem;
  }
`;
