const CODE = require("./customStatusCode");
module.exports = {
    mockAdminLotteryGetResponse: {
        code: "000",
        message: "取得成功",
        data: [
            {
                event_id: 1,
                event_name: "Lottery 1",
                event_start_time: "2023/05/01",
                event_end_time: "2023/05/31",
                is_visible: true,
                status: "ongoing",
                total_inventory: 1000,
            },
        ],
    },
    mockError: {
        code: CODE.unknownError,
    },
    mockQueryRequiredError: {
        code: CODE.queryRequiredError,
    },
    mockInputValueInvalidError: {
        code: CODE.inputValueInvalidError,
    },

    mockAccessTokenError: {
        code: CODE.accessTokenError,
    },
    mockAdminRecordResponse: {
        code: "000",
        message: "取得獲獎紀錄",
        data: [
            {
                discount_name: "夏日9折卷",
                discount_value: 0.9,
                member_id: "",
                member_name: "",
                event_id: "",
                coupon: "",
                get_coupon_time: "",
            },
        ],
        next_paging: 2,
    },

    mockLotteryEventResponse: {
        code: "000",
        message: "取得成功",
        event_data: [
            {
                discount_name: "夏日九折券",
                discount_value: 0.9,
                threshold: 500,
                inventory: 150,
            },
        ],
    },

    mockLotteryMemberResponse: {
        code: "000",
        message: "取得成功",
        data: [
            {
                discount_name: "夏日九折券",
                discount_value: 0.9,
            },
        ],
    },
    //TODO: 確認 API response 格式 (boolean value)
    mockLotteryInfoResponse: {
        code: "000",
        message: "新增成功",
        lottery_data: {
            lottery_id: 1,
            member_id: 1,
            event_id: 1,
            discount_value: 0.9,
            coupon: "jreoig",
            is_received: false,
            create_time: "2023/04/28 21:03:00",
            is_used: false,
        },
    },

    mockAdminLotteryPostResponse: {
        code: "000",
        message: "新增成功",
        data: {
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
        },
        create_at: "2023-04-26T00:00:00.00000",
        update_at: "2023-04-26T00:00:00.00000",
    },
};
