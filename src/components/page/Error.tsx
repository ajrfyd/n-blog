import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Error = () => {
  const { state } = useLocation();

  return (
    <Container>
      <h1>Code: {state.status}</h1>
      <p>{state.message}</p>
    </Container>
  )
}

export default Error;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;

  h1 {
    color: var(--purple);
    font-weight: bold;
    font-size: 4rem;
  }

  p {
    color: red;
    font-size: 1.5rem;
  }
`