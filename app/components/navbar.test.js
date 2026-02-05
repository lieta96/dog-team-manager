import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar Component - Testing Level 1", () => {

    it("renders two links", () => {
        render(<Navbar />)

        expect(screen.getAllByRole("link")).toHaveLength(2)
    })
    it("has as links '/' and '/my-team'", () => {
        render(<Navbar />)

        const hrefs = ["/", "/my-team"]
        screen.getAllByRole("link").map((link, i) => {
            expect(link).toHaveAttribute("href", hrefs[i])
        })
    })
    it("both links have accesible names",()=>{
        render(<Navbar />)

        expect(screen.getByRole("link",{name:"Dog Team Manager"})).toBeInTheDocument()
        expect(screen.getByRole("link",{name:"My Team"})).toBeInTheDocument()

    })
})