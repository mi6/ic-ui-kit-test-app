/// <reference types="cypress" />

import { mount } from "cypress/react";
import React from "react";
import Subscription from "../../src/components/Subscription/Subscription";
import {
  BE_VISIBLE,
  HAVE_ATTR,
  HAVE_BEEN_CALLED_WITH,
  NOT_HAVE_ATTR,
} from "../utils/cyConstants";

//* CONSTANTS
// ICDS Components
const IC_PAGE_HEADER = "ic-page-header";
const IC_STEPPER = "ic-stepper";
const IC_STEP = "ic-step";
const IC_ALERT = "ic-alert";
const IC_RADIO_OPTION = "ic-radio-option";
const IC_SELECT = "ic-select";
const IC_INPUT_CONTAINER = "ic-input-component-container";
const IC_MENU_OPTION = "ic-menu li";
const IC_TEXT_FIELD = "ic-text-field";
const IC_CHECKBOX = "ic-checkbox";
const IC_BUTTON = "ic-button";
const IC_DATE_PICKER = "ic-date-picker";
const IC_DATE_INPUT = "ic-date-input";
// HTML Elements
const CALENDAR_BUTTON_ID = "#calendar-button";
const FOCUSSED_DAY_BTN_CLASS = "button.day-button.focussed";
const CHECKBOX = '[type="checkbox"]';
const RADIO = '[type="radio"]';
const DAY_INPUT = ".day-input";
const MONTH_INPUT = ".month-input";
const YEAR_INPUT = ".year-input";
// Keyboard keys
const ESCAPE_KEY = "Escape";
const ARROW_DOWN_KEY = "ArrowDown";
const TAB_KEY = "Tab";
// Other
const CONSOLE_LOG = "@consoleLog";
const DATE_VAL = "val";
const STEP_TYPE = "type";
const CURRENT = "current";
const CHECKED = "checked";
const SELECTED = "selected";
const VALIDATION_STATUS = "validation-status";
const ERROR = "error";

//* METHODS
const checkCurrentStep = (step: number) => {
  cy.get(IC_STEP)
    .eq(step)
    .should(BE_VISIBLE)
    .should(HAVE_ATTR, STEP_TYPE, CURRENT);
};

