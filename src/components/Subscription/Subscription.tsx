import React, { useState, useRef, useCallback } from "react";
import "./index.css";
import {
  IcSectionContainer,
  IcPageHeader,
  IcStepper,
  IcStep,
  IcToastRegion,
  IcToast,
  IcAlert,
  IcChip,
} from "@ukic/react";
import {
  initialFormValues,
  initialFormSteps,
} from "./constants";
import { FormValues, Action } from "./types";
import { Navigate } from "react-router-dom";
import ChooseCoffeeForm from "./ChooseCoffeeForm";
import EnterDetailsForm from "./EnterDetailsForm";
import CheckoutForm from "./CheckoutForm";

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
    const isInvalid = [dateToStart, terms].some((value) => value === "" || value === "decline");
    setFormValidation(isInvalid);
    
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
        <form onSubmit={(e) => e.preventDefault()}>
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
