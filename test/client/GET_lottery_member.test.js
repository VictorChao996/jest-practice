const {
    mockLotteryMemberResponse,
    mockQueryRequiredError,
    mockInputValueInvalidError,
    mockAccessTokenError,
    mockError,
} = require("../utils/mockData");
const CODE = require("../utils/customStatusCode");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/lottery/member";
const headers = { Authorization: `Bearer ${process.env.TEST_ACCESS_TOKEN}` };
let params = { member_id: 1 };

describe(`GET ${apiEndpoint}`, () => {
    beforeEach(() => {
        params = { member_id: 1 };
    });

    //* 成功回覆後的內容檢查
    it("should response with a 200 and a list of lottery value by specific member id", async () => {
        let lotteryValue;
        if (process.env.USE_MOCK_DATA) {
            lotteryValue = mockLotteryMemberResponse;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryValue = response.body;
        }

        expect(lotteryValue).toHaveProperty("code", CODE.success);
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

    //* 整個params 不存在
    it("should response with 200 and CODE 'queryRequiredError' if the params is undefined", async () => {
        let error;
        params = undefined;
        if (process.env.USE_MOCK_DATA) {
            error = mockQueryRequiredError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.queryRequiredError);
    });

    //* access_token 不存在
    it("should response with 200 and CODE 'accessTokenError' if the access_token is not provided", async () => {
        let error;
        headers.Authorization = undefined;
        if (process.env.USE_MOCK_DATA) {
            error = mockAccessTokenError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.accessTokenError);
    });

    //* access_token 不正確
    it("should response with 200 and CODE 'accessTokenError' if the access_token is not correct", async () => {
        let error;
        headers.Authorization = undefined;
        if (process.env.USE_MOCK_DATA) {
            error = mockAccessTokenError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.accessTokenError);
    });

    //* member_id 不存在
    it("should response with 200 and CODE 'queryRequiredError' if the member_id is not provided", async () => {
        let error;
        params.member_id = undefined;
        if (process.env.USE_MOCK_DATA) {
            error = mockQueryRequiredError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.queryRequiredError);
    });

    //* member_id 型別不符
    it("should response with 200 and CODE 'inputValueInvalidError' if the member_id is invalid", async () => {
        let error;
        params.member_id = "invalid member_id type !";
        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .set(headers)
                .query(params)
                .expect("Content-Type", /json/)
                .expect(200);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
    });
});
