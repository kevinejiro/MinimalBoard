/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal";
import "@testing-library/jest-dom";

describe("Modal", () => {
  const myMock = jest.fn("hello");

  test("renders correctly", () => {
    const tree = create(<Modal closeModal={myMock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("modal displays correctly on show=true", async () => {
    render(<Modal closeModal={myMock} show={true} />);
    const modal = await screen.findByTestId("modal");

    const backDrop = await screen.findByTestId("backDrop");

    expect(modal).toHaveStyle(
      `transform: translate(-50%, -50%) scale(1); opacity: 1`
    );
    expect(backDrop).toBeInTheDocument();
  });

  test("remove backdrop on cancel", async () => {
    render(<Modal closeModal={myMock} show={true} />);
    const cancelButton = await screen.findByTestId("cancelButton");

    userEvent.click(cancelButton);

    expect(myMock).toHaveBeenCalledTimes(1);
  });
});
