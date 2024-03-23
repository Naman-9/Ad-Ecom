import React, { useState } from 'react';
import ProductCard from '../components/Product-Card';

const Search = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const addToCartHandler = () => {};

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>

        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ''}</h4>
          <input
            type="number"
            min={100}
            max={10000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          ></input>
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="asc">Sample 1</option>
            <option value="dsc">Sample 2</option>
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search-product-list">
          <ProductCard
            productId=""
            name=""
            price={43}
            photo="https://m.media-amazon.com/images/I/312wQIwK2TS._SX466_.jpg"
            stock={43}
            handler={addToCartHandler}
          />
        </div>

        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>
            Prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
