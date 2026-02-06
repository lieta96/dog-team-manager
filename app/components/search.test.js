import { render, screen } from "@testing-library/react";
import Search from "./search";
import userEvent from '@testing-library/user-event';

describe("Search component", () => {
  it("has a search input with placeholder 'Search'", () => {
    // Arrange
    const breeds = [];
    // Act
    render(<Search breeds={breeds} />);
    // Assert
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });
  it("has an empty textbox when the component is rendered", () => {
    // Arrange
    const breeds = [];
    // Act
    render(<Search breeds={breeds} />);
    // Assert
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
  it("displays all breeds when the search input is empty", () => {
    // Arrange
    const breeds = ["breed1", "breed2", "breed3"];
    // Act
    render(<Search breeds={breeds} />);
    // Assert
    expect(screen.getAllByRole("link")).toHaveLength(breeds.length);
  });
  it("displays all breed names when the search input is empty", () => {
    // Arrange
    const breeds = ["breed1", "breed2", "breed3"];
    // Act
    render(<Search breeds={breeds} />);
    // Assert
    breeds.forEach(breed => {
      expect(screen.getByText(breed)).toBeInTheDocument();
    });
  });
  it("search input case-sensitive", async () => {
    const breeds = ["breed1", "breed2", "breed3"];
    const search = "BREED2";
    const user = userEvent.setup();

    render(<Search breeds={breeds} />);
    const input = screen.getByPlaceholderText("Search");
    await user.type(input, search);
    expect(screen.getAllByRole("link")).toHaveLength(1)

    // Act

  })
  // it("typing in the search input filters the breeds", async () => {
  //     // Arrange
  //     const breeds = ["breed1", "breed2", "breed3"];
  //     const search = "breed2";
  //     const user = userEvent.setup();
  //     // Act
  //     render(<Search breeds={breeds}/>);
  //     const input = screen.getByPlaceholderText("Search");
  //     await user.type(input, search);
  //     // Assert
  //     // expect(screen.getByText(search)).toBeInTheDocument();
  //     expect(screen.getAllByRole("link")).toHaveLength(1);
  //     // expect(screen.getByText("No results found")).toBeInTheDocument();
  //   });

  //   it("display 'no results found' when no breeds are found", async () => {
  //     // Arrange
  //     const breeds = ["breed1", "breed2", "breed3"];
  //     const search = "breed4";
  //     const user = userEvent.setup();
  //     // Act
  //     render(<Search breeds={breeds}/>);
  //     await user.type(screen.getByRole("textbox"), search);
  //     // Assert
  //     expect(screen.getByText("No results found")).toBeInTheDocument();
  //   })
});