module.exports = {
    mockLotteryList: {
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
                additional_property: "additional value", // additional property for testing
            },
        ],
    },
    mockError: {
        code: "999",
    },
    mockRecord: {
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

    mockLotteryEvent: {
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

    mockLotteryValue: {
        code: "000",
        message: "取得成功",
        data: [
            {
                discount_name: "夏日九折券",
                discount_value: 0.9,
            },
        ],
    },
};
