import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import Spinner from "../components/Spinner";
import { addToCart } from "../redux/cart.slice";
import { mobile } from "../responsive";
import { useGetProductQuery } from "../service/api.product";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 30px 50px 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 40px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 34px;
`;

const Desc = styled.p`
  margin: 10px 0px 40px;
  color: darkslategray;
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 30px;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  border-top: 1px outset darkgray;
  padding-top: 30px;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 16px;
`;
const FilterText = styled.span`
  text-transform: capitalize;
  font-size: 16px;
  color: darkslategray;
`;

const FilterSize = styled.select`
  padding: 8px 16px;
`;

const FilterSizeOption = styled.option`
  padding: 8px 16px;
`;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 40px;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border-radius: 6px;
  border: 1px solid #333;
`;

const Amount = styled.span`
  width: 60px;
  padding: 10px;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 6px;
  border: 2px solid var(--dark-primary);
  background-color: var(--dark-primary);
  cursor: pointer;
  color: white;
  font-weight: 500;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const { quantity: quantityRedux } = useSelector((state) => state.cart);

  const { data, isLoading, isSuccess } = useGetProductQuery(id, {
    skip: !id,
  });
  const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => "var(--" + props.color + ")"};
    border: 1px solid #eee;
    cursor: pointer;
  `;

  useEffect(() => {
    if (isSuccess) {
      setProduct(data);
      setColor(data?.color[0]);
      setSize(data?.size[0]);
    }
  }, [id, isSuccess, isLoading]);
  console.log(quantityRedux);
  console.log(data?.size[0]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    // update cart
    console.log({ ...product, quantity, color, size });
    dispatch(addToCart({ ...product, quantity, color, size }));
  };
  return (
    <Container>
      {!isLoading && (
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>${product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Categories:</FilterTitle>
                <FilterText>{product.categories?.join(", ")}</FilterText>
              </Filter>
              <Filter>
                <FilterTitle>Color:</FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size:</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => handleQuantity("inc")}
                />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      {isLoading && <Spinner />}
      <Newsletter />
    </Container>
  );
};

export default Product;
