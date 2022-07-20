/**
 * @jest-environment jsdom
 */

// incompatibility with react beautiful dnd and react 18 for testing

import { expect, test } from "@jest/globals";
import { create } from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import TicketDetails from "../components/TicketDetails";

test("displays correctly", async () => {
  const tree = create(
    <StaticRouter>
      <TicketDetails />
    </StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
