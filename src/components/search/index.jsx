import { useContext, useState, useCallback, useRef } from 'react'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'
import styles from './style.module.css'
import Xmark from '../../assets/img/xmark-solid.svg'

const Search = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const { search, setSearch } = useContext(SearchContext)

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearch(str)
    }, 500),
    []
  )
  const onchangeInput = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const onClickXmark = () => {
    setSearch('')
    setValue('')
    inputRef.current.focus()
  }

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        onChange={onchangeInput}
        value={value}
        className={styles.searchInput}
        placeholder="введите название пиццы
  "
        type="text"
      />
      {value && (
        <img
          src={Xmark}
          onClick={() => onClickXmark()}
          alt="Close"
          className={styles.searchIcon}
        />
      )}
    </div>
  )
}

export default Search
