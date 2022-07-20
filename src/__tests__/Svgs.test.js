/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { create } from "react-test-renderer";

import CompletedIcon from "../components/svgs/CompletedIcon";
import InProgressIcon from "../components/svgs/InProgressIcon";
import TodoIcon from "../components/svgs/TodoIcon";
import CancelIcon from "../components/svgs/CancelIcon";

describe("renders Svgs correctly", () => {
  test("renders cancel Icon correctly", () => {
    const tree = create(<CancelIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders TodoIcon correctly", () => {
    const tree = create(<TodoIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders InProgress Icon correctly", () => {
    const tree = create(<InProgressIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Completed Icon correctly", () => {
    const tree = create(<CompletedIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
