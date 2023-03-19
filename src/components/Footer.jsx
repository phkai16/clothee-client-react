import {
  Facebook,
  Instagram,
  Pinterest,
  Twitter,
  LocationOnOutlined,
  LocalPhoneRounded,
  MailOutlineRounded,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 40px 0 10px;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px 30px;
  font-size: 14px;
  line-height: 24px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>CLOTHEE.</Logo>
        <Desc>
          We always try to bring to customers quality fashion products, diverse
          in designs, colors, suitable for many ages. Wish you have a happy
          shopping experience create a shop.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook fontSize="small" />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram fontSize="small" />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter fontSize="small" />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest fontSize="small" />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Product Page</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnOutlined style={{ marginRight: "10px" }} /> 1234 Dien Bien
          Phu , Ho Chi Minh
        </ContactItem>
        <ContactItem>
          <LocalPhoneRounded style={{ marginRight: "10px" }} /> +123 456 789
        </ContactItem>
        <ContactItem>
          <MailOutlineRounded style={{ marginRight: "10px" }} />{" "}
          clothee-shop@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
