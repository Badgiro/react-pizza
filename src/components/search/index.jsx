import { useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../redux/slices/filterSlice'
import debounce from 'lodash.debounce'
import styles from './style.module.css'
import Xmark from '../../assets/img/xmark-solid.svg'

const Search = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  // Мемоизируем debounce один раз при монтировании
  const debouncedSearch = useCallback(
    debounce((str) => {
      console.log('Searching:', str)
      dispatch(setSearch(str))
    }, 500),
    [dispatch] // Зависимости для useCallback
  )

  const onChangeInput = (e) => {
    setValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  const onClickXmark = () => {
    debouncedSearch.cancel() // Отменяем отложенный вызов
    dispatch(setSearch(''))
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className={styles.searchInput}
        placeholder="Введите название пиццы"
        type="text"
      />
      {value && (
        <img
          src={Xmark}
          onClick={onClickXmark}
          alt="Close"
          className={styles.searchIcon}
        />
      )}
    </div>
  )
}

export default Search
