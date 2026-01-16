import React from "react";
import {
  IcCheckbox,
  IcCheckboxGroup,
  IcTextField,
  IcButton,
  IcTypography,
} from "@ukic/react";
import { next, back } from "./constants";
import { FormProps } from "./types";

const EnterDetailsForm: React.FC<FormProps> = ({
  formValues,
  formValidation,
  handleChange,
  handleClick,
}) => (
  <>
    <IcTypography className="form-text" variant="subtitle-large">
      Please enter your details
    </IcTypography>
    <IcTypography className="form-text" variant="body">
      Nearly there, we just need a few more details. Purchases must be made by
      an adult over the age of 18. We will never share your details with fourth
      parties.
    </IcTypography>
    <div className="input-container">
      <IcTextField
        label="Name"
        name="name"
        required
        className="input"
        size="small"
        value={formValues.detailForm.name}
        onIcChange={(ev) => handleChange("detailForm", "name", ev.detail.value)}
        {...(formValidation &&
          formValues.detailForm.name === "" && {
            validationText: "Please enter your name",
            validationStatus: "error",
          })}
        autoFocus
      />
      <IcTextField
        label="Email"
        name="email"
        type="email"
        required
        size="small"
        className="input"
        value={formValues.detailForm.email}
        onIcInput={(ev) => handleChange("detailForm", "email", ev.detail.value)}
        {...(formValidation &&
          (formValues.detailForm.email === "" ||
            !formValues.detailForm.email.includes("@")) && {
            validationText: "Please enter a valid email",
            validationStatus: "error",
          })}
        data-test-id="email-text-field"
      />
      <IcTextField
        label="Phone"
        name="phone"
        type="number"
        required
        size="small"
        className="input"
        value={formValues.detailForm.phone}
        onIcInput={(ev) => handleChange("detailForm", "phone", ev.detail.value)}
        {...(formValidation &&
          formValues.detailForm.phone === "" && {
            validationText: "Please enter a number on which we can contact you",
            validationStatus: "error",
          })}
      />
    </div>
    <div className="input-container">
      <IcCheckboxGroup
        name="signup"
        onIcChange={(ev) =>
          handleChange("detailForm", "contact", ev.detail.value)
        }
        label="Sign up for notifications about future products?"
        className="input"
      >
        <IcCheckbox
          label="SMS"
          name="sms"
          value="sms"
          checked={formValues.detailForm.contact.includes("sms")}
        />
        <IcCheckbox
          label="Email"
          name="email"
          value="email"
          checked={formValues.detailForm.contact.includes("email")}
        />
      </IcCheckboxGroup>
    </div>
    <div className="input-container">
      <IcButton
        variant="secondary"
        onClick={(ev) => handleClick(ev, back)}
        className="button"
      >
        Go Back
      </IcButton>
      <IcButton
        variant="primary"
        onClick={(ev) => handleClick(ev, next)}
        className="button"
        data-testid="details-submit-btn"
      >
        Add to order
      </IcButton>
    </div>
  </>
);

export default EnterDetailsForm;
