import { IcStepTypes } from "@ukic/web-components";

interface CoffeeForm {
  variety: string;
  grind: string;
  size: string;
}

interface DetailForm {
  name: string;
  email: string;
  phone: string;
  contact: string[];
}

interface CheckoutForm {
  dateToStart: string;
  terms: string;
}

export interface FormValues {
  coffeeForm: CoffeeForm;
  detailForm: DetailForm;
  checkoutForm: CheckoutForm;
}

export interface StepTypes {
  type: IcStepTypes;
}

export interface FormSteps {
  chooseCoffee: StepTypes;
  enterDetails: StepTypes;
  checkout: StepTypes;
}

export interface FormProps {
  formValues: FormValues;
  formValidation: boolean;
  handleChange: (
    formSection: string,
    formValue: string,
    eventDetail: string | string[] | Date | null,
  ) => void;
  handleClick: (ev: React.MouseEvent, action: Action) => void;
  handleSubmit?: () => void;
}

export type Action = "next" | "back";
