const { test } = require("node:test");
const { mockLotteryEvent, mockError } = require("../mockData");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/lottery/event";
const query = { event_id: 1 };

describe(`GET ${apiEndpoint}`, () => {
    it("should response with a 200 and a list of lottery events", async () => {
        let lotteryEvent;
        if (process.env.USE_MOCK_DATA) {
            lotteryEvent = mockLotteryEvent;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryEvent = response.body;
        }

        expect(lotteryEvent).toHaveProperty("code", "000");
        expect(lotteryEvent).toHaveProperty("message", "取得成功");
        expect(lotteryEvent).toHaveProperty("event_data");
        expect(Array.isArray(lotteryEvent.event_data)).toBe(true);
        // expect(lotteryList).toHaveProperty("next_paging");

        for (const event of lotteryEvent.event_data) {
            expect(event).toHaveProperty("discount_name");
            expect(typeof event.discount_name).toBe("string");
            expect(event).toHaveProperty("discount_value");
            expect(typeof event.discount_value).toBe("number");
            expect(event).toHaveProperty("threshold");
            expect(typeof event.threshold).toBe("number");
            expect(event).toHaveProperty("inventory");
            expect(typeof event.inventory).toBe("number");
            expect(Number.isInteger(event.inventory)).toBe(true);
            expect(event.inventory).toBeGreaterThanOrEqual(0);
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
