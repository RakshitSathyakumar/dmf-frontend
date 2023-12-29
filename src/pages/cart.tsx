import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "asdasdasd",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQG4E5sErKqM7EC0PuPoyEQbbbcgKtVLcmSHtP8nL_uw&s",
    name: "Macbook",
    price: 3000,
    quantity: 4,
    stock: 10,
  },
];

const Subtotal = 20000;
const Shipping = 200;
const tax = Math.round(Subtotal * 0.18);
const Discount = 200;
const Total = Subtotal + tax - Discount + Shipping;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
      console.log(Math.random());
    }, 1000);

    return () => {
      clearTimeout(id);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
        ) : (
          <h1>No Items in Cart </h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{Subtotal}</p>
        <p>Shipping Charges : ₹{Shipping}</p>
        <p>Tax : ₹{tax}</p>
        <em className="red">Discount : -₹{Discount}</em>
        <p>Total : ₹{Total}</p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />
        {couponCode &&
          (isValidcouponCode ? (
            <span className="green">
              {Discount} off using <code>{couponCode}</code>
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
