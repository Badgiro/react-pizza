import { useState } from "react";
const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };
  const pizzaCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  // Render the list of pizza categories
  return (
    <div className="content__top">
      <div className="categories">
        <ul
          style={{
            display: "flex",

            flexWrap: "wrap",
          }}
        >
          {pizzaCategories.map((category, index) => (
            <li
              onClick={() => onClickCategory(index)}
              className={activeCategory === index ? "active" : ""}
              key={index}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
