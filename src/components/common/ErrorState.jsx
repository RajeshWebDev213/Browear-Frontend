import { RotateCcw } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
}) {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center">

      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">

        <RotateCcw
          size={42}
          className="text-red-500"
        />

      </div>

      <h2 className="text-3xl font-bold mt-6">
        {title}
      </h2>

      <p className="mt-4 text-gray-500 max-w-md leading-7">
        {description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
          mt-8
          px-8
          py-3
          rounded-xl
          bg-black
          text-white
          hover:bg-zinc-800
          transition
          "
        >
          Try Again
        </button>
      )}

    </section>
  );
}

export default ErrorState;