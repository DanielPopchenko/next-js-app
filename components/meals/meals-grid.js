import React from 'react';
import styles from './meals-grid.module.css';
import MealItem from './meal-item';

const MealsGrid = ({ meals }) => {
  return (
    <div>
      <ul className={styles.meals}>
        {meals.map((meal) => (
          <MealItem key={meal.id} {...meal}></MealItem>
        ))}
      </ul>
    </div>
  );
};

export default MealsGrid;
