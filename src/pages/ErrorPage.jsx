import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  max-height: 100vh;
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
const ErrorPage = () => {
  return (
    <ErrorContainer>
      <img
        src="/error-page.jpg"
        alt=""
        style={{ height: 550, marginTop: "40px" }}
      />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button>Back to Homepage</Button>
      </Link>
    </ErrorContainer>
  );
};

export default ErrorPage;
