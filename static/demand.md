1. （用户相关）获取用户ac题目、收藏题目、正在尝试做的题目。
请求：  
？  
成功响应：  
```
{
  "status": 200,
  "message": "",
  "data": {
    "star":[1001,1002,1003,1004,1005],
    "ac":[1001,1002,1005],
    "on":[1003,1004]
  }
}
```
失败响应：  
？
***
2. 获取近期的比赛列表  
请求，小于queryright返回最多内容(status:206)？
```
{
  "queryleft": 1,
  "queryright": 4
}
```
成功响应：  
``` 
{
  "status": 200,
  "message": "",
  "data": [{
    "contestTitle": "赛事标题",
    "contestContent": "赛事简介",
    "start": "开始时间戳",
    "end": "结束时间戳",
    "contestID": "赛事id，导航使用"
  }, {
    "contestTitle": "ACM/ICPC 2018",
    "contestContent": "ACM/ICPC 2018",
    "start": "2012-01-01T12:00:00Z",
    "end": "2012-01-01T12:00:00Z",
    "contestID": "2"
  }, {
    "contestTitle": "ACM/ICPC 2018",
    "contestContent": "ACM/ICPC 2018",
    "start": "2012-01-01T12:00:00Z",
    "end": "2012-01-01T12:00:00Z",
    "contestID": "3"
  }, {
    "contestTitle": "ACM/ICPC 2018",
    "contestContent": "ACM/ICPC 2018",
    "start": "2012-01-01T12:00:00Z",
    "end": "2012-01-01T12:00:00Z",
    "contestID": "4"
  }]
}
```
失败响应：    
？
***
3. 获取近期的讨论内容  
请求，小于queryright返回最多内容(从queryleft起的最多内容)(status:206)？
```
{
  "queryleft": 1,
  "queryright": 10
}
```
成功响应：
```
{
  "status": 200,
  "message": "",
  "data": [{
      "id": "讨论item的id",
      "imgurl": "用户头像",
      "imgalt":"头像替代文字，一般为发起者用户",
      "node": "讨论所在版块",
      "title":"讨论的标题",
      "timestamp": "讨论发起的时间戳2012-01-01T12:00:00Z",
      "laststamp": "最后回复时间戳2012-01-01T12:00:00Z",
      "sponsor":"讨论发起者",
      "terminator":"最后回复的用户//太复杂的话去掉这个？"
    },
    {
        "id": "1",
        "imgurl": "https://static.hdslb.com/images/member/noface.gif",
        "imgalt":"sakura",
        "node": "no",
        "title":"泰迪熊的体重是多少？",
        "timestamp": "2012-01-01T12:00:00Z",
        "laststamp": "最后回复时间戳2012-01-01T12:00:00Z",
        "sponsor":"sakura",
        "terminator":"泰迪熊"
    },
    {
        "id": "2",
        "imgurl": "https://static.hdslb.com/images/member/noface.gif",
        "imgalt":"sakura",
        "node": "no",
        "title":"泰迪熊的身高是多少？",
        "timestamp": "2012-01-01T12:00:00Z",
        "laststamp": "最后回复时间戳2012-01-01T12:00:00Z",
        "sponsor":"sakura",
        "terminator":"泰迪熊"
    }
  ]
}
```
失败响应：   
？
***
4. 最新添加的题目
请求，小于queryright返回最多内容(status:206)：
```
{
  "queryleft": 1,
  "queryright": 4
}
```
成功响应：
```
{
  "status": 200,
  "messages": "",
  "data": [{
      "problemsID": "1001",
      "problemsName": "A+B Problem",
      "problemsRatio": 0.96
    },
    {
      "problemsID": "1002",
      "problemsName": "A*B Problem",
      "problemsRatio": 0.90
    },
    {
      "problemsID": "1003",
      "problemsName": "A/B Problem",
      "problemsRatio": 0.85
    }, {
      "problemsID": "1004",
      "problemsName": "A+B Problem",
      "problemsRatio": 0.96
    }
  ]
}
```
失败响应：
？
***
5. 用于比赛页面的rank排名，比赛的用户排名  
请求：  
```
{
  "id": 1,//比赛id
  "queryleft": 1,
  "queryright": 5
}
```
成功响应：  
```
{
  "status": 200,
  "message": "",
  "data":[
    {
      "nickname": "用户nick",
      "aclist": [0,1,2,3,4,5,6]
    },{
      "nickname": "用户nick",
      "aclist": [0,1,2,3,4,5,6]
    },{
      "nickname": "用户nick",
      "aclist": [0,1,2,3,4,5,6]
    },{
      "nickname": "用户nick",
      "aclist": [0,1,2,3,4,5,6]
    },{
      "nickname": "用户nick",
      "aclist": [0,1,2,3,4,5,6]
    },]
}
```
失败响应： 
？
***
6. 获取比赛题量  
请求：  
```
{
  "id": 1//比赛id
}
```
成功响应： 
```
{
  "status": 200,
  "message": "",
  "data": {
    "sum": 10
  }
}
```
失败响应：  
？

