import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidcouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const incrementHandler = (cartItems: CartItem) => {
    if (cartItems.quantity >= cartItems.stock)
      return toast.error("No More Units Left!!");
    dispatch(addToCart({ ...cartItems, quantity: cartItems.quantity + 1 }));
  };

  const decrementHandler = (cartItems: CartItem) => {
    if (cartItems.quantity <= 1) return toast.error("Min Quantity has to 1");
    dispatch(addToCart({ ...cartItems, quantity: cartItems.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          console.log(res.data);
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              key={idx}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items in Cart </h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <em className="red">Discount : -₹{discount}</em>
        <p>Total : ₹{total}</p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />
        {couponCode &&
          (isValidcouponCode ? (
            <span className="green">
              {discount} off using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 ? (
          <Link to={"/shipping"}>chekout</Link>
        ) : (
          <Link to={"/search"}>No Items</Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
