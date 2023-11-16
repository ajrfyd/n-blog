import { useEffect, useRef } from "react";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import IntroBlock from "../components/IntroBlock";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  // const tRef = useRef<HTMLDivElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // const targets = gsap.utils.toArray(document.querySelectorAll(".target"));
    // targets.forEach(t => {
      // let txt = t.innerText;
    // })
    const targets = document.querySelectorAll(".target") as NodeListOf<HTMLParagraphElement>;
    targets.forEach(t => {
      let txt = t.innerText;
      let newTxt = "";

      for(let i = 0; i < txt.length; i++) {
        newTxt += "<span aria-hidden='true'>";
        txt[i] === " " ? newTxt += " " : newTxt += txt[i];
        newTxt += "</span>";
      }
      t.innerHTML = newTxt;
      t.setAttribute("aria-hidden", txt);
    }); 

    gsap.utils.toArray<HTMLElement>(".target").forEach(txt => {
      gsap.from(txt.querySelectorAll("span"), {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.5,
        ease: "circ.out",
        //stagger: 0.04,
        stagger: {
          amount: 1,
          from: "random"
        },
        scrollTrigger: {
          trigger: txt,
          start: "top bottom",
          end: "+=400",
          // markers: true,
        }
      })
    })
  }, []);

  return (
    <Container>
      <IntroBlock>
        <IntroItem ref={pRef} className="target">
          JavaScript를 사랑하는 2년차 개발자 입니다.
        </IntroItem>
      </IntroBlock>
      <IntroBlock $rTl >
        <IntroItem ref={pRef} className="target">
          배우는 것에 두려움이 없습니다.
        </IntroItem>
      </IntroBlock>
      <IntroBlock>
        <IntroItem ref={pRef} className="target">
          JavaScript 기반 Front-end에 기술에 관심이 있습니다.
        </IntroItem>
      </IntroBlock>
      <IntroBlock $rTl>
        <IntroItem ref={pRef} className="target">
          Back-end에도 소홀하지 않습니다.
        </IntroItem>
      </IntroBlock>
      <IntroBlock>
        <IntroItem ref={pRef} className="target">
          JavaScript는 사랑입니다...
        </IntroItem>
      </IntroBlock>
    </Container>
  )
}

export default Main;

const Container = styled(ContentContainer)`
  overflow: hidden;
`

const IntroItem = styled.p`
  span {
    display: inline-block;
  }
`;
