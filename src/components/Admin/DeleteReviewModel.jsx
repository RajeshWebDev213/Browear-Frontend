import { Trash2 } from "lucide-react";

function DeleteReviewModal({

  isOpen,

  loading,

  onClose,

  onDelete,

}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-md">

        <div className="flex justify-center">

          <Trash2

            size={40}

            className="text-red-600"

          />

        </div>

        <h2 className="text-2xl font-bold text-center mt-5">

          Delete Review

        </h2>

        <p className="text-center text-gray-500 mt-2">

          This action cannot be undone.

        </p>

        <div className="flex gap-4 mt-8">

          <button

            onClick={onClose}

            className="
            flex-1
            border
            py-3
            rounded-xl
            "

          >

            Cancel

          </button>

          <button

            onClick={onDelete}

            disabled={loading}

            className="
            flex-1
            bg-red-600
            text-white
            py-3
            rounded-xl
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

export default DeleteReviewModal;