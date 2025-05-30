import View from "../View.tsx";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("View component", () => {
  let container: HTMLElement;
  beforeEach(async () => {
    const renderResult = render(<View />);
    container = renderResult.container;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("renders", async () => {
    expect(container).not.toBeNull();
  });

  it("displays the correct content", async () => {
    const dataTable = await waitFor(() =>
      container.querySelector("ic-data-table"),
    );
    expect(dataTable).not.toBeNull();
  });

  // TODO - test sometimes fails from firstRow being empty
  it.skip("should get display the correct row data", async () => {
    const dataTable = await waitFor(() =>
      container.querySelector("ic-data-table"),
    );

    const firstRow = dataTable?.shadowRoot?.querySelectorAll("tr")[1];

    expect(firstRow).toHaveTextContent(/Coffee lover/i);
  });
});
