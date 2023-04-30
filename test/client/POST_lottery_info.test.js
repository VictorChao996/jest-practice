const {
    mockLotteryInfoResponse,
    mockQueryRequiredError,
    mockInputValueInvalidError,
    mockError,
} = require("../utils/mockData");
const CODE = require("../utils/customStatusCode");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/lottery/info";
const input = { member_id: 1, discount_id: 456, coupon: "couponCode" };

describe(`POST ${apiEndpoint}`, () => {
    //* 200 response check
    it("should response with a 200 and a list of lottery events", async () => {
        let lotteryInfo;
        if (process.env.USE_MOCK_DATA) {
            lotteryInfo = mockLotteryInfoResponse;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .post(apiEndpoint)
                .send(input)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryInfo = response.body;
        }

        expect(lotteryInfo).toHaveProperty("code", CODE.success);
        expect(lotteryInfo).toHaveProperty("message", "新增成功");
        expect(lotteryInfo).toHaveProperty("lottery_data");
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "lottery_id",
            expect.any(Number)
        );
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "member_id",
            input.member_id
        );
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "discount_value",
            expect.any(Number)
        );
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "coupon",
            expect.any(String)
        );
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "is_received",
            expect.any(Boolean)
        );
        //TODO: check the time format for "create_time"
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "create_time",
            expect.any(String)
        );
        expect(lotteryInfo.lottery_data).toHaveProperty(
            "is_used",
            expect.any(Boolean)
        );
    });

    //* params not complete error check (coupon is not provided)
    it(`should response with a ${CODE.queryRequiredError} if the request params is not complete`, async () => {
        let error;
        const input = { member_id: 123, discount_id: 456 };

        if (process.env.USE_MOCK_DATA) {
            error = mockQueryRequiredError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(input)
                .expect("Content-Type", /json/)
                .expect(999);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.queryRequiredError);
    });

    //* params value error check (member_id is not exist or invalid)
    it(`should response with a ${CODE.inputValueInvalidError} if the request params is not provided`, async () => {
        let error;
        input.member_id = -999;

        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(input)
                .expect("Content-Type", /json/)
                .expect(999);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
    });
    //* params value error check (member_id is not exist or invalid)
    it(`should response with a ${CODE.inputValueInvalidError} if the request params is not provided`, async () => {
        let error;
        input.member_id = -999;

        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(input)
                .expect("Content-Type", /json/)
                .expect(999);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
    });
    //* params value error check (coupon type is invalid)
    it(`should response with a ${CODE.inputValueInvalidError} if the request params is not provided`, async () => {
        let error;
        input.coupon = false;

        if (process.env.USE_MOCK_DATA) {
            error = mockInputValueInvalidError;
        } else {
            const response = await request(app)
                .get(apiEndpoint)
                .query(input)
                .expect("Content-Type", /json/)
                .expect(999);
            error = response.body;
        }
        expect(error).toHaveProperty("code", CODE.inputValueInvalidError);
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
