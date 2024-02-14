import Link from 'next/link';
import React from 'react';

const MealsPage = ({ params }) => {
  return (
    <div>
      <h1>Meals Page</h1>
      <Link href="/meals/meal-1">Meal - 1</Link>
      <Link href="/meals/meal-2">Meal - 2</Link>
    </div>
  );
};

export default MealsPage;
