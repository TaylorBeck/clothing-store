import styled, { css } from 'styled-components';

const defaultButtonStyles = css`
  background-color: black;
  color: white;
  border: none;
  
  &:active {
    background-color: white;
    color: black;
  }

  @media screen and (min-width: 600px) {
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }

    &:active {
      background-color: black;
      color: white;
    }
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:active {
    background-color: black;
    color: white;
  }

  @media screen and (min-width: 600px) {
    &:hover {
      background-color: black;
      color: white;
      border: none;
    }

    &:active {
      background-color: white;
      color: black;
    }
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: 1px solid #00ccef;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : defaultButtonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 48px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
