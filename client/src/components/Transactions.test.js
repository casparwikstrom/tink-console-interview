import React from "react";
import {act} from "react-dom/test-utils";
import {render, unmountComponentAtNode} from "react-dom";
import {getByTestId} from "@testing-library/react";
import Transactions from "./Transactions";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const data =
    {
        name: "Spotify",
        amount: 4000,
        currency: "SEK",
        img: "http://logo.clearbit.com/spotify.se"
    };

it("has correct headers", () => {
    act(() => {
        render(<Transactions data={data}/>, container);
    });

    const name = getByTestId(container, "name");
    const img = getByTestId(container, "img");

    expect(name.textContent).toBe("Spotify");
    expect(img.src).toBe("http://logo.clearbit.com/spotify.se");
});

