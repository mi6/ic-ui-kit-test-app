import Info from "../Info.tsx";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Info component", () => {
  let container: HTMLElement;
  beforeEach(async () => {
    const renderResult = render(<Info />);
    container = renderResult.container;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("renders", async () => {
    expect(container).not.toBeNull();
  });

  it("should display accordions for FAQs", async () => {
    expect(container.querySelectorAll("ic-accordion")).toHaveLength(3);

    container.querySelectorAll("ic-accordion")[1].click();

    expect(container.querySelectorAll("ic-data-list")).toHaveLength(1);
    expect(container.querySelectorAll("ic-data-row")).toHaveLength(5);
    expect(container.querySelectorAll("ic-link")).toHaveLength(5);

    for (let i = 0; i < 5; i++) {
      expect(container.querySelectorAll("ic-link")[i]).toHaveAttribute(
        "href",
        expect.stringMatching(/^https:\/\/design.sis.gov.uk\/components\//),
      );
    }

    container.querySelectorAll("ic-accordion")[2].click();

    expect(container.querySelectorAll("ic-accordion")[1].expanded).toBe(false);
    expect(container.querySelectorAll("ic-accordion")[0].expanded).toBe(false);
  });
});
