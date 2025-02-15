
const Categories = ({categoryId, onClickCategory}) => {
  

  
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
              className={categoryId === index ? "active" : ""}
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
