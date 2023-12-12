import styled from "styled-components";

const Loading = () => {

  return (
    <Container>
      <p>
        Loading....
      </p>
    </Container>
  )
}

export default Loading;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .3);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 5rem;
    font-weight: bold;
  }
`