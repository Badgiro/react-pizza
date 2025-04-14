import { useEffect, useState, useContext, useCallback, useRef } from 'react'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../../redux/slices/filterSlice'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import Categories from '../../components/categories'
import axios from 'axios'
import Sort from '../../components/sort'
import PizzaBlock from '../../components/pizzaBlock'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import Pagination from '../../components/pagination'
import { sortValues } from '../../components/sort/constants'

import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const {
    categoryId,
    sort: sortBy,
    search,
    currentPage,
  } = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  // Флаг для отслеживания поиска
  const isMounted = useRef(false) // Флаг для отслеживания монтирования компонента
  const isSearch = useRef(false) // Флаг для отслеживания поиска
  console.log(categoryId)
  const onChangePAge = (number) => {
    dispatch(setCurrentPage(number))
  }
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const getItems = useCallback(async () => {
    try {
      console.log(search)
      const response = await axios.get(
        `https://6758135e60576a194d0eb1a9.mockapi.io/items`,
        {
          params: {
            category: categoryId > 0 ? categoryId : '',
            limit: 4,
            page: currentPage,
            title: search || '',
            sortBy: sortBy.sort.includes('-')
              ? sortBy.sort.replace('-', '')
              : sortBy.sort,
            order: sortBy.sort.includes('-') ? 'asc' : 'desc',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error('Failed to fetch items:', error)
      return []
    }
  }, [categoryId, currentPage, sortBy.sort, search])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortBy.sort,
        categoryId,
        title: search || '', // добавляем search (undefined не попадёт в URL)
        currentPage,
      })
      navigate(`?${queryString}`) // Обновляем URL с параметрами
    }
    isMounted.current = true // Устанавливаем флаг монтирования в true
  }, [categoryId, currentPage, sortBy.sort, dispatch, search, navigate])

  useEffect(() => {
    setIsLoading(true) // Устанавливаем флаг загрузки в true
    const fetchData = async () => {
      const data = await getItems()

      setItems(data) // Устанавливаем данные в состояние
      setIsLoading(false) // Устанавливаем флаг загрузки в false
    }
    if (!isSearch.current) {
      fetchData()
      isSearch.current = true // Устаннавливаем флаг поиска в true
    } else {
      isSearch.current = false // Сбрасываем флаг поиска после первого рендера
    }
    isSearch.current = false

    // Сбрасываем флаг поиска после первого рендера
    window.scrollTo(0, 0)
  }, [getItems, search, categoryId, currentPage, sortBy.sort])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortValues.find((obj) => obj.sort === params.sortBy)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
    }
  }, [categoryId, currentPage, search, sortBy.sort, dispatch])

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
          <div
            style={{ gridTemplateRows: 'repeat (1, 1fr)' }}
            className="content__items"
          >
            {/* Проверяем, если данные загружены */}
            {isLoading
              ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
              : items?.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
        <Pagination page={currentPage} pagePatch={onChangePAge} />
      </div>
    </div>
  )
}

export default Home
