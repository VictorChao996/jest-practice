const { test } = require("node:test");
const { mockLotteryValue, mockError } = require("../mockData");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/lottery/member";
const query = { member_id: 1 };

describe(`GET ${apiEndpoint}`, () => {
    it("should response with a 200 and a list of lottery value by specific member id", async () => {
        let lotteryValue;
        if (process.env.USE_MOCK_DATA) {
            lotteryValue = mockLotteryValue;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryValue = response.body;
        }

        expect(lotteryValue).toHaveProperty("code", "000");
        expect(lotteryValue).toHaveProperty("message", "取得成功");
        expect(lotteryValue).toHaveProperty("data");
        expect(Array.isArray(lotteryValue.data)).toBe(true);
        // expect(lotteryList).toHaveProperty("next_paging");

        for (const value of lotteryValue.data) {
            expect(value).toHaveProperty("discount_name");
            expect(typeof value.discount_name).toBe("string");
            expect(value).toHaveProperty("discount_value");
            expect(typeof value.discount_value).toBe("number");
        }
    });

    // it("should response with 999 if there is an unknown error", async () => {
    //     let error;
    //     if (process.env.USE_MOCK_DATA) {
    //         error = mockError;
    //     } else {
    //         const response = await request(app)
    //             .get(apiEndpoint)
    //             .query(query)
    //             .expect("Content-Type", /json/)
    //             .expect(999);
    //         error = response.body;
    //     }
    //     expect(error).toHaveProperty("code", "999");
    // });
});
