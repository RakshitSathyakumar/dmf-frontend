import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
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

  return (
    <div className="shipping">
      <button onClick={() => navigate("/cart")} className="back-btn">
        <BiArrowBack />
      </button>
      <form>
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
