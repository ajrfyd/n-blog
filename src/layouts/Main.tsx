import styled from "styled-components";

const Main = () => {

  return (
    <Container>
      Hello Main??
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />

    </Container>
  )
}

export default Main;

const Container = styled.div`
  
`

const Block = styled.div`
  width: 100%;
  height: 50vh;
  border: 1px solid red;
`