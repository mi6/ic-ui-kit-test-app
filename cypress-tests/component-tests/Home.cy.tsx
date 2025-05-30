/// <reference types="cypress" />

import { mount } from "cypress/react";
import Home from "../../src/components/Home/Home";
import React from "react";
import { HAVE_LENGTH } from "../cypress/utils/cyConstants";
import Commands from "../cypress/support/commands";

describe("Home page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
  it("should display informative cards", () => {
    mount(<Home />);

    Commands.checkHydrated("ic-card-horizontal");

    cy.get("ic-card-horizontal").should(HAVE_LENGTH, 4);
  });
});
