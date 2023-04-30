const { mockAdminRecordResponse, mockError } = require("../utils/mockData");
const CODE = require("../utils/customStatusCode");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/admin/record";
const query = { id: 0, paging: 1, amount: 10 };

describe(`GET ${apiEndpoint}`, () => {
    it("should response with a 200 and a list of winning record", async () => {
        let recordList;
        if (process.env.USE_MOCK_DATA) {
            recordList = mockAdminRecordResponse;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            recordList = response.body;
        }

        expect(recordList).toHaveProperty("code", CODE.success);
        expect(recordList).toHaveProperty("message", "取得獲獎紀錄");
        expect(recordList).toHaveProperty("data");
        expect(Array.isArray(recordList.data)).toBe(true);
        // expect(lotteryList).toHaveProperty("next_paging");

        for (const record of recordList.data) {
            expect(record).toHaveProperty("discount_name");
            expect(typeof record.discount_name).toBe("string");
            expect(record).toHaveProperty("discount_value");
            expect(typeof record.discount_value).toBe("number");
            expect(record).toHaveProperty("member_id");
            expect(typeof record.member_id).toBe("string");
            expect(record).toHaveProperty("member_name");
            expect(typeof record.member_name).toBe("string");
            expect(record).toHaveProperty("event_id");
            expect(typeof record.event_id).toBe("string");
            expect(record).toHaveProperty("coupon");
            expect(typeof record.coupon).toBe("string");
            expect(record).toHaveProperty("get_coupon_time");
            expect(typeof record.get_coupon_time).toBe("string");
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
