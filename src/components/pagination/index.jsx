import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './style.module.scss'

const Pagination = ({page, pagePatch}) => {
  return (
    <>
    <ReactPaginate className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={ (e)=> pagePatch(+ e.selected+1)}
        value={page}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      </>
  )
}

export default Pagination