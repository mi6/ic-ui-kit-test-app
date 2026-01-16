import Home from "../Home.tsx";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Home component", () => {
  let container: HTMLElement;
  beforeEach(async () => {
    const renderResult = render(<Home />);
    container = renderResult.container;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("renders", async () => {
    expect(container).not.toBeNull();
  });

  it("should display informative cards", async () => {
    expect(container.querySelectorAll("ic-card-horizontal")).toHaveLength(4);
  });
});
