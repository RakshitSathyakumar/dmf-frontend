import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAllCouponsQuery } from "../../redux/api/paymentAPI";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Column } from "react-table";
import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../../components/admin/TableHOC";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/loader";
import { FaPlus } from "react-icons/fa";


interface DataType {
  code: string;
  amount: number;
  _id: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },

  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Discount = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const {data, isLoading, isError} = useAllCouponsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  const coupons = data?.coupons;
  console.log(coupons);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Discount Coupons",
    rows.length > 6
  )();

  if (isError) toast.error("Please try after some time");

  useEffect(() => {
    if (coupons)
      setRows(
        coupons.map((i:any) => ({
          _id: i._id,
          code: i.coupon,
          amount: i.amount,
          action: <Link to={`/admin/discount/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/discount/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;