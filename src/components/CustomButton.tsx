import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // children: React.ReactNode;
  color?: string;
  size?: "lg" | "sm" | "md";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  $isIcon?: boolean;
  $bgColor?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, color, size = "md", onClick, $isIcon, $bgColor, ...rest }: CustomButtonProps) => {

  return (
    <Button color={color} size={size} onClick={onClick} $isIcon={$isIcon} $bgColor={$bgColor} {...rest}>
      { children }
    </Button>
  )
}


export default CustomButton;

const sizes = {
  lg: {
    height: "3rem",
    fontSize: "1.25rem",
  },
  md: {
    height: "2.25rem",
    fontSize: "1rem"
  },
  sm: {
    height: "1.75rem",
    fontSize: "0.75rem"
  }
} as const;

CustomButton.defaultProps = {
  size: "md",
  className: ""
}

const Button = styled.button<CustomButtonProps>`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 8px;
  

  font-weight: bold;
  cursor: pointer;
  /* padding: 1rem; */
  padding-left: 1rem;
  padding-right: 1rem;

  height: 2rem;
  font-size: 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .3);

  /* background-color: #f2f2f2; */
  background-color: ${({ theme, $bgColor }) => $bgColor ?? theme.themes.color.white};
  color: ${({ color, theme }) => color ?? theme.themes.text.black};

  /* size  */
  ${({ size }) => size && css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
    margin: ${size === 'sm' ? "5px 0" : ""};
  `}

  
  ${({ $isIcon }) => $isIcon && css`
    width: 2.5rem;
    /* height: 2.5rem; */
    border-radius: 50%;

    .lucide {
      scale: 3;
    }
  `};

  &:hover {
    background-color: ${({ $bgColor }) => lighten(0.1, `${$bgColor ?? "#fff"}`)}
  }

  &:active {
    /* background-color: ${darken(0.1, "#fff")}; */
    background-color: ${({ $bgColor }) => darken(0.1, `${$bgColor ?? "#fff"}`)}

  }

  & + & {
    margin-left: 1rem;
  }
`