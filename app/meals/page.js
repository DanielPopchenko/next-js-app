import Link from 'next/link';
import React, { Suspense } from 'react';

import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All meals',
  description: 'Browse all delicious meals, shared by a food-loving community.',
};

const Meals = async () => {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
};

//  ? I can convert server components into a async function
const MealsPage = async () => {
  // ? and here await my fetch

  // const meals = await getMeals();
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals created <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favourite recipe and cook it yourself. It is easy and fun!</p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your fav recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<p className={styles.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
