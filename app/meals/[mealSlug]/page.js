import React from 'react';

import styles from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// ! this func recieves the same data as our component function
export const generateMetadata = async ({ params }) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

// ! Next Js pases an object to all reserved files like page.js
const MealPage = ({ params }) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    // ! triggers the closest notFound page and stops current component from execution
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>

        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealPage;
