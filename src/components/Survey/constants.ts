import { FormValues } from "./types";

export const initialFormValues: FormValues = {
  surveyForm: {
    drinks: "",
  },
};

export const drinkOptions = [
  { value: "Coffee", label: "Coffee" },
  { value: "Tea", label: "Tea" },
  { value: "Hot chocolate", label: "Hot chocolate" },
  { value: "Matcha", label: "Matcha" },
];
