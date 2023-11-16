import styled from "styled-components";
import Toast from "../components/Toast";
import { useMessages } from "../lib/hooks/useStore";

const Notification = () => {
  const messages = useMessages();

  return (
    <Container>
      {
        messages.map(msg => <Toast key={msg.uuid} msg={msg.msg} disappearTime={msg.disappearTime}/>)
      }
    </Container>
  )
}

export default Notification;

const Container = styled.div`
  position: fixed;
  top: 10%;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
`