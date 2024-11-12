import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
    useDeleteCouponMutation,
    useSingleCouponDetailQuery,
    useUpdateCouponMutation,
} from "../../../redux/api/paymentAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/feature";

const DiscountManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useSingleCouponDetailQuery({
    userId: user?._id,
    couponId: id,
  });

  console.log(data, "--data");

  if (isError) {
    toast.error("Please try again later");
  }

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [code, setCode] = useState(data?.coupon?.coupon);
  const [amount, setAmount] = useState(data?.coupon?.amount);

  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const res = await updateCoupon({
        id: user?._id,
        coupon: code,
        amount: amount,
        couponId: id,
      });
      responseToast(res, navigate, "/admin/discount");
    } catch (error) {
      toast.error("Failed to update coupon");
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setCode(data.coupon.code);
      setAmount(data.coupon.amount);
    }
  }, [data]);

  const deleteHandler = async () => {
    setBtnLoading(true);
    try {
      const res = await deleteCoupon({ couponId: id, id: user._id });
      responseToast(res, navigate, "/admin/discount");
    } catch (error) {
      toast.error("Failed to delete coupon");
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <article>
            <button
              className="product-delete-btn"
              onClick={deleteHandler}
              disabled={btnLoading}
            >
              <FaTrash />
            </button>
            <form onSubmit={submitHandler}>
              <h2>Manage Coupon</h2>
              <div>
                <label>Coupon Code</label>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
              </div>

              <button disabled={btnLoading} type="submit">
                {btnLoading ? "Updating..." : "Update"}
              </button>
            </form>
          </article>
        )}
      </main>
    </div>
  );
};

export default DiscountManagement;
