module.exports = {
    success: "000",
    queryRequiredError: "001", //未帶必要欄位、格式不符
    EndTimeIncorrectError: "002", //結束時間需大於開始時間
    StartTimeIncorrectError: "003", //開始時間需大於設定當日
    lessThan10MinModifyError: "004", //活動開始前10分鐘後除隱藏外不可修改任何欄位
    inputValueInvalidError: "100", //params 或 request body 輸入值不符合規定
    unknownError: "999",
};