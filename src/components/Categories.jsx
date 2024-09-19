import { useState, useEffect } from "react";
import searchCategories from "../utils/searchCategories";
import createCategoriesArray from "../utils/createCategoriesArray";

function Categories({ categoriesArr }) {
  return (
    <div>
      <h2>Categories</h2>
      {/* <ul>
        {categoriesArr.map((category) => (
          <li key={key}>{category.name}</li>
        ))}
      </ul> */}
    </div>
  );
}
export default Categories;
