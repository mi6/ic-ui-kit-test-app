import React, { useState, useRef } from "react";
import "./index.css";
import {
  IcSelect,
  IcButton,
  IcSectionContainer,
  IcPageHeader,
  IcToastRegion,
  IcToast,
} from "@ukic/react";
import { drinkOptions, initialFormValues } from "./constants";
import { FormValues, FormProps } from "./types";
import { Navigate } from "react-router-dom";

const SurveyForm: React.FC<FormProps> = ({
  formValues,
  formValidation,
  handleChange,
  handleSubmit,
}) => (
  <>
    <div className="input-container">
      <IcSelect
        label="What do you drink regularly?"
        helperText="Drinks that you have more than once a week"
        name="drinks-select"
        required
        multiple
        options={drinkOptions}
        size="small"
        className="input"
        value={formValues.surveyForm.drinks}
        onIcChange={(ev) =>
          handleChange("surveyForm", "drinks", ev.detail.value)
        }
        {...(formValidation &&
          formValues.surveyForm.drinks === "" && {
            validationText: "Please choose at least one drink",
            validationStatus: "error",
          })}
      />
    </div>
    <div className="input-container">
      <IcButton variant="primary" onClick={handleSubmit} className="button">
        Submit
      </IcButton>
    </div>
  </>
);

const Survey: React.FC = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formValidation, setFormValidation] = useState(false);

  const handleChange = (
    formSection: string,
    formValue: string,
    eventDetail: string | string[] | Date | null,
  ) => {
    setFormValues({
      ...formValues,
      [formSection]: {
        ...formValues[formSection as keyof FormValues],
        [formValue]: eventDetail,
      },
    });
  };

  const handleSubmit = () => {
    console.log(formValues);
    const { drinks } = formValues.surveyForm;
    const ok = drinks !== "" && drinks.length > 0;
    setFormValidation(!ok);

    if (ok && toastRegionEl.current && toastEl.current) {
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const [redirect, setRedirect] = useState(false);

  const resetForm = () => {
    setFormValues(initialFormValues);
    setRedirect(true);
  };

  return redirect ? (
    <Navigate to="/" />
  ) : (
    <>
      <IcPageHeader
        heading="Take our survey"
        subheading="Help us out by taking our survey and receive a free gift!"
        size="small"
        id="top"
        sticky
        aligned="full-width"
      ></IcPageHeader>
      <IcSectionContainer aligned="full-width">
        <form onSubmit={handleSubmit}>
          <SurveyForm
            formValues={formValues}
            formValidation={formValidation}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <IcToastRegion ref={toastRegionEl}>
            <IcToast
              heading="Thanks for your feedback! You will now be redirected to the homepage."
              ref={toastEl}
              dismissMode="automatic"
              autoDismissTimeout={2000}
              variant="success"
              onIcDismiss={() => resetForm()}
            />
          </IcToastRegion>
        </form>
      </IcSectionContainer>
    </>
  );
};

export default Survey;
