/// <reference types="cypress" />

import { mount } from "cypress/react";
import View from "../../src/components/View/View";
import React from "react";
import { BE_VISIBLE, HAVE_LENGTH } from "../cypress/utils/cyConstants";
import Commands from "../cypress/support/commands";

describe("View page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    window.localStorage.setItem(
      "formValues",
      JSON.stringify({
        detailForm: {
          name: "Jane Doe",
          contact: ["Email"],
        },
        coffeeForm: {
          grind: "Filter",
          variety: "Liberica",
          size: "500g",
        },
        checkoutForm: {
          dateToStart: "2030-11-01T23:00:00.000Z",
        },
      }),
    );
  });
  it("should show subscriptions in a data table", () => {
    mount(<View />);

    Commands.checkHydrated("ic-data-table");

    cy.get("ic-data-table").should(BE_VISIBLE);

    cy.findShadowEl("ic-data-table", "tr.table-row").should(HAVE_LENGTH, 5);

    cy.findShadowEl("ic-data-table", "ic-pagination-bar")
      .shadow()
      .find("ic-select.items-per-page-input")
      .realClick()
      .realPress("ArrowDown")
      .realPress("ArrowDown")
      .realPress("Enter");

    cy.findShadowEl("ic-data-table", "tr.table-row").should(HAVE_LENGTH, 9);

    cy.findShadowEl("ic-data-table", "tr.table-row").eq(8).contains("Jane Doe");

    cy.findShadowEl("ic-data-table", "ic-button#sort-button-startDate")
      .click()
      .click();

    cy.findShadowEl("ic-data-table", "tr.table-row").eq(0).contains("Jane Doe");
  });
});
