import "./cart.css";
import { removeFromCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount.toFixed(2));
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <p>Total Quantity : {totalQuantity}</p>
      <p className="secondP">Total Amount : ${totalAmount}</p>
      <div className={`cart-products ${totalQuantity > 0 ? "border" : " "}`}>
        {items.map((p) => (
          <div className="cart-product" key={p.id}>
            <div className="product">
              <img src={p.image} alt="" className="cartImage" />
              <p className="quantity">Quantity : {p.quantity}</p>
            </div>

            <button
              className="cart-button"
              onClick={() => dispatch(removeFromCart(p))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
