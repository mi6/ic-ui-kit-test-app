/// <reference types="cypress" />

import Home from "../../src/components/Home/Home";
import React from "react";
import { HAVE_LENGTH } from "../utils/cyConstants";
import Commands from "../support/commands";

describe("Home page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
  it("should display informative cards", () => {
    cy.mount(<Home />);

    Commands.checkHydrated("ic-card-horizontal");

    cy.get("ic-card-horizontal").should(HAVE_LENGTH, 4);
  });
});