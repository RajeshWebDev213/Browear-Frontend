import toast from "react-hot-toast";

/*
=========================================
SUCCESS TOAST
=========================================
*/

export const showSuccess = (
  message
) => {

  toast.success(message);

};

/*
=========================================
ERROR TOAST
=========================================
*/

export const showError = (
  message
) => {

  toast.error(message);

};

/*
=========================================
LOADING TOAST
=========================================
*/

export const showLoading = (
  message = "Loading..."
) => {

  return toast.loading(message);

};

/*
=========================================
DISMISS TOAST
=========================================
*/

export const dismissToast = (
  toastId
) => {

  toast.dismiss(toastId);

};

/*
=========================================
PROMISE TOAST
=========================================
*/

export const showPromise = (
  promise,
  loadingMessage,
  successMessage,
  errorMessage
) => {

  return toast.promise(
    promise,
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    }
  );

};

/*
=========================================
CUSTOM TOAST
=========================================
*/

export const showCustom = (
  message
) => {

  toast(message);

};