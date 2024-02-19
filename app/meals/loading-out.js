import React from 'react';
import styles from './loading.module.css';

// ! loading.js is a reserved name, and it will become active when any
// ! its siblings or nested siblings are downloading some data
// ? So it is shown as a FALLBACK until the data is there

const MealsLoadingPage = () => {
  return <p className={styles.loading}>Fetching meals...</p>;
};

export default MealsLoadingPage;
