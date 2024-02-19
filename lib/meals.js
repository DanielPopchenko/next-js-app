import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// ! this func wouldn`t normally return a Promise, but async wraps it inside one
export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // ! all() is used instead of run when fetching data
  // ? So here we simply say, return all the rows of the meals table
  return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = (slug) => {
  // .get(slug) here we do it like this instead inserting as a str
  // because it is more secure
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });

  // ! sanitized instructions
  meal.instructions = xss(meal.instructions);

  // getting the file extention of an image
  const extention = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  // () => {} is the fenction that will be executed when the buffer is done
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving an image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `,
  ).run(meal);
};
