/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { within, waitFor } from "@testing-library/dom";
import InputField from "../components/InputField";
import "@testing-library/jest-dom";

describe("InputField renders correctly", () => {
  const myMock = jest.fn("hello");

  test("renders correctly", async () => {
    const tree = create(<InputField handleAdd={myMock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Input field displays add button by default", async () => {
    render(<InputField handleAdd={myMock} />);
    const inputWrapper = await screen.findByTestId("addTask");

    const { getByText } = within(inputWrapper);

    expect(getByText("+ New Task")).toBeInTheDocument();
  });

  test("Input field displays input element on click", async () => {
    render(<InputField handleAdd={myMock} />);

    const addButton = await screen.findByTestId("addButton");
    userEvent.click(addButton);

    const addInput = await screen.findByTestId("addTaskInput");

    expect(addInput).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText("+ New Task")).not.toBeInTheDocument()
    );
  });
});
