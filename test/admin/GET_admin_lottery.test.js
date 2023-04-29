const { test } = require("node:test");
const { mockLotteryList, mockError } = require("../mockData");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/admin/lottery";
const query = { paging: 1, amount: 10 };

describe(`GET ${apiEndpoint}`, () => {
    it("should response with a 200 and a list of lotteries", async () => {
        let lotteryList;
        if (process.env.USE_MOCK_DATA) {
            lotteryList = mockLotteryList;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryList = response.body;
        }

        expect(lotteryList).toHaveProperty("code", "000");
        expect(lotteryList).toHaveProperty("message", "取得成功");
        expect(lotteryList).toHaveProperty("data");
        expect(Array.isArray(lotteryList.data)).toBe(true);
        // expect(lotteryList).toHaveProperty("next_paging");

        for (const lottery of lotteryList.data) {
            expect(lottery).toHaveProperty("event_id");
            expect(lottery.event_id).toBeGreaterThan(0);
            expect(lottery).toHaveProperty("event_name");
            expect(typeof lottery.event_name).toBe("string");
            expect(lottery).toHaveProperty("event_start_time");
            expect(typeof lottery.event_start_time).toBe("string");
            expect(lottery).toHaveProperty("event_end_time");
            expect(typeof lottery.event_end_time).toBe("string");
            expect(lottery).toHaveProperty("is_visible");
            expect(typeof lottery.is_visible).toBe("boolean");
            expect(lottery).toHaveProperty("status");
            expect(typeof lottery.status).toBe("string");
            expect(["pending", "ongoing", "cancelled", "finished"]).toContain(
                lottery.status
            );
            expect(lottery).toHaveProperty("total_inventory");
            expect(typeof lottery.total_inventory).toBe("number");
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
