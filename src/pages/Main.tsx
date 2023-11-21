import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const animate = (item: HTMLElement) => {
      let x = 100;
      let y = 0;

      item.classList.contains("lTr") ? (x = -100, y = 0) : item.classList.contains("bTt") ? (x = 0, y = 100) : null;

      gsap.fromTo(
        item, 
        { autoAlpha: 0, x, y }, 
        { autoAlpha: 1, x: 0, y: 0, delay: .2, duration: 1.25, overwrite: "auto", ease: "expo" }
      );
    }

    const iter = gsap.utils.toArray<HTMLElement>(".target")[Symbol.iterator]()
    for(const i of iter) {
      ScrollTrigger.create({
        trigger: i,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {animate(i)}
      });
      i.style.opacity = "0";
    }
  }, []);

  return (
    <Container>
      <ParalSection>
        <TargetP ref={pRef} className="target">
          JavaScript를 사랑하는 2년차 개발자 입니다.
        </TargetP>
      </ParalSection>
      <ParalSection>
        <TargetP ref={pRef} className="target lTr">
          배우는 것에 두려움이 없습니다.
        </TargetP>
      </ParalSection>
      <ParalSection>
        <TargetP ref={pRef} className="target">
          JavaScript 기반 Front-end에 기술에 관심이 있습니다.
        </TargetP>
      </ParalSection>
      <ParalSection>
        <TargetP ref={pRef} className="target lTr">
          Back-end에도 소홀하지 않습니다.
        </TargetP>
      </ParalSection>
      <ParalSection>
        <TargetP ref={pRef} className="target bTt">
          JavaScript는 사랑입니다...
        </TargetP>
      </ParalSection>
    </Container>
  )
}

export default Main;

const Container = styled.main`
  max-width: 1600px;
  width: 98%;
  margin: 0 auto;
  /* overflow: hidden; */
`;

const ParalSection = styled.section`
  width: 1200px;
  max-width: 70vw;
  margin: 30vw auto;

  text-align: left;
  margin-right: 0;
  position: relative;
  padding-top: 15vw;

  &:nth-child(even) {
    /* margin-right: auto; */
    margin-left: 0;
    text-align: right;
  }

  &:nth-child(even) p {
    margin-left: auto;
    margin-left: 5vw;
    text-align: left;
  }
`;

const TargetP = styled.p`
  font-size: 4vw;
  line-height: 1.4;
  margin-top: -5vw;
  margin-left: -4vw;
  z-index: 100;
  position: relative;
  word-break: keep-all;
`;
