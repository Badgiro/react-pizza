import { useContext, useRef } from 'react'
import { SearchContext } from '../../App'
import styles from './style.module.css'
import Xmark from '../../assets/img/xmark-solid.svg'

const Search = () => {
  const inputRef = useRef(null)
  const { search, setSearch } = useContext(SearchContext)
  const onClickXmark = () => {
    setSearch('')
    inputRef.current.focus()
  }

  return (
    <div className={styles.root}>
  

      <input
        ref={inputRef}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={styles.searchInput}
        placeholder="введите название пиццы
  "
        type="text"
      />
      {search && (
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
