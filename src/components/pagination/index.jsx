import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './style.module.css'

const Pagination = () => {
  return (
    <>
    <ReactPaginate className={styles.root}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={ (e)=> console.log(e)}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </>
  )
}

export default Pagination