import { expect, test } from "vitest";
import {calculateCost} from "../src/cost";

test("Lowest tier", () => {
    const storage = 10;

    const expected = 4000;
    const actual = calculateCost(storage);

    expect(actual).toEqual(expected);
});

test("Middle tier", () => {
    const storage = 100;

    const expected = 20000;
    const actual = calculateCost(storage);

    expect(actual).toEqual(expected);
});

test("Highest tier", () => {
    const storage = 101;

    const expected = 10100;
    const actual = calculateCost(storage);

    expect(actual).toEqual(expected);
});
