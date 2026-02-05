import { render, screen } from "@testing-library/react";
import Pagination from "./pagination";
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
    it("Next button should be disabled when the curent page is the last one",()=>{
        render(<Pagination currentPage={5} totalPages={5} onPageChange={() => { }} />);
        expect(screen.getByRole("button", { name: "Next" })).toBeDisabled()
    })
    it("shows ellipsis when there are gaps between page numbers", () => {
        render(<Pagination currentPage={5} totalPages={10} onPageChange={() => { }} />);
        expect(screen.getAllByText("...")).toHaveLength(2);
    });
});