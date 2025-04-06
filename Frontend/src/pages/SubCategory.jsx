import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard.jsx';

const SubCategory = () => {

  const [subCategories, setSubCategories] = useState([]);
  const {categoryID}= useParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}item/sub-category/${categoryID}`, {
      method: "GET",
      credentials: "include",
    });
    const json = await res.json();
    setSubCategories(json.data);

  }
  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    subCategories.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4  w-[90%] m-auto">
        {subCategories.map((category) => (
          <Link to={`/subCategory/${category._id}/products`} key={category._id}>
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

export default SubCategory;