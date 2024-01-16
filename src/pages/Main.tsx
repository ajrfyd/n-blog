import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronsDownIcon } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const introArr = ["JavaScript를 사랑하는 2년차 개발자 입니다.", "배우는 것에 두려움이 없습니다.", "JavaScript 기반 Front-end에 기술에 관심이 있습니다.", "Back-end에도 소홀하지 않습니다.", "JavaScript는 사랑입니다..."];

  useEffect(() => {
    // const animate = (item: HTMLElement) => {
    //   let x = 100;
    //   let y = 0;

    //   item.classList.contains("lTr") ? (x = -100, y = 0) : item.classList.contains("bTt") ? (x = 0, y = 100) : null;

    //   gsap.fromTo(
    //     item, 
    //     { autoAlpha: 0, x, y }, 
    //     { autoAlpha: 1, x: 0, y: 0, delay: .2, duration: 1.25, overwrite: "auto", ease: "expo" }
    //   );
    // }

    // const iter = gsap.utils.toArray<HTMLElement>(".target")[Symbol.iterator]()
    // for(const i of iter) {
    //   ScrollTrigger.create({
    //     trigger: i,
    //     start: "top 80%",
    //     end: "bottom 20%",
    //     onEnter: () => {animate(i)}
    //   });
    //   i.style.opacity = "0";
    // }

    introArr.forEach((_, idx) => {
      const ani = gsap.timeline();
      ani.from(`.item-${idx + 1}`, { xPercent: idx % 2 === 0 ? -200 : 200 }, "text").to(`item-${idx + 1}`, { xPercent: 0 }, "text");
      
      ScrollTrigger.create({
        animation: ani,
        trigger: `#section${idx + 1}`,
        start: "top top",
        end: "+=2000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true
      });
    });

  }, []);

  return (
    <Container>
      <ScrollDownContainer>
        <p>Scroll Down</p>
        <ChevronsDownIcon />
      </ScrollDownContainer>
      {/* {
        introArr.map((text, idx, arr) => 
          (
            <ParalSection key={text}>
              <TargetP className={`target ${idx % 2 ? "lTr" : ((idx % 2 === 1 || idx % 2 === 0) && arr.length - 1 === idx) ? "bTt" : ""}`}>{text}</TargetP>
            </ParalSection>
          )
        )
      } */}
      {
        introArr.map((txt, idx) => (
          <ParalContainer key={txt} id={`section${idx + 1}`}>
            <ParalText className={`item-${idx + 1}`}>
              {txt}
            </ParalText>
          </ParalContainer>
        ))
      }
    </Container>
  )
};

export default Main;

const Container = styled.main`
  /* max-width: 1600px; */
  /* width: 98%; */
  margin: 0 auto;
  overflow: hidden;
  /* min-height: min-content; */
  /* height: 200%; */
  /* border: 5px solid red; */
  /* padding-bottom: 1rem; */
  /* position: relative; */
  margin-top: 86px;
`;

const UpNDown = keyframes`
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
`

const ScrollDownContainer = styled.div`
  position: absolute;
  display: none;
  
  @media (min-width: 576px) {
    display: block;
    right: 2rem;
  
    svg {
      transition: 1s;
      animation: ${UpNDown} .8s ease-out infinite;
    }
  }
`;

// const ParalSection = styled.section`
//   width: 1200px;
//   max-width: 70vw;
//   margin: 30vw auto;

//   text-align: left;
//   margin-right: 0;
//   position: relative;
//   padding-top: 15vw;

//   &:nth-child(even) {
//     /* margin-right: auto; */
//     margin-left: 0;
//     text-align: right;
//   }

//   &:nth-child(even) p {
//     margin-left: auto;
//     margin-left: 5vw;
//     text-align: left;
//   }

//   /* &:last-child() {
//     padding-top: 0;
//   } */
// `;

// const TargetP = styled.p`
//   font-size: 4vw;
//   line-height: 1.4;
//   margin-top: -5vw;
//   margin-left: -4vw;
//   /* z-index: 10; */
//   position: relative;
//   word-break: keep-all;
// `;

const ParalContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 100vh;

`;

const ParalText = styled.p`
  font-size: 4vw;
`
