import React from "react";
import {
  IcRadioGroup,
  IcRadioOption,
  IcButton,
  IcTypography,
} from "@ukic/react";
import { IcDatePicker } from "@ukic/canary-react";
import { back } from "./constants";
import { FormProps } from "./types";

const CheckoutForm: React.FC<FormProps> = ({
  formValues,
  formValidation,
  handleChange,
  handleClick,
  handleSubmit,
}) => (
  <>
    <IcTypography className="form-text" variant="subtitle-large">
      Last step!
    </IcTypography>
    <IcTypography className="form-text" variant="body">
      Please choose a start date for your subscription and agree to the terms
      and conditions. Feel free to cancel your subscriptions at any time.
    </IcTypography>
    <div className="input-container">
      <IcDatePicker
        label="When would you like your subscription to start?"
        className="input"
        disablePast
        required
        size="small"
        data-testid="date-picker"
        value={formValues.checkoutForm.dateToStart}
        onIcChange={(ev) =>
          handleChange("checkoutForm", "dateToStart", ev.detail.value)
        }
        {...(formValidation &&
          formValues.checkoutForm.dateToStart === "" && {
            validationText: "Please choose a date",
            validationStatus: "error",
          })}
      />
    </div>
    <div className="input-container">
      <IcRadioGroup
        label="Please agree to the terms and conditions"
        name="terms"
        required
        className="input"
        size="small"
        onIcChange={(ev) =>
          handleChange("checkoutForm", "terms", ev.detail.value)
        }
        {...(((formValidation && formValues.checkoutForm.terms === "") ||
          (formValidation && formValues.checkoutForm.terms === "decline")) && {
          validationText: "Please agree to the terms and conditions",
          validationStatus: "error",
        })}
      >
        <IcRadioOption
          label="Agree"
          name="agree"
          value="agree"
          selected={formValues.checkoutForm.terms === "agree"}
        />
        <IcRadioOption
          label="Decline"
          name="decline"
          value="decline"
          selected={formValues.checkoutForm.terms === "decline"}
        />
      </IcRadioGroup>
    </div>
    <div className="input-container">
      <IcButton
        variant="secondary"
        onClick={(ev) => handleClick(ev, back)}
        className="button"
      >
        Go Back
      </IcButton>
      <IcButton variant="primary" onClick={handleSubmit} className="button">
        Submit order
      </IcButton>
    </div>
  </>
);

export default CheckoutForm;
