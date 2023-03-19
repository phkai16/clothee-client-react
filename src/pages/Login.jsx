import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../service/api.user";
import { toast } from "react-hot-toast";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(3, 3, 3, 0.5), rgba(3, 3, 3, 0.3)),
    url("/login-bg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgb(133, 133, 133);
  &:focus {
    outline: 1px solid var(--dark-primary);
  }
`;

const Button = styled.button`
  border-radius: 4px;
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: var(--dark-primary);
  color: white;
  cursor: pointer;
  margin: 20px auto 30px;
  &:disabled {
    cursor: no-drop;
    opacity: 0.9;
  }
  &:focus {
    outline: none;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const handleClick = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully!");
    } else if (isError) {
      toast.error("Some thing went wrong...");
    }

    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isSuccess, token]);
  return (
    <Container>
      <Wrapper>
        <Top>
          <img src="/logo.png" alt="" style={{ height: 40 }} />
          <Title>CLOTHEE LOGIN</Title>
        </Top>
        <Form>
          <Input
            placeholder="Enter username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Enter password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isLoading}>
            LOGIN
          </Button>
          <Link
            to="/register"
            style={{
              margin: "auto",
              textDecoration: "none",
              fontSize: "14px",
              color: "var(--dark-primary)",
            }}
          >
            Do not have an account? CREATE NOW
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
