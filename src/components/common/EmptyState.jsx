import { Link } from "react-router-dom";

function EmptyState({
  image,
  title,
  description,
  buttonText,
  buttonLink = "/",
}) {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center">

      {image && (
        <img
          src={image}
          alt={title}
          className="w-52 h-52 object-contain mb-8"
        />
      )}

      <h2 className="text-3xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-4 text-gray-500 max-w-md leading-7">
        {description}
      </p>

      {buttonText && (
        <Link to={buttonLink}>
          <button
            className="
            mt-8
            px-8
            py-3
            bg-black
            text-white
            rounded-xl
            hover:bg-zinc-800
            transition
            "
          >
            {buttonText}
          </button>
        </Link>
      )}

    </section>
  );
}

export default EmptyState;