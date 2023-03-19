import React from "react";
import styled from "styled-components";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
const Container = styled.div`
  width: 100vw;
  overflow: hidden;
`;
const Title = styled.h1`
  width: 25%;
  text-align: center;
  margin: 60px auto 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  border-bottom: 3px outset #333;
  color: #333;
`;
const Home = () => {
  return (
    <Container>
      <Slider />
      <Title>Category List</Title>
      <Categories />
      <Title>Product List</Title>
      <Products />
      <Newsletter />
    </Container>
  );
};

export default Home;
