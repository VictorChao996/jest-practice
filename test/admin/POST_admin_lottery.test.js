const {
    mockAdminLotteryPostResponse,
    mockQueryRequiredError,
    mockError,
} = require("../utils/mockData");
const CODE = require("../utils/customStatusCode");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

const apiEndpoint = "/api/v1/admin/lottery";
const input = {
    event_id: 1,
    event_name: "",
    event_start_time: "2023/04/01",
    event_end_time: "2023/04/30",
    is_visible: true,
    status: "pending",
    event_data: [
        {
            discount_name: "夏日九折券",
            discount_value: 0.9,
            threshold: 500,
            inventory: 150,
        },
    ],
};

describe(`POST ${apiEndpoint}`, () => {
    //* 200 response check
    it("should response with a 200 and ", async () => {
        let lotteryEvent;
        if (process.env.USE_MOCK_DATA) {
            lotteryEvent = mockAdminLotteryPostResponse;
            console.log("using mock data");
        } else {
            const response = await request(app)
                .post(apiEndpoint)
                .send(input)
                .expect("Content-Type", /json/)
                .expect(200);
            console.log("not using mock data");

            lotteryEvent = response.body;
        }

        expect(lotteryEvent).toHaveProperty("code", CODE.success);
        expect(lotteryEvent).toHaveProperty("message", "新增成功");
        expect(lotteryEvent).toHaveProperty("data");

        expect(lotteryEvent.data).toHaveProperty(
            "event_id",
            expect.any(Number)
        );
        expect(lotteryEvent.data).toHaveProperty(
            "event_name",
            input.event_name
        );
        expect(lotteryEvent.data).toHaveProperty(
            "event_start_time",
            expect.any(String)
        );
        expect(lotteryEvent.data).toHaveProperty(
            "event_end_time",
            expect.any(String)
        );
        expect(lotteryEvent.data).toHaveProperty(
            "is_visible",
            input.is_visible
        );
        expect(lotteryEvent.data).toHaveProperty("status", input.status);
        expect(lotteryEvent.data).toHaveProperty(
            "event_data",
            expect.any(Array)
        );
        //TODO: check date time format
        expect(lotteryEvent).toHaveProperty("create_at", expect.any(String));
        expect(lotteryEvent).toHaveProperty("update_at", expect.any(String));
    });

    // //* event_id error check
    // it("should response with a ??? if the event_id is not found or invalid", async () => {
    //     let error;
    //     query.event_id = -1;
    //     if (process.env.USE_MOCK_DATA) {
    //         error = mockQueryRequiredError;
    //     } else {
    //         const response = await request(app)
    //             .get(apiEndpoint)
    //             .query(query)
    //             .expect("Content-Type", /json/)
    //             .expect(999);
    //         error = response.body;
    //     }
    //     expect(error).toHaveProperty("code", CODE.queryRequiredError);
    // });

    // //* access_token error check
    // it("should response with a ??? if the access_token is not provided", async () => {
    //     let error;
    //     query.access_token = "";
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
    //     expect(error).toHaveProperty("code", CODE.queryRequiredError);
    // });

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
