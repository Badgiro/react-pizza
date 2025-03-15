import React, { useContext } from 'react'
import {SearchContext} from '../../App'
import styles from './style.module.css'
import Xmark from '../../assets/img/xmark-solid.svg'

const Search = () => {
  const {search, setSearch}= useContext(SearchContext)
  return (
    <div className={styles.root}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={styles.searchInput}
        placeholder="введите название пиццы
  "
        type="text"
      />
      {search && <img src={Xmark} onClick={()=> setSearch('')} alt="Close" className={styles.searchIcon} />}
    </div>
  )
}

export default Search
