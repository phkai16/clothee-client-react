import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cart.slice";
import { useAddOrderMutation } from "../service/api.order";
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 40px 0;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 40px;
`;

const TopButton = styled.button`
  padding: 12px 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid var(--dark-primary);
  background-color: ${(props) =>
    props.type === "filled" ? "var(--dark-primary)" : "transparent"};
  color: ${(props) =>
    props.type === "filled" ? "white" : "var(--dark-primary)"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-transform: none;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 26px;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px 16px;
  background-color: var(--dark-primary);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;
const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EmptyText = styled.h3`
  text-transform: capitalize;
  font-weight: 600;
  color: darkslategrey;
  margin: 20px 0;
`;
const ImgEmpty = styled.img`
  height: 150px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addOder, { isLoading, isSuccess }] = useAddOrderMutation();

  console.log(currentUser);
  console.log(cart);
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleClick = async () => {
    // try {
    //   const res = await userRequest.post("/orders", {
    //     userId: currentUser.currentUser._id,
    //     products: cart.products,
    //     amount: cart.total,
    //     address: "",
    //   });
    //   // dispatch(clearCart());
    //   // history.push("/success", { data: res.data });
    // } catch (err) {
    //   console.log(err);
    // }
    addOder({
      userId: currentUser._id,
      products: cart.products,
      amount: cart.total,
      address: currentUser.address,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      navigate("/success");
    }
  }, [isSuccess]);

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/" style={{ textDecoration: "none" }}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton onClick={handleClearCart} type="filled">
            CLEAR CART
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductName>
                      <b>Color:</b>{" "}
                      <ProductColor color={"var(--" + product.color + ")"} />
                    </ProductName>

                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            {cart.products.length < 1 && (
              <EmptyContainer>
                <ImgEmpty src="/empty-box.png" alt="" />
                <EmptyText>Add products to cart now</EmptyText>
              </EmptyContainer>
            )}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 3.5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ {cart.total > 50 ? 3.5 : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                $ {cart.total > 50 ? cart.total : cart.total + 3.5}
              </SummaryItemPrice>
            </SummaryItem>

            <Button onClick={handleClick} disabled={isLoading}>
              ORDER NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
