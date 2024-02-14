import React from 'react';

const MealPage = ({ params }) => {
  return (
    <div>
      <h1>Meal Page</h1>
      <p>My Meal: {params.mealSlug}</p>
    </div>
  );
};

export default MealPage;
