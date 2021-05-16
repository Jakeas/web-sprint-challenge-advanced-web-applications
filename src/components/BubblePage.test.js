import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage, { BubblePage as mockBubbles }from "./BubblePage";

jest.mock('./BubblePage')


const bubbleData = [
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


test("Renders BubblePage without errors", async () => {
  mockBubbles.mockResolvedValueOnce(bubbleData)
  render(<BubblePage />)
  await waitFor(()=> {
    const withoutErrors = screen.getByText(/aliceblue/i)
    expect(withoutErrors).not.toBeInTheDocument()
  })

});

test("Fetches data and renders the bubbles on mounting", () => {
  // Finish this test
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading