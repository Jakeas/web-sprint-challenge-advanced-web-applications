import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import {fetchBubbles as mockFetchBubbles} from './fetchBubbles'

jest.mock('./fetchBubbles')

const data = [
  {
    color: "aliceblue", 
    id: 1,
    code: {
      hex: "#f0f8ff"
    }
  },
  {
    color: "aqua", 
    id: 2,
    code: {
      hex: "#00ffff"
    }
  },
  {
    color: "aquamarine", 
    id: 3,
    code: {
      hex: "#7fffd4"
    }
  }
]


test("Renders Bubble without errors", async () => {
    mockFetchBubbles.mockResolvedValueOnce({data: []})
    render(<BubblePage/>)
});

test("Fetches data and renders the bubbles on mounting", async () => {
    mockFetchBubbles.mockResolvedValueOnce({data})
    render(<BubblePage/>)
     await waitFor(()=> {
        const withoutErrors = screen.getByText(/aliceblue/i)
        expect(withoutErrors).toBeInTheDocument()
    })
});

