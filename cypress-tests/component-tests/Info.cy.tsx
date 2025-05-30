/// <reference types="cypress" />

import { mount } from "cypress/react";
import Info from "../../src/components/Info/Info";
import React from "react";
import {
  BE_VISIBLE,
  HAVE_PROP,
  HAVE_LENGTH,
} from "../cypress/utils/cyConstants";
import Commands from "../cypress/support/commands";

describe("Info page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
  it("should open the FAQs accordions and check contents", () => {
    mount(<Info />);

    Commands.checkHydrated("ic-accordion-group");

    cy.get("ic-accordion").should("have.length", 3);

    for (let i = 0; i < 3; i++) {
      cy.get("ic-accordion").eq(i).click();

      cy.findShadowEl("ic-accordion", "div.expanded-content")
        .eq(i)
        .should(BE_VISIBLE);

      cy.get("ic-accordion").eq(i).should(HAVE_PROP, "expanded", true);
    }

    cy.get("ic-accordion").eq(1).click();

    cy.get("ic-data-list").should(BE_VISIBLE);

    cy.get("ic-data-row").should(HAVE_LENGTH, 5);

    cy.get("ic-link").should(HAVE_LENGTH, 5);

    for (let i = 0; i < 5; i++) {
      cy.get("ic-link")
        .eq(i)
        .should(HAVE_PROP, "href")
        .then((href) => {
          expect(
            href.toString().startsWith("https://design.sis.gov.uk/components/"),
          ).to.be.true;
        });
    }
  });
});
