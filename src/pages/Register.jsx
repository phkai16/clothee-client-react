import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useRegisterMutation } from "../service/api.user";

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
  width: 40%;
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
const Top = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgb(133, 133, 133);
  &:focus {
    outline: 1px solid var(--dark-primary);
  }
`;

const Button = styled.button`
  border-radius: 4px;
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: var(--dark-primary);
  color: white;
  cursor: pointer;
  margin-top: 40px;
  margin: 40px auto 0;
  &:disabled {
    cursor: no-drop;
    opacity: 0.9;
  }
  &:focus {
    outline: none;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();

  const handelChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    register(inputs);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User created!");
      navigate("/login");
    } else if (isError) {
      toast.error("Something went wrong...");
    }
  }, [isSuccess]);
  return (
    <Container>
      <Wrapper>
        <Top>
          <img src="/logo.png" alt="" style={{ height: 40 }} />
          <Title>CLOTHEE REGISTER</Title>
        </Top>
        <Form>
          <Input
            name="username"
            placeholder="Enter username..."
            onChange={handelChange}
          />
          <Input
            name="fullname"
            placeholder="Enter full name..."
            onChange={handelChange}
          />
          <Input
            name="password"
            placeholder="Enter password..."
            onChange={handelChange}
          />
          <Input
            name="email"
            placeholder="Enter email..."
            onChange={handelChange}
          />
          <Input
            name="phone"
            placeholder="Enter phone..."
            onChange={handelChange}
          />
          <Input
            name="address"
            placeholder="Enter address..."
            onChange={handelChange}
          />
          <Button onClick={handleClick} disabled={isLoading}>
            CREATE
          </Button>
          <Link
            to="/login"
            style={{
              width: "100%",
              margin: " 30px auto 0",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "14px",
              color: "var(--dark-primary)",
            }}
          >
            Have an account? SIGN IN NOW
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
