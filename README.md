# JEST practices 練習
- [JEST practices 練習](#jest-practices-練習)
  - [Target](#target)
  - [prerequisite](#prerequisite)
  - [Installation](#installation)
  - [Run](#run)
  - [API 簡介](#api-簡介)

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
    "test": "jest"
  },
```

## Run
`npm run test`: this command will run all the test.js file

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

## 測試重點
1. 200 success response 資料格式是否正確
2. 當 request 格式錯誤(request body 格式不對、required parameter 沒提供等)時是否有相對應的 response
3. response 的資料型別是否正確