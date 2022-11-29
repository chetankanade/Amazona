import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from "axios";
import logger from "use-reducer-logger";
import { Row, Col } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3">
                <div className="product" key={product.slug}>
                  <Link to={`/product/${product.slug}`}>
                    <img src={product.images} alt={product.name} />
                  </Link>
                  <div className="product-info">
                    <Link to={`/product/${product.slug}`}>
                      <p>{product.name}</p>
                    </Link>
                    <p>
                      <strong>${product.price}</strong>z
                    </p>
                    <button>Add to Cart</button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
