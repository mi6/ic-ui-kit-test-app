/// <reference types="cypress" />

import { mount } from "cypress/react";
import React from "react";
import NotFound from "../../src/components/NotFound/NotFound";
import Commands from "../cypress/support/commands";
import { BE_VISIBLE, HAVE_PROP } from "../cypress/utils/cyConstants";

const DAY_INPUT_ARIA_LABEL = 'input[aria-label="day"]';
const MONTH_INPUT_ARIA_LABEL = 'input[aria-label="month"]';
const YEAR_INPUT_ARIA_LABEL = 'input[aria-label="year"]';

describe("Not Found page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
  it("should redirect back to home page from empty state", () => {
    mount(<NotFound />);

    Commands.checkHydrated("ic-empty-state");

    cy.get("ic-empty-state").should(BE_VISIBLE);

    cy.get("ic-link").should(HAVE_PROP, "href", "/");
  });

  it("should fill out feedback form", () => {
    mount(<NotFound />);

    Commands.checkHydrated("ic-empty-state");
    Commands.checkHydrated("ic-button");

    cy.get("ic-button").click();

    expect(cy.get("ic-dialog").should(BE_VISIBLE));

    Commands.checkHydrated("ic-select");

    cy.findShadowEl("ic-select", "button.select-input")
      .realClick()
      .realPress("ArrowDown")
      .realPress(["Shift", "ArrowDown"]);

    cy.findShadowEl("ic-select", "button.select-input").click();

    cy.findShadowEl("ic-date-input", DAY_INPUT_ARIA_LABEL).type("01");
    cy.findShadowEl("ic-date-input", MONTH_INPUT_ARIA_LABEL).type("01");
    cy.findShadowEl("ic-date-input", YEAR_INPUT_ARIA_LABEL).type("4000");

    cy.findShadowEl("ic-dialog", "ic-button").contains("Confirm").click();
  });
});
