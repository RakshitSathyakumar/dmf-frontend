import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import { ProductCard } from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItems: CartItem) => {
    if (cartItems.stock < 1) {
      return toast.error("Out of Stock!!");
    }
    dispatch(addToCart(cartItems));
    toast.success("Item Added!");
  };
  if (isError) toast.error("Cannot Fetch from the server");
  return (
    <div className="home">
      <section> </section>
      <h1>
        Trending Products
        <Link to={"/search"} className="findmore">
          more
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              name={i.name}
              photos={i.photos}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              productId={i._id}
              key={i._id}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