const findShadowEl = (
  element: string,
  selector: string,
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(`${element}`).shadow().find(`${selector}`);

const findEl = (
  element: string,
  selector: string,
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(`${element}`).find(`${selector}`);

const clickOnShadowEl = (
  element: string,
  selector: string,
  order: number = 0,
): void => {
  cy.get(element).shadow().find(selector)?.eq(order).click();
};

const checkDateInputValue = (date: Date | null) => {
  const currDay = (date && date.getDate()) || 0;
  const currMon = (date && date.getMonth() + 1) || 0;
  const currYear = (date && date.getFullYear()) || 0;
  let dayVal: number;
  let monthVal: number;
  let yearVal: number;
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
    .shadow()
    .find(DAY_INPUT)
    .invoke(DATE_VAL)
    .then((val) => {
      dayVal = Number(val);
    })
    .then(() => {
      expect(dayVal).to.eq(currDay);
    });
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
    .shadow()
    .find(MONTH_INPUT)
    .invoke(DATE_VAL)
    .then((val) => {
      monthVal = Number(val);
    })
    .then(() => {
      expect(monthVal).to.eq(currMon);
    });
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
    .shadow()
    .find(YEAR_INPUT)
    .invoke(DATE_VAL)
    .then((val) => {
      yearVal = Number(val);
    })
    .then(() => {
      expect(yearVal).to.eq(currYear);
    });
};

const formValues = {
  grind: "aeropress",
  variety: "house",
  size: "250",
  name: "John Doe",
  email: "johndoe@email.com",
  phone: "1234567890",
  contact: ["sms", "email"],
};

const filledForm = (page?: string): object => {
  return {
    checkoutForm: {
      dateToStart: page === "checkout" ? new Date() : "",
      terms: page === "checkout" ? "agree" : "",
    },
    coffeeForm: {
      variety: formValues.variety,
      grind: formValues.grind,
      size: formValues.size,
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

describe("Coffee subscription form", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
    });
  });
  it("should fill the form with no errors/validation", () => {
    mount(<Subscription />);
    cy.checkHydrated(IC_PAGE_HEADER);

    cy.get(IC_STEPPER).should(BE_VISIBLE);
    checkCurrentStep(0);

    // Select a radio option
    findEl(IC_RADIO_OPTION, RADIO + '[value="house"]').check({ force: true });
    cy.get(IC_RADIO_OPTION + '[label="House Blend"]').should(
      HAVE_ATTR,
      SELECTED,
    );

    // Select a select option using mouse
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER);
    clickOnShadowEl(IC_SELECT, IC_MENU_OPTION + '[data-value="aeropress"]');

    // Select an option using keyboard
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER, 1);
    cy.realPress([ARROW_DOWN_KEY, ESCAPE_KEY]);

    // Go to next step, check the stepper and the logged formValues so far
    cy.get(IC_BUTTON).contains("Add to order").click();
    checkCurrentStep(1);
    cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm());

    // Fill out the text fields
    clickOnShadowEl(IC_TEXT_FIELD, IC_INPUT_CONTAINER);
    cy.realType("John Doe")
      .realPress(TAB_KEY)
      .realType("johndoe@email.com")
      .realPress(TAB_KEY)
      .realType("1234567890");

    // Check both options in the checkbox group
    findShadowEl(IC_CHECKBOX, CHECKBOX).eq(0).check();
    findShadowEl(IC_CHECKBOX, CHECKBOX).eq(1).check();
    cy.get(IC_CHECKBOX).eq(0).should(HAVE_ATTR, CHECKED);
    cy.get(IC_CHECKBOX).eq(1).should(HAVE_ATTR, CHECKED);

    // Go to next step, check the stepper and the logged formValues so far
    cy.get(IC_BUTTON).contains("Add to order").click();
    cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm("details"));
    checkCurrentStep(2);

    // Select a date using the date picker
    findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
      .shadow()
      .find(CALENDAR_BUTTON_ID)
      .click();
    findShadowEl(IC_DATE_PICKER, FOCUSSED_DAY_BTN_CLASS).click();
    checkDateInputValue(new Date());

    // Agree to terms
    findEl(IC_RADIO_OPTION, RADIO + '[name="agree"]').check({ force: true });
    cy.get(IC_RADIO_OPTION + '[name="agree"]').should(HAVE_ATTR, SELECTED);

    // Submit and check the logged formValues
    cy.get(IC_BUTTON).contains("Submit order").click();
    cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm("checkout"));
  });
  it("should show validation errors", () => {
    mount(<Subscription />);
    cy.checkHydrated(IC_PAGE_HEADER);

    cy.get(IC_STEPPER).should(BE_VISIBLE);
    checkCurrentStep(0);

    // Fill in details, missing an option
    findEl(IC_RADIO_OPTION, RADIO).first().check({ force: true });
    cy.get(IC_RADIO_OPTION).eq(0).should(HAVE_ATTR, SELECTED);
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER);
    clickOnShadowEl(IC_SELECT, IC_MENU_OPTION, 3);

    // Click next step but expect to stay on the same step
    cy.get(IC_BUTTON).click();
    checkCurrentStep(0);

    // Check ic-alert is visible and that the ic-select has a validation error
    cy.get(IC_ALERT).should(BE_VISIBLE);
    cy.get(IC_SELECT).eq(1).should(HAVE_ATTR, VALIDATION_STATUS, ERROR);

    // Fill in required fields and go to next step
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER, 1);
    cy.realPress([ARROW_DOWN_KEY, ESCAPE_KEY]);
    cy.get(IC_SELECT).eq(1).should(NOT_HAVE_ATTR, VALIDATION_STATUS, ERROR);
    cy.get(IC_BUTTON).click();
    checkCurrentStep(1);
  });
});
