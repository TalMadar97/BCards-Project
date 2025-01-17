export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])/;
export const phoneRegex = /^0[0-9]+$/;
export const positiveNumberRegex = /^(?!0(\.0+)?$)[+]?\d*\.?\d+$/;

export const urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;
