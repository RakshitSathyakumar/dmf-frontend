import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCouponDetailMutation } from "../../../redux/api/paymentAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/feature";

const NewCoupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [code, setCode] = useState("");
  const [amount, setAmount] = useState(0);
  const [newCoupon] = useCouponDetailMutation();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // submit handler
    e.preventDefault();

    setBtnLoading(true);

    try {
      if (!code || !amount) return;
      const formData = new FormData();
      formData.set("code", code);
      formData.set("amount", amount.toString());
      const res = await newCoupon({ id: user._id, coupon: code, amount:amount });
      responseToast(res, navigate, "/admin/discount");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>Create Coupon</h2>
            <div>
              <label>Coupon</label>
              <input
                required
                type="text"
                placeholder="Coupon Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div>
              <label>Amount</label>
              <input
                required
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            <button disabled={btnLoading} type="submit">
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewCoupon;
