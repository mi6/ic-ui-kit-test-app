import React, { useState, useRef, useCallback } from "react";
import "./index.css";
import {
  IcCheckbox,
  IcCheckboxGroup,
  IcRadioGroup,
  IcRadioOption,
  IcSelect,
  IcTextField,
  IcButton,
  IcSectionContainer,
  IcPageHeader,
  IcStepper,
  IcStep,
  IcTypography,
  IcToastRegion,
  IcToast,
  IcAlert,
  IcChip,
} from "@ukic/react";
import { IcDatePicker } from "@ukic/canary-react";
import {
  grindOptions,
  sizeOptions,
  next,
  back,
  initialFormValues,
  initialFormSteps,
} from "./constants";
import { FormValues, FormProps, Action } from "./types";
import { Navigate } from "react-router-dom";

const ChooseCoffeeForm: React.FC<FormProps> = ({
  formValues,
  formValidation,
  handleChange,
  handleClick,
}) => (
  <>
    <IcTypography className="form-text" variant="subtitle-large">
      Please choose your coffee
    </IcTypography>
    <IcTypography className="form-text" variant="body" maxLines={2}>
      Sip back and relax as we embark on a journey through the aromatic fields
      of coffee-inspired lorem ipsum. In the heart of a lush, verdant valley
      kissed by the golden hues of dawn, there lies a quaint little plantation
      where the beans of legend are nurtured. Each bean, a tiny vessel of dreams
      and whispers of faraway lands, cradled in the earth's embrace until it
      bursts forth with a promise of warmth and vigor.
    </IcTypography>
    <div className="input-container">
      <IcRadioGroup
        name="radio-group-1"
        label="What variety of coffee would you like?"
        helperText="House blend is the default option"
        size="small"
        required
        onIcChange={(ev) =>
          handleChange("coffeeForm", "variety", ev.detail.value)
        }
        {...(formValidation &&
          formValues.coffeeForm.variety === "" && {
            validationText: "Please choose an option",
            validationStatus: "error",
          })}
      >
        <IcRadioOption
          value="house"
          label="House Blend"
          selected={formValues.coffeeForm.variety === "house"}
        />
        <IcRadioOption
          value="liberica"
          label="Liberica"
          selected={formValues.coffeeForm.variety === "liberica"}
        />
        <IcRadioOption
          value="arabica"
          label="Arabica"
          selected={formValues.coffeeForm.variety === "arabica"}
        />
        <IcRadioOption
          value="mundo"
          label="Mundo Nova"
          selected={formValues.coffeeForm.variety === "mundo"}
        />
      </IcRadioGroup>
    </div>
    <div className="input-container">
      <IcSelect
        label="Grind"
        helperText="Please select a grind type"
        name="grind-select"
        options={grindOptions}
        size="small"
        className="input"
        value={formValues.coffeeForm.grind}
        onIcChange={(ev) =>
          handleChange("coffeeForm", "grind", ev.detail.value)
        }
      />
      <IcSelect
        label="Size"
        helperText="Please select a bag size"
        name="size-select"
        required
        options={sizeOptions}
        size="small"
        className="input"
        value={formValues.coffeeForm.size}
        onIcChange={(ev) => handleChange("coffeeForm", "size", ev.detail.value)}
        {...(formValidation &&
          formValues.coffeeForm.size === "" && {
            validationText: "Please choose a size",
            validationStatus: "error",
          })}
      />
    </div>
    <div className="input-container">
      <IcButton
        variant="primary"
        className="button"
        onClick={(ev) => handleClick(ev, next)}
        data-testid="coffee-submit-btn"
      >
        Add to order
      </IcButton>
    </div>
  </>
);

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

