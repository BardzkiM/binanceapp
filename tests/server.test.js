const request = require("supertest");
const jest = require("jest");

jest.mock("axios");

const app = require("../server");

describe("test market data", () => {
  jest.setTimeout(10000);

  beforeEach(() => {});

  test("Fetching market data should return mocked data", async () => {
    axios.get.mockResolvedValue({
      data: [
        [
          1738148400000,
          "102547.01000000",
          "102809.52000000",
          "102425.87000000",
          "102646.00000000",
          "665.36345000",
          1738151999999,
          "68241920.85870200",
          90751,
          "452.88877000",
          "46443726.76315680",
          "0",
        ],
        [
          1738152000000,
          "102646.00000000",
          "102842.04000000",
          "102220.13000000",
          "102229.85000000",
          "788.66391000",
          1738155599999,
          "80877867.69371830",
          147281,
          "430.51357000",
          "44157049.10439310",
          "0",
        ],
      ],
    });

    const response = await app.getBinanceKlines(
      "BTCUSDT",
      "1h",
      1738148400000,
      1738152000000
    );

    expect(response).toEqual({
      symbol: "BTCUSDT",
      data: [
        {
          openTime: 1738148400000,
          open: 102547.01,
          high: 102809.52,
          low: 102425.87,
          close: 102646,
          volume: 665.36345,
          closeTime: 1738151999999,
        },
        {
          openTime: 1738152000000,
          open: 102646,
          high: 102842.04,
          low: 102220.13,
          close: 102229.85,
          volume: 788.66391,
          closeTime: 1738155599999,
        },
      ],
    });
  });
});
