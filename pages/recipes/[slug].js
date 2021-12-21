import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Fallback from "../../components/Fallback";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const response = await client.getEntries({
    content_type: "recipe",
    "fields.slug": slug,
  });

  return {
    props: { recipe: response.items[0] },
    revalidate: 1,
  };
};

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Fallback />;

  console.log(recipe);
  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  console.log(ingredients);

  return (
    <div>
      <div className='banner'>
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width='800px'
          height='300px'
        />
        <h2>{title}</h2>
      </div>
      <div className='info'>
        <p>Takes About {cookingTime} mins to cook</p>
        <h3>Ingredients:</h3>
        {ingredients.map((ing) => {
          return <span key={ing}>{ing}</span>;
        })}
      </div>
      <div className='method'>
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
}
