import Subscription from "../Subscription.tsx";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { screen, findByShadowLabelText } from "shadow-dom-testing-library";

const formValues = {
  grind: "whole",
  variety: "house",
  size: "250",
  name: "John Doe",
  email: "johndoe@email.com",
  phone: "1234567890",
  contact: ["sms", "email"],
};

const filledForm = (page?: string): object => {
  const date = new Date();
  return {
    checkoutForm: {
      dateToStart: page === "checkout" ? date : "",
      terms: page === "checkout" ? "agree" : "",
    },
    coffeeForm: {
      grind: formValues.grind,
      size: formValues.size,
      variety: formValues.variety,
    },
    detailForm: {
      contact: [
        page === "details" || page === "checkout" ? formValues.contact[0] : "",
        page === "details" || page === "checkout" ? formValues.contact[1] : "",
      ],
      email: page === "details" || page === "checkout" ? formValues.email : "",
      name: page === "details" || page === "checkout" ? formValues.name : "",
      phone: page === "details" || page === "checkout" ? formValues.phone : "",
    },
  };
};

const stepStates = {
  current: "current",
  completed: "completed",
};

describe("Subscription component", () => {
  let container: HTMLElement;
  let callbackFn: jest.Mock;
  let logSpy: jest.SpyInstance;
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    const renderResult = render(<Subscription />);
    container = renderResult.container;
    user = userEvent.setup();
    container.addEventListener("icChange", callbackFn);
    callbackFn = jest.fn();
    logSpy = jest.spyOn(global.console, "log");
  });

  afterEach(() => {
    container.removeEventListener("icChange", callbackFn);
    jest.restoreAllMocks();
  });

  it("renders", async () => {
    const { container } = render(<Subscription />);
    expect(container).not.toBeNull();
  });
  it("fills out values on the chooseCoffee page, tests for an error, and submits", async () => {
    container.addEventListener("icChange", callbackFn);

    // Check the current form step
    const stepOne = container.querySelector(
      'ic-step[heading="Choose coffee"]',
    ) as HTMLIcStepElement;
    expect(stepOne.type).toBe(stepStates.current);

    // Select radio-option from ic-radio-group
    const coffeeRadio = container.querySelector(
      'ic-radio-option[value="house"]',
    ) as HTMLIcRadioOptionElement;

    await user.click(coffeeRadio);

    expect(callbackFn).toHaveBeenCalled();
    expect(coffeeRadio.selected).toBe(true);

    // Try submitting to see error state
    const coffeeSubmit = screen.getByShadowTestId(
      "coffee-submit-btn",
    ) as HTMLIcButtonElement;
    await user.click(coffeeSubmit);

    // ic-alert should be visible
    const alert = container.querySelector("ic-alert") as HTMLIcAlertElement;
    expect(alert).not.toBeNull();

    // Select size from ic-select
    const sizeSelect = container.querySelector(
      'ic-select[label="Size"]',
    ) as HTMLIcSelectElement;

    // find ic-menu in the shadowRoot of ic-select
    const sizeMenuOption = await findByShadowLabelText(sizeSelect, "250g");
    await user.click(sizeMenuOption);
    expect(callbackFn).toHaveBeenCalled();

    // Submit first page of form
    await user.click(coffeeSubmit);
    expect(logSpy).toHaveBeenNthCalledWith(2, filledForm());

    // Check second page is loaded
    const stepTwo = container.querySelector(
      'ic-step[heading="Enter Details"]',
    ) as HTMLIcStepElement;
    expect(stepTwo.type).toBe(stepStates.current);

    const detailsTypography = (await screen.findByShadowText(
      "Please enter your details",
    )) as HTMLIcTypographyElement;
    await waitFor(() => {
      expect(detailsTypography).toHaveClass("hydrated");
    });
  });
});
