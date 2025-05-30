import NotFound from "../NotFound.tsx";
import { render } from "@testing-library/react";
// import { screen } from "shadow-dom-testing-library";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Not Found component", () => {
  let container: HTMLElement;

  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  beforeEach(async () => {
    const renderResult = render(<NotFound />);
    container = renderResult.container;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("renders", async () => {
    expect(container).not.toBeNull();
  });

  it("displays the correct content", async () => {
    const emptyState = container.querySelector("ic-empty-state");

    expect(emptyState?.heading).toBe("Hmm...there's nothing here");
    expect(emptyState?.subheading).toBe(
      "The page you are looking for doesn't exist.",
    );
    expect(emptyState?.children).toHaveLength(3);

    expect(emptyState?.children[1]).toHaveTextContent("Submit feedback");
    expect(emptyState?.children[2]).toHaveAttribute("href", "/");
  });

  it("should fill out feedback form", async () => {
    const emptyState = container.querySelector("ic-empty-state");

    await userEvent.click(emptyState?.children[1] as HTMLElement);

    const dialog = container.querySelector("ic-dialog") as HTMLIcDialogElement;

    expect(dialog.open).toBe(true);

    // TODO: Causes infinite loop in dialog code
    // const select = dialog?.children[2] as HTMLIcSelectElement;

    // await userEvent.click(
    //   select.shadowRoot?.querySelector("button") as HTMLElement,
    // );

    // await userEvent.click(screen.getByShadowLabelText("Broken link"));
    // await userEvent.click(screen.getByShadowLabelText("Slow loading times"));

    // expect(select).toHaveValue(["link", "loading"]);

    const dateInput = dialog?.children[4] as HTMLIcDateInputElement;

    dateInput.value = "31/12/2023";
  });
});
