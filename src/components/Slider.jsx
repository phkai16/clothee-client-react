import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowCircleRightOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(3, 3, 3, 0.1);
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  margin: auto 10px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  width: 100vw;
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  padding-top: 100px;
`;

const Desc = styled.p`
  margin: 20px 0px 50px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  padding-right: 40px;
`;

const Button = styled.button`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 20px;
  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  border-radius: 6px;
  background-color: var(--dark-primary);
  color: #fff;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined style={{ fontSize: "40px" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Button>
                  SHOW NOW
                  <ArrowCircleRightOutlined style={{ fontSize: "30px" }} />
                </Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined style={{ fontSize: "40px" }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
