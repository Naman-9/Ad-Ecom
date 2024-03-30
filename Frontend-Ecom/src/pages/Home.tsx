import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Product-Card';
import { useLatestProductsQuery } from '../redux/api/productApi';
import toast from 'react-hot-toast';
import Loader, { SkeletonLoader } from '../components/Loader';

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery('');

  const addToCartHandler = () => {};

  if (isError) toast.error('Cannot Fetch Products.');

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search">More</Link>
      </h1>

      <main>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              photo={i.photo}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
