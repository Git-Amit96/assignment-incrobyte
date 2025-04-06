import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard.jsx';


const Category = () => {

  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}item/category`, {
      method: "GET",
      credentials: "include",
    });
    const json = await res.json();
    setCategories(json.data);

  }
  useEffect(() => {
    fetchCategories();
    
  }, [])

  return (
    categories.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] m-auto ">
        {categories.map((category) => (
          <Link to={`/category/${category._id}/subCategory`} key={category._id}>
            <ItemCard
              name={category.name}
              description={category.description}
            />
          </Link>
        ))}
      </div>
    ) : (
      <></>
    )
  );

};

export default Category;