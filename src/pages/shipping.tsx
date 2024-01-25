import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import { CartReducerInitialState } from "../types/reducer-types";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      toast.error("Please Add Items In Cart");
      return navigate("/");
    }
  }, [cartItems]);

  return (
    <div className="shipping">
      <button onClick={() => navigate("/cart")} className="back-btn">
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
        <h1>Shiping Address</h1>
        <input
          type="text"
          name="address"
          placeholder="address"
          required
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="city"
          name="city"
          required
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="state"
          name="state"
          required
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        {/* <input
          type="text"
          placeholder="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        /> */}
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value={""}>select country</option>
          <option value={"India"}>India</option>
        </select>
        <input
          type="number"
          placeholder="pin Code"
          name="pinCode"
          required
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button>CONTINUE</button>
      </form>
    </div>
  );
};
export default Shipping;