const Subscription: React.FC = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formSteps, setFormSteps] = useState(initialFormSteps);
  const [formValidation, setFormValidation] = useState(false);

  const handleClick = useCallback(
    (ev: React.MouseEvent, action: Action) => {
      ev.preventDefault();
      console.log(formValues);

      const handleNextStep = () => {
        const updatedFormSteps = { ...formSteps };

        if (formSteps.chooseCoffee.type === "current") {
          const { variety, grind, size } = formValues.coffeeForm;
          const showValidation = [variety, grind, size].some(
            (value) => value === "",
          );
          setFormValidation(showValidation);
          if (showValidation) return;

          updatedFormSteps.chooseCoffee = {
            ...formSteps.chooseCoffee,
            type: "completed",
          };
          updatedFormSteps.enterDetails = {
            ...formSteps.enterDetails,
            type: "current",
          };
        } else if (formSteps.enterDetails.type === "current") {
          const { name, email, phone } = formValues.detailForm;
          const showValidation =
            [name, email, phone].some((value) => value === "") ||
            !email.includes("@");
          setFormValidation(showValidation);
          if (showValidation) return;

          updatedFormSteps.chooseCoffee = {
            ...formSteps.chooseCoffee,
            type: "completed",
          };
          updatedFormSteps.enterDetails = {
            ...formSteps.enterDetails,
            type: "completed",
          };
          updatedFormSteps.checkout = {
            ...formSteps.checkout,
            type: "current",
          };
        } else {
          throw new Error("Invalid action");
        }
        setFormSteps(updatedFormSteps);
      };

      const handleBackStep = () => {
        const updatedFormSteps = { ...formSteps };

        if (formSteps.enterDetails.type === "current") {
          updatedFormSteps.chooseCoffee = {
            ...formSteps.chooseCoffee,
            type: "current",
          };
          updatedFormSteps.enterDetails = {
            ...formSteps.enterDetails,
            type: "active",
          };
        } else if (formSteps.checkout.type === "current") {
          updatedFormSteps.chooseCoffee = {
            ...formSteps.chooseCoffee,
            type: "completed",
          };
          updatedFormSteps.enterDetails = {
            ...formSteps.enterDetails,
            type: "current",
          };
          updatedFormSteps.checkout = {
            ...formSteps.checkout,
            type: "active",
          };
        } else {
          throw new Error("Invalid action");
        }
        setFormSteps(updatedFormSteps);
      };

      if (action === "next") {
        handleNextStep();
      } else {
        handleBackStep();
      }
    },
    [formSteps, formValues],
  );

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

  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const [redirect, setRedirect] = useState(false);

  const resetForm = () => {
    setFormValues(initialFormValues);
    setFormSteps(initialFormSteps);
    setRedirect(true);
  };

  const handleSubmit = () => {
    console.log(formValues);
    const { dateToStart, terms } = formValues.checkoutForm;
    setFormValidation(
      [dateToStart, terms].some((value) => value === "" || value === "decline"),
    );
    if (!formValidation && toastRegionEl.current && toastEl.current) {
      localStorage.setItem("formValues", JSON.stringify(formValues));
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  return redirect ? (
    <Navigate to="/view" />
  ) : (
    <>
      <IcPageHeader
        heading="Customise your coffee subscription"
        subheading="Choose your coffee, enter your details and checkout, easy as 1... 2... 3!"
        size="small"
        id="top"
        sticky
        aligned="full-width"
      >
        <IcChip slot="heading-adornment" label="v3.3.0" size="large" />
        <IcStepper slot="stepper">
          <IcStep heading="Choose coffee" type={formSteps.chooseCoffee.type} />
          <IcStep heading="Enter Details" type={formSteps.enterDetails.type} />
          <IcStep heading="Checkout" type={formSteps.checkout.type} />
        </IcStepper>
      </IcPageHeader>
      <IcSectionContainer aligned="full-width">
        {formValidation && (
          <IcAlert
            variant="error"
            heading="Error"
            message="Please fill in all required fields"
            announced
          />
        )}
        <form onSubmit={handleSubmit}>
          {formSteps.chooseCoffee.type === "current" && (
            <ChooseCoffeeForm
              formValues={formValues}
              formValidation={formValidation}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          )}
          {formSteps.enterDetails.type === "current" && (
            <EnterDetailsForm
              formValues={formValues}
              formValidation={formValidation}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          )}
          {formSteps.checkout.type === "current" && (
            <>
              <CheckoutForm
                formValues={formValues}
                formValidation={formValidation}
                handleChange={handleChange}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
              />
              <IcToastRegion ref={toastRegionEl}>
                <IcToast
                  heading="Thanks for your order! You will now be redirected to view your subscriptions."
                  ref={toastEl}
                  dismissMode="automatic"
                  autoDismissTimeout={2000}
                  variant="success"
                  onIcDismiss={() => resetForm()}
                />
              </IcToastRegion>
            </>
          )}
        </form>
      </IcSectionContainer>
    </>
  );
};

export default Subscription;
