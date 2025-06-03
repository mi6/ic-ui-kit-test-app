/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { BE_VISIBLE, HAVE_CLASS } from "../utils/cyConstants";

// Create the typing for the getCall command
declare global {
  interface JQuery {
    getCall(arg: number);
  }
}

// Create the typing for the compareSnapshot command
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Check that the provided element has the hydrated class applied
       * @param {string} element identifier of the element to check
       */
      checkHydrated: typeof Commands.checkHydrated;
      /**
       * Click the selector inside an element's shadow root
       * @param {string} element identifier of the parent element
       * @param {string} selector identifier of the selector to be clicked
       */
      clickOnShadowEl: typeof Commands.clickOnShadowEl;
      /**
       * Check the selector inside the shadow root of an element is visible
       * @param {string} element identifier of the parent element
       * @param {string} selector identifier of the selector to be clicked
       */
      checkShadowElVisible: typeof Commands.checkShadowElVisible;

      /**
       * Check the selector inside the shadow root of an element is visible
       * @param {string} element identifier of the parent element
       * @param {string} selector identifier of the selector to be clicked
       * @returns the selector
       */
      findShadowEl: typeof Commands.findShadowEl;
      /**
       * Force-click the provided element
       * @param {string} element identifier of the element to check
       */
      clickOnButton: typeof Commands.clickOnButton;
    }
  }
}

const checkHydrated = (element: string): void => {
  cy.get(`${element}`).should(HAVE_CLASS, "hydrated");
};

const clickOnShadowEl = (element: string, selector: string): void => {
  cy.get(element).shadow().find(selector).click();
};

const checkShadowElVisible = (
  element: string,
  selector: string,
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(`${element}`).shadow().find(`${selector}`).should(BE_VISIBLE);

const findShadowEl = (
  element: string,
  selector: string,
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(`${element}`).shadow().find(`${selector}`);

const clickOnButton = (element: string): void => {
  cy.get(`${element}`).click({ force: true });
};

const Commands = {
  checkHydrated,
  clickOnShadowEl,
  checkShadowElVisible,
  findShadowEl,
  clickOnButton,
};

export default Commands;
