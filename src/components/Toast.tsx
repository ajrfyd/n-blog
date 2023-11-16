import styled, { keyframes} from "styled-components";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

type ToastProps = {
  msg: string;
  disappearTime: number;
}

const Toast = ({ msg, disappearTime }: ToastProps) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => setIsFading(true), disappearTime);
    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <Container className={isFading ? "fadeOut" : ""}>
      <AlertTriangle size={20}/>&nbsp;{ msg }
    </Container>
  )
}

export default Toast;

const fadeInLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  font-weight: bold;
  color: #fff;
  background-color: var(--teal);
  opacity: .9;
  box-shadow: 0 0 8px rgba(255, 255, 255, .8);
  animation: ${fadeInLeft};
  animation-duration: .6s;
  transition: .3s ease;
  padding: .5rem 1rem;
  border-radius: 4px;
  margin: .5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &.fadeOut {
    opacity: 0;
    transform: opacity 2s;
  }
`