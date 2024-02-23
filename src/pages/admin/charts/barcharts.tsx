import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashBoard";
import { RootState } from "../../../redux/store";
import { Skeleton } from "../../../components/loader";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { getLastMonths } from "../../../utils/feature";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const Barcharts = () => {
  const { last12Months, last6Months } = getLastMonths();
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useBarQuery(user?._id!);
  // console.log(data);
  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {isLoading ? (
          <Skeleton length={25} />
        ) : (
          <>
            <h1>Bar Charts</h1>
            <section>
              <BarChart
                labels={last6Months}
                data_1={products}
                data_2={users}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={orders}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
