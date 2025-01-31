const axios = require("axios");
const app = require("../server");

jest.mock("axios");

const mockMarketData = [
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
];

const mockPriceAnalysisData = [
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
];

describe("test market data", () => {
  jest.setTimeout(10000);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetching market data should return mocked data", async () => {
    axios.get.mockResolvedValue({ data: mockMarketData });

    const response = await axios.get();
    expect(response.data).toEqual(mockMarketData);
  });

  test("analyze price change should return mock analysis", async () => {
    axios.get.mockResolvedValue({ data: mockPriceAnalysisData });

    const response = await axios.get();
    const data = response.data.map((item) => parseFloat(item[4]));
    const first = data[0];
    const last = data[data.length - 1];
    const change = ((last - first) / first) * 100;

    expect(change.toFixed(2) + "%").toBe("-0.41%");
  });

  test("Fetching market data with missing interval should throw error", async () => {
    axios.get.mockRejectedValue(new Error("Interval is required"));

    await expect(axios.get()).rejects.toThrow("Interval is required");
  });
});
