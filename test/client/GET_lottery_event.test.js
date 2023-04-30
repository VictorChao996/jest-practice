const {
    mockLotteryEventResponse,
    mockQueryRequiredError,
    mockError,
} = require("../utils/mockData");
const CODE = require("../utils/customStatusCode");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/lottery/event";
const headers = { Authorization: "Bearer " + process.env.TEST_ACCESS_TOKEN };
let params = { event_id: 1 };

describe(`GET ${apiEndpoint}`, () => {
    //* 200 response check
    it("should response with a 200 and a list of lottery events", async () => {
        let lotteryEvent;
        if (process.env.USE_MOCK_DATA) {
            lotteryEvent = mockLotteryEventResponse;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryEvent = response.body;
        }

        expect(lotteryEvent).toHaveProperty("code", CODE.success);
        expect(lotteryEvent).toHaveProperty("message", "取得成功");
        expect(lotteryEvent).toHaveProperty("event_data");
        expect(Array.isArray(lotteryEvent.event_data)).toBe(true);
        // expect(lotteryList).toHaveProperty("next_paging");

        //* 檢查每一個 event 中的內容是否正確
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

    //* event_id error check
    it("should response with a ??? if the event_id is not found or invalid", async () => {
        let error;
        params.event_id = -1;
        if (process.env.USE_MOCK_DATA) {
            error = mockQueryRequiredError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(999);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.queryRequiredError);
    });

    //* access_token error check
    it("should response with a ??? if the access_token is not provided", async () => {
        let error;
        headers.Authorization = "";
        if (process.env.USE_MOCK_DATA) {
            error = mockQueryRequiredError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(999);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.queryRequiredError);
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
