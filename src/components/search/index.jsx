import React from "react";
import styles from "./style.module.css";

const Search = () => {
  return (
    <div className={styles.root}>
      <input
        className={styles.searchInput}
        placeholder="введите название пиццы
  "
        type="text"
      />
    </div>
  );
};

export default Search;
