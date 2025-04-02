
import { useEffect, useState, useContext } from 'react'
import { setCategoryId } from '../../redux/slices/filterSlice'
import Categories from '../../components/categories'
import axios from 'axios'
import Sort from '../../components/sort'
import PizzaBlock from '../../components/pizzaBlock'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import Pagination from '../../components/pagination'
import { SearchContext } from '../../App'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const { categoryId, sort: sortBy } = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  const { search } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  console.log(currentPage)
 


  const getItems = async () => {
    try {
      const response = await axios.get(
        `https://6758135e60576a194d0eb1a9.mockapi.io/items`,
        {
          params: {
            category: categoryId > 0 ? categoryId : '',
            limit: 4,
            page: currentPage,
            search: search || '',
            sortBy: sortBy.sort.includes('-') ? sortBy.sort.replace('-', '') : sortBy.sort,
            order: sortBy.sort.includes('-') ? 'asc' : 'desc',
          },
        }
      )
      return response.data // axios автоматически извлекает данные из ответа
    } catch (error) {
      console.error('Failed to fetch items:', error)
      return [] // В случае ошибки возвращаем пустой массив
    }
  }

  useEffect(() => {
    setIsLoading(true) // Устанавливаем флаг загрузки в true
    const fetchData = async () => {
      const data = await getItems()
      setItems(data) // Устанавливаем данные в состояние
      setIsLoading(false) // Устанавливаем флаг загрузки в false
    }

    fetchData()
    window.scrollTo(0, 0)
  }, [categoryId, sortBy, search, currentPage])
  return (
    <div className="content__top">
      <div className="content">
        <div className="container">
          <Categories
            categoryId={categoryId}
            onClickCategory={(i) => onChangeCategory(i)}
          />
          <Sort />
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/* Проверяем, если данные загружены */}
            {isLoading
              ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
              : items?.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
        <Pagination page={currentPage} pagePatch={setCurrentPage} />
      </div>
    </div>
  )
}

export default Home
