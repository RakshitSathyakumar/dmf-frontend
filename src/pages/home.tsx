import { Link } from "react-router-dom";
import { ProductCard } from "../components/product-card";

const Home = () => {
  const addToCartHandler = () => {};
  return (
    <div className="home">
      <section> </section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          more
        </Link>
      </h1>
      <main>
        <ProductCard
          name="hi"
          photo="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/07/The-Office-Michael-Scott-Age.jpg"
          price={32}
          stock={2}
          handler={addToCartHandler}
          productId="21"
        />
      </main>
    </div>
  );
};

export default Home;
