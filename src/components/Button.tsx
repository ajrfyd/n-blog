import React, { FC } from "react";
import styled from "styled-components";

const colors = {
  black: "#000",
  gray: "#222222",
  white: "#fff",
  mint: "#2AC1BC"
};

const theme = {
  colors: {
    default: colors.gray,
    ...colors
  },
  bgcolor: {
    default: colors.white,
    gray: colors.gray,
    mint: colors.mint,
    black: colors.black
  },
  fontSize: {
    default: "16px",
    sm: "14px",
    lg: "18px"
  }
};

type ColorType = keyof typeof theme.colors;
type BackgroundColorType = keyof typeof theme.bgcolor;
type FontSizeType =  keyof typeof theme.fontSize;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ColorType;
  bgcolor?: BackgroundColorType;
  fontSize?: FontSizeType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<ButtonProps> = ({ fontSize, color, bgcolor, children }) => {
  

  return (
    <Buttons color={color} fontSize={fontSize} bgcolor={bgcolor}>
      {children}
    </Buttons>
  )
}

export default Button;

const Buttons = styled.button<Omit<ButtonProps, "onClick">>`
  color: ${({ color }) => theme.colors[color ?? "default"]};
  background-color: ${({ bgcolor }) => theme.bgcolor[bgcolor ?? "default"]};
  font-size: ${({ fontSize }) => theme.fontSize[fontSize ?? "default"]};
`;