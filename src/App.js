import "./scss/app.scss";
import Header from "./components/header";
import Categories from "./components/categories";
import Sort from "./components/sort";
import PizzaBlock from "./components/pizzaBlock";
import pizzas from "./assets/pizza.json";

function App() {
  console.log(pizzas);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Categories />
          {/*  */}
          <Sort />
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => {
              return (
                <PizzaBlock
                  key={pizza.id}
                  sizes={pizza.sizes}
                  title={pizza.title}
                  price={pizza.price}
                  pizzaImg={pizza.imageUrl}
                />
              );
            })}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
