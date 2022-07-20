/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary";
import "@testing-library/jest-dom";

describe("Error Boundary", () => {
  beforeAll(() => jest.spyOn(console, "error").mockImplementation(() => {}));
  afterAll(() => console.error.mockRestore());
  test("Error Boundary displays message on error", () => {
    const ThrowError = () => {
      throw new Error("Test");
    };
    render(
      <ErrorBoundary fallback="hi there">
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("errorboundary")).toBeVisible();
  });
});
