import React from "react";
import {
  IcRadioGroup,
  IcRadioOption,
  IcSelect,
  IcButton,
  IcTypography,
} from "@ukic/react";
import { grindOptions, sizeOptions, next } from "./constants";
import { FormProps } from "./types";

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

export default ChooseCoffeeForm;
