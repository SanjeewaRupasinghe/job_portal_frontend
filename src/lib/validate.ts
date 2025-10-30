export const validateIsNotEmpty = (value: string) => {
  if (!value) {
    return "This field is required";
  }
  return null;
};
