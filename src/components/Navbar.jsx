import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { clearAccount } from "../redux/user.slice";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  border-radius: 20px;
  margin-top: 6px;
  overflow: hidden;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 16px;
  border: none;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 30px;
  text-decoration: none;
  transition: all 0.3s;
  &:hover {
    color: var(--primary);
  }
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 25px;
  transition: all 0.3s;
  &:hover {
    color: var(--primary);
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  border: none;
  margin-left: 10px;
  padding: 8px 16px;
  background-color: var(--dark-primary);
  border-radius: 6px;
  color: white;
  cursor: pointer;
`;

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAccount());
    navigate("/login");
  };

  console.log(user.currentUser);
  console.log(quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#333",
            }}
          >
            <Logo>CLOTHEE.</Logo>
          </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="Search..." />
            <Search
              style={{ color: "gray", fontSize: 22, cursor: "pointer" }}
            />
          </SearchContainer>
        </Center>

        {user ? (
          <Right>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <MenuItem>PROFILE</MenuItem>
            </Link>
            <Button onClick={handleLogout}>LOGOUT</Button>
            <Link to="/cart" style={{ textDecoration: "none", color: "#333" }}>
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        ) : (
          <Right>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#333",
              }}
            >
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#333",
              }}
            >
              <MenuItem>SIGN IN</MenuItem>
            </Link>

            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "#333",
              }}
            >
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
