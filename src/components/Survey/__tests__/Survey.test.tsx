import Survey from "../Survey.tsx";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  screen,
  findByShadowLabelText,
  findByShadowText,
} from "shadow-dom-testing-library";

const MENU_OPEN_DELAY = 300;

const waitForTimeout = async (ms: number): Promise<void> => {
  await new Promise((r) => setTimeout(r, ms));
};

describe("Survey component", () => {
  let container: HTMLElement;
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    const renderResult = render(<Survey />);
    container = renderResult.container;
    user = userEvent.setup();
  });

  it("selects options in multi select via clicking items", async () => {
    const drinkSelect = container.querySelector(
      'ic-select[name="drinks-select"]',
    ) as HTMLIcSelectElement;

    expect(await screen.findByShadowText(`0/4 selected`));

    //open the select dropdown via the button in the shadow DOM
    const dropdownButton = await findByShadowText(
      drinkSelect,
      "Select an option",
    );
    await user.click(dropdownButton);

    const teaOption = await findByShadowLabelText(drinkSelect, "Tea");
    await user.click(teaOption);

    const coffeeOption = await findByShadowLabelText(drinkSelect, "Coffee");
    await user.click(coffeeOption);

    const hotChocOption = await findByShadowLabelText(
      drinkSelect,
      "Hot chocolate",
    );
    await user.click(hotChocOption);

    const matchaOption = await findByShadowLabelText(drinkSelect, "Matcha");
    await user.click(matchaOption);

    expect(await screen.findByShadowText(`4/4 selected`));
  });

  it("selects options in multi select via keyboard", async () => {
    const drinkSelect = container.querySelector(
      'ic-select[name="drinks-select"]',
    ) as HTMLIcSelectElement;

    //open the select dropdown via the button in the shadow DOM
    const dropdownButton = await findByShadowText(
      drinkSelect,
      "Select an option",
    );
    await user.click(dropdownButton);

    //delay for the dropdown to open
    await waitForTimeout(MENU_OPEN_DELAY);

    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Enter]");
    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Enter]");
    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Enter]");
    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Enter]");

    await screen.findByShadowText(`4/4 selected`);

    expect(drinkSelect.value).toEqual([
      "Coffee",
      "Tea",
      "Hot chocolate",
      "Matcha",
    ]);
  });

  it("should select and clear all options via button", async () => {
    const allButton = await screen.findByShadowText("Select all");
    await user.click(allButton);
    expect(await screen.findByShadowText(`4/4 selected`));

    // click again to clear all
    await user.click(allButton);

    expect(await screen.findByShadowText(`0/4 selected`));
  });
});
