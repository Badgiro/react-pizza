import { useEffect, useState } from "react";
import Categories from "../../components/categories";
import Sort from "../../components/sort";
import PizzaBlock from "../../components/pizzaBlock";
import Skeleton from "../../components/pizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortBy, setSortBy] = useState({
    name: "популярности(ASC)",
    sort: "rating",
  });

  const getItems = async () => {
    try {
      const response = await fetch(
        ` https://6758135e60576a194d0eb1a9.mockapi.io/items?category=${
          categoryId > 0 ? categoryId : ""
        }&sortBy=${
          sortBy.sort.includes("-")
            ? sortBy.sort.replace("-", "") || sortBy.sort + "&order=asc"
            : sortBy.sort + "&order=desc"
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // API возвращает массив данных
    } catch (error) {
      console.error("Failed to fetch items:", error);
      return []; // В случае ошибки возвращаем пустой массив
    }
  };

  useEffect(() => {
    setIsLoading(true); // Устанавливаем флаг загрузки в true
    const fetchData = async () => {
      const data = await getItems();
      setItems(data); // Устанавливаем данные в состояние
      setIsLoading(false); // Устанавливаем флаг загрузки в false
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortBy]);
  return (
    <div className="content__top">
      <div className="content">
        <div className="container">
          <Categories
            categoryId={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />
          <Sort sortBy={sortBy} onClickSort={(i) => setSortBy(i)} />
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/* Проверяем, если данные загружены */}
            {isLoading
              ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
              : items?.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
