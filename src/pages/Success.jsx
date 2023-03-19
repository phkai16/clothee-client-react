import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`;
const Button = styled.div`
  background-color: var(--primary);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 16px 24px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 0 40px;
`;

const Success = () => {
  return (
    <SuccessContainer>
      <img
        src="/success.jpg"
        alt=""
        style={{ height: 300, marginTop: "40px" }}
      />
      <Title>
        <CheckCircleIcon fontSize="large" color="success" />
        Your order has been successfully placed!!
      </Title>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button>Continue Shopping</Button>
      </Link>
    </SuccessContainer>
  );
};

export default Success;
