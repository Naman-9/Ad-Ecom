import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/Product-Card'

const Home = () => {

  const addToCartHandler = () => {

  }

  return (
    <div className='home'>
      <section></section>

      <h1>Latest Products
        <Link to="/search">More</Link>
      </h1>

      <main>
        <ProductCard productId='' name='' price={43} photo='https://m.media-amazon.com/images/I/312wQIwK2TS._SX466_.jpg' stock={43} handler={addToCartHandler}/>
      </main>

    </div>
  )
}

export default Home