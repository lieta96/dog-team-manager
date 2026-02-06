import { render, screen } from "@testing-library/react";
import Pagination from "./pagination";
import userEvent from '@testing-library/user-event';

describe("Pagination component - Testing Level 1", () => {
    it("does not render the pagination component when there is only one page", () => {
        render(<Pagination currentPage={1} totalPages={1} onPageChange={() => { }} />);
        expect(screen.queryByRole("button", { name: "Previous" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();

    });
    it("renders the Next and Previous Buttons when there is more than one page", () => {
        render(<Pagination currentPage={1} totalPages={2} onPageChange={() => { }} />);
        expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    })
    it("Previous button should be disabled when the current page is 1 ", () => {
        render(<Pagination currentPage={1} totalPages={2} onPageChange={() => { }} />);
        expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled()
    })
    it("Next button should be disabled when the curent page is the last one", () => {
        render(<Pagination currentPage={5} totalPages={5} onPageChange={() => { }} />);
        expect(screen.getByRole("button", { name: "Next" })).toBeDisabled()
    })
    it("shows ellipsis when there are gaps between page numbers", () => {
        render(<Pagination currentPage={5} totalPages={10} onPageChange={() => { }} />);
        expect(screen.getAllByText("...")).toHaveLength(2);
    });
    it("shows correct page number", () => {
        render(<Pagination currentPage={5} totalPages={10} onPageChange={() => { }} />);
        [1, 4, 5, 6, 10].forEach(num => {
            expect(screen.getByRole("button", { name: num })).toBeInTheDocument()

        })
    })
});
describe("Pagination component - Testing Level 2", () => {
    it("calls the 'onPageChange' function with the number that was clicked by the user", async () => {
        const mockOnPageChange =jest.fn()
        const user = userEvent.setup();
        render(<Pagination currentPage={4} totalPages={10} onPageChange={mockOnPageChange} />)
        const button = screen.getByRole("button", { name: 5 });
        await user.click(button);
        expect(mockOnPageChange).toHaveBeenCalledWith(5) // chequea argumento 
    })
    it("Previous Button Click calls onPageChange with argument currentPage-1",async()=>{
        const mockOnPageChange =jest.fn()
        const user = userEvent.setup();
        const currentPage=4
        render(<Pagination currentPage={currentPage} totalPages={10} onPageChange={mockOnPageChange} />)
        const button = screen.getByRole("button", { name: "Previous" });
        await user.click(button);
        expect(mockOnPageChange).toHaveBeenCalledWith(currentPage-1)
    })
    it("Next Button Click calls onPageChange with argument currentPage+1",async()=>{
        const mockOnPageChange =jest.fn()
        const user = userEvent.setup();
        const currentPage=4
        render(<Pagination currentPage={currentPage} totalPages={10} onPageChange={mockOnPageChange} />)
        const button = screen.getByRole("button", { name: "Next" });
        await user.click(button);
        expect(mockOnPageChange).toHaveBeenCalledWith(currentPage+1)
    })
})