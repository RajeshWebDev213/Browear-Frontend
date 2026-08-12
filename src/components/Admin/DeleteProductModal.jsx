import { Trash2, X } from "lucide-react";

function DeleteProductModal({

  isOpen,

  onClose,

  onDelete,

  loading,

}) {

  if (!isOpen) return null;

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-xl
        p-8
        shadow-xl
        "
      >

        <div className="flex justify-center">

          <div
            className="
            w-16
            h-16
            rounded-full
            bg-red-100
            flex
            items-center
            justify-center
            "
          >

            <Trash2
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        <h2
          className="
          text-2xl
          font-bold
          text-center
          mt-5
          "
        >

          Delete Product

        </h2>

        <p
          className="
          text-center
          text-gray-500
          mt-3
          "
        >

          Are you sure you want to delete this product?

        </p>

        <div
          className="
          flex
          gap-4
          mt-8
          "
        >

          <button

            onClick={onClose}

            className="
            flex-1
            py-3
            rounded-xl
            border
            "

          >

            Cancel

          </button>

          <button

            onClick={onDelete}

            disabled={loading}

            className="
            flex-1
            py-3
            rounded-xl
            bg-red-600
            text-white
            "

          >

            {

              loading

                ? "Deleting..."

                : "Delete"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteProductModal;