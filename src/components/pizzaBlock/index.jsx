import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'
import margarita from '../../assets/img/margarita.jpg'
import { Link } from 'react-router-dom'

const PizzaBlock = ({ title, price, id, sizes, types }) => {
  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedType, setSelectedType] = useState(0)
  const { count } = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  ) || { count: 0 }

  const typeNames = ['Традиционное', 'Тонкое']
  const dispatch = useDispatch()

  const onClickAdd = () => {
    dispatch(
      addItem({
        title,
        price,
        id,
        imageUrl: margarita,
        size: sizes[selectedSize],
        type: typeNames[selectedType],
      })
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {' '}
      <div className="pizza-block">
       <Link to={`/pizza/${id}`} ><img className="pizza-block__image" src={margarita} alt="Pizza" /></Link> 
        <h4 className="pizza-block__title">{title}</h4>
        <div
          className="pizza-block__selector"
          style={{ background: 'lightGray' }}
        >
          <ul>
            {types.map((type) => {
              return (
                <li
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? 'active' : ''}
                  key={type}
                >
                  {' '}
                  {typeNames[type]}
                </li>
              )
            })}
          </ul>
          <ul>
            {sizes.map((size, i) => {
              return (
                <li
                  onClick={() => setSelectedSize(i)}
                  className={selectedSize === i ? 'active' : ''}
                  key={i}
                >
                  {size} см.
                </li>
              )
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
