import { render, screen } from "@testing-library/react";
import Categories from "./Categories";

describe("Category Page", () => {
  test("renders categories if request succeeds", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ test: 100 }]),
      })
    ) as jest.Mock;

    render(<Categories />);
    const listItemElements = await screen.findAllByRole("listItem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
