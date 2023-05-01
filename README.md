# JEST practices 練習
- [JEST practices 練習](#jest-practices-練習)
  - [Target](#target)
  - [prerequisite](#prerequisite)
  - [Installation](#installation)
  - [Run](#run)
  - [測試重點](#測試重點)
  - [API 簡介](#api-簡介)
  - [Client API testing todo](#client-api-testing-todo)
    - [GET /lottery/event](#get-lotteryevent)
    - [GET /lottery/member](#get-lotterymember)
  - [System API testing todo](#system-api-testing-todo)
    - [POST /admin/lottery](#post-adminlottery)
    - [GET /admin/lottery](#get-adminlottery)
    - [PUT /admin/lottery](#put-adminlottery)
    - [GET /admin/record](#get-adminrecord)

## Target
Complete the API test of the practical test.

## prerequisite
- node.js installed

## Installation
1. `git clone [this repository url]`
2. `npm install`
3. modify the package.json file to run the test with jest
```json
  "scripts": {
    "test": "jest",
    "testwatch": "jest --watchAll",
    "testcoverage": "jest --coverage"
  },
```

## Run
- `npm run test`: this command will run all the test.js file
- `npm run testwatch`: this command will run the test file in the watch mode.
- `npm run testcoverage`: this command will run all the test.js file with coverage information in terminal

## 測試重點
1. 200 success response 資料格式是否正確
2. 當 request 格式錯誤(request body 格式不對、required parameter 沒提供等)時是否有相對應的 response
3. response 的資料型別是否正確

## API 簡介
| HTTP Method | API Endpoint                       | Description                                       | parameters
|-------------|------------------------------------|---------------------------------------------------| --------------------------------
| GET         | /lottery/event                     | Retrieve information about lottery events         | *event_id*
| PUT         | /lottery/inventory/{discount_id}   | Update lottery coupon inventory                   | *discount_id*
| PUT         | /lottery/receive/{lottery_id}      | Update lottery information                        | *lottery_id*
| POST        | /lottery/info                      | Add a new lottery record                          | X
| GET         | /lottery/member                    | Retrieve a list of coupons owned by a member      | *member_id*
| POST        | /admin/lottery                     | Create a new lottery event                        | X
| GET         | /admin/lottery                     | Retrieve a list of lottery events                 | paging, amount
| PUT         | /admin/lottery/{id}                | Modify or delete a lottery event                  | *id*
| GET         | /admin/record                      | Retrieve records of lottery winners               | id, paging, amount


## Client API testing todo

### GET /lottery/event
- [X] data format check for successful request
- [X] check response of uncompleted request(header, params, body not completed)
  - [X] headers
    - [X] access_token is not provided
    - [X] access_token is not correct
  - [X] params
    - [X] params not provided
    - [X] event_id is not provided
    - [X] event_id is invalid(type error)

### GET /lottery/member
- [X] data format check for successful request
- [X] check response of uncompleted request(header, params, body not completed)
  - [X] headers
    - [X] access_token is not provided
    - [X] access_token is not correct
  - [X] params
    - [X] params not provided
    - [X] member_id is not provided
    - [X] member_id is invalid(type error)


## System API testing todo

### POST /admin/lottery
### GET /admin/lottery
- [X] data format check for successful request
- [X] check response of uncompleted request(header, params, body not completed)
  - [X] params
    - [X] paging type is invalid
    - [X] amount type is invalid

### PUT /admin/lottery
### GET /admin/record
- [X] data format check for successful request
- [X] check response of uncompleted request(header, params, body not completed)
  - [X] params
    - [X] id type is invalid
    - [X] paging type is invalid
    - [X] amount type is invalid
