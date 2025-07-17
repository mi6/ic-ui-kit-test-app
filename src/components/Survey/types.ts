interface SurveyForm {
  drinks: string;
}

export interface FormValues {
  surveyForm: SurveyForm;
}

export interface FormProps {
  formValues: FormValues;
  formValidation: boolean;
  handleChange: (
    formSection: string,
    formValue: string,
    eventDetail: string | string[] | Date | null,
  ) => void;
  handleSubmit?: () => void;
}
