import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} from "../service/api.product";
import Spinner from "./Spinner";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, isLoading, isSuccess } = useGetProductsByCategoryQuery(
    category,
    {
      skip: !category,
    }
  );
  const {
    data: allProducts,
    isLoading: allProductsLoading,
    isSuccess: allProductsSuccess,
  } = useGetAllProductsQuery();
  console.log(data);
  console.log(allProducts);
  console.log(category);

  useEffect(() => {
    console.log(products);
    if (isSuccess) {
      category && setProducts(data);
    } else if (allProductsSuccess) {
      !category && setProducts(allProducts);
    }
    console.log(products);
  }, [category, isSuccess, allProductsSuccess]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((pre) =>
        [...pre].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((pre) => [...pre].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((pre) => [...pre].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <>
      <Container>
        {category
          ? filteredProducts.map((item) => (
              <ProductItem item={item} key={item._id} />
            ))
          : products
              .slice(0, 6)
              .map((item) => <ProductItem item={item} key={item._id} />)}
      </Container>

      {isLoading && <Spinner />}
      {allProductsLoading && <Spinner />}
    </>
  );
};

export default Products;
