import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // children: React.ReactNode;
  color?: string;
  size?: "lg" | "sm" | "md";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isIcon?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, color = "#000", size = "md", onClick, isIcon, ...rest }: CustomButtonProps) => {

  return (
    <Button color={color} size={size} onClick={onClick} isIcon={isIcon} {...rest}>
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
  color: "#000",
  size: "md",
  className: ""
}

const Button = styled.button<CustomButtonProps>`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 5px;
  /* color: ${({ color }) => `${color}`}; */
  ${({ color, theme }) => color && css`
    color: ${ color ?? theme.themes.text.default };
  `}

  font-weight: bold;
  cursor: pointer;
  /* padding: 1rem; */
  padding-left: 1rem;
  padding-right: 1rem;

  height: 2rem;
  font-size: 1rem;

  /* background-color: #f2f2f2; */
  background-color: ${({ theme }) => theme.themes.color.white};
  
  /* bg-color  */
  ${({ size }) => size && css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}

  ${({ theme, isIcon }) => isIcon && css`
    width: 2.5rem;
    /* height: 2.5rem; */
    border-radius: 50%;

    .lucide {
      scale: 3;
    }
  `};

  &:hover {
    /* background-color: ${lighten(0.1, "#f6f5f6")}; */
    background-color: ${lighten(0.1, "#fff")};

  }

  &:active {
    background-color: ${darken(0.1, "#fff")};
  }

  & + & {
    margin-left: 1rem;
  }
`