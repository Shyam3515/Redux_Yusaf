import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import "./product.css";
import { addToCart } from "../redux/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status == "loading") {
    return <div>Loading...</div>;
  }
  if (status == "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="products">
        {items.map((p) => (
          <div key={p.id} className="product-container">
            <div className="product">
              <img src={p.image} alt={p.title} />
            </div>
            {/* Expected `onClick` listener to be a function, instead got a value of `object` type. */}
            <h3>${p.price}</h3>
            <button onClick={() => dispatch(addToCart(p))}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
