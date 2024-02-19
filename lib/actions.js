'use server';

import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';
import { redirect } from 'next/navigation';

const isInvalidText = (text) => {
  return !text || text.trim() === '';
};

export const shareMeal = async (prevState, formData) => {
  // it guaranties that this func will execute only on server
  //   'use server';

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // ! Additional check for invalid or not filled inputs
  // ! for the case if someone removes the required prop
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    //   ! as a variant
    // throw new Error('Invalid input.');

    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  //   ? I wanna do it because by default Next.js caches data and does not revalidate them
  //   ? So we kind of get a static data
  //   ! Bacause of this we use revalidatePath on the exact path '/meals'
  revalidatePath('/meals');
  redirect('/meals');
};
