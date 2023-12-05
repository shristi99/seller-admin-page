import React, { useState, useEffect } from "react";
import classes from "./home.module.css";


const Home = () => {
  const [products, setProducts] = useState([]);
  
//we are using useffect here because whenever a page reloads.we will not lose our data,it will fetch from local srorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const price = event.target.price.value;
    const name = event.target.name.value;
    const category = document.getElementById("select").value;

    const newProduct = {
      price,
      name,
      category,
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // Reset form fields
    event.target.reset();
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((product, i) => i !== index);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className={classes.home}>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="price">Product Price: </label>
          <input type="number" id="price" required />
          <label htmlFor="name">Product Name: </label>
          <input type="text" id="name" required />
          <label htmlFor="category">Category: </label>
          <select name="category" id="select">
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
          </select>
        <button>Add product</button>
        </div>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>
              <p>Product Name: {product.name}</p>
              <p>Product Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;