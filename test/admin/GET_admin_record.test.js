const {
    mockAdminRecordResponse,
    mockInputValueInvalidError,
    mockError,
} = require("../utils/mockData");
const CODE = require("../utils/customStatusCode");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/admin/record";
let params = { id: "0", paging: 1, amount: 10 };

describe(`GET ${apiEndpoint}`, () => {
    beforeEach(() => {
        params = { id: "0", paging: 1, amount: 10 };
    });

    //* 成功回覆後的內容檢查
    it("should response with a 200 and a list of winning record", async () => {
        let recordList;
        if (process.env.USE_MOCK_DATA) {
            recordList = mockAdminRecordResponse;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(params)
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

    //* id type 不正確的 response check
    it("should return 200 and CODE 'inputValueInvalidError' if the type of id is not string", async () => {
        let error;
        params.id = 1;
        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }

        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
    });
    //* paging type 不正確的 response check
    it("should return 200 and CODE 'inputValueInvalidError' if the type of paging is not number", async () => {
        let error;
        params.paging = "error type of paging";
        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }

        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
    });
    //* amount type 不正確的 response check
    it("should return 200 and CODE 'inputValueInvalidError' if the type of amount is not number", async () => {
        let error;
        params.amount = "error type of amount";
        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(query)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }

        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
    });
});
