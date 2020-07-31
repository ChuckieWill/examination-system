#  账户

```js
{
    "account":"theTeacher",
    "password":"theTeacherPassword",
    "role":1
}


```





#  零、登录注册

##  1 登录、注册同一个接口

###  URL

```js
POST /user/new
```

###  参数

```js
account - 昵称，password - 密码
```

###  返回值

* 注册成功或登录查询用户存在都是返回相同的结果

```js
{
  "status": "ok",
  "token": "2489ry98qy43ugq23urcm98we",
  "userId": 111111
}
```





##  首页正在考试信息

###  URL

```js
GET  /home/testing
```

###  参数

```js
userId:     //用户唯一表示
```

###  返回值

```json
[{
	"titel": "考试名称1",
    "timeStart": Wed Jul 15 2020 16:52:35 GMT+0800 (中国标准时间),  //标准date时间，考试考试时间
	"timeEnd": Wed Jul 15 2020 18:53:44 GMT+0800 (中国标准时间), //考试结束时间
	"grade": 100,  //试卷总分
	"duration": 3600,  //时长，单位秒
	"testNum": 45,  //需要参加考试的人数
	"testingNum": 40, //正在参加考试的人数
},{
	"titel": "考试名称2",
    "timeStart": Wed Jul 15 2020 16:52:35 GMT+0800 (中国标准时间),  //标准date时间，考试考试时间
	"timeEnd": Wed Jul 15 2020 18:53:44 GMT+0800 (中国标准时间), //考试结束时间
	"grade": 100,  //试卷总分
	"duration": 3600,  //时长，单位秒
	"testNum": 50,  //需要参加考试的人数
	"testingNum": 48, //正在参加考试的人数
}]
```

# 一、题目管理

##  1 提交题目

###   URL

```js
POST /subject/submit
```

###  参数

```json
{
    "userId":10000,
    "title": "下列一组句子中，没有语病的一句是",
    "options": ["桑娜无论自己受苦，都要收养西蒙的两个孩子"," 校园里屹立着一棵棵松树。"," 《蒙娜丽莎》这幅画的作者是达·芬奇。"," 我一定改正不好的缺点。"],
    "answer": [0,3],
    "category": "一年级",
    "type": 0,
    "difficulty": 1,
    "createTime": Wed Jul 15 2020 18:53:44 GMT+0800 (中国标准时间),
}
```

###  参数解释

```js
{
    "userId": 用户唯一标识
    "title": 题目
    "options": 选项，存放在数组中，按a,b,c,d的顺序存放的
    "answer": 答案，数组，数字与字母对应关系：0-A,1-b,2-c,3-d  
    "category": 分类，有1-6年级的分类
    "type": 类型，数字与类型对应关系：0-单选题，1-多选题
    "difficulty": 题目难度，数字与难度对应关系：0-1星难度，，，，，，4-5星难度
    "createTime": Wed Jul 15 2020 18:53:44 GMT+0800 (中国标准时间),
}
```

###  前端对应界面

![image-20200715184845041](B端接口文档/image-20200715184845041.png)

##  2 查询题目

###  URL

```
GET /subject/search
```

###  参数

* 无条件查询则无参数
* 有条件查询  查询条件如下

```js
{
    "userId": 用户唯一标识,
    "category": "一年级",  
    "type": 0,
}
```

###  参数解释

* 按类型和分类查询   及根据题目年级分类和单多选类型查询

###  返回值

* 数组形式
* 数组每个元素为题目对象及上面提交的题目  只是多了一个后端题目的唯一id
* `totalNum`:  次查询可返回的总条数
* `page`: 当前返回的页码
* **每一页返回10条数据** ------- **后续所有的查询每页都只返回10条数据**

```json
{
    "totalNum": 100,
    "page": 1,
    "data": [
           {
                "subId": 10000,
                "title": "下列一组句子中，没有语病的一句是",
                "options": ["桑娜无论自己受苦，都要收养西蒙的两个孩子"," 校园里屹立着一棵棵松树。"," 《蒙娜丽莎》这幅画的作者是达·芬奇。"," 我一定改正不好的缺点。"],
                "answer": [0,3],
                "category": "一年级",
                "type": 0,
                "difficulty": 1,
                "createTime": Wed Jul 15 2020 18:53:44 GMT+0800 (中国标准时间),
            },{
                "id": 10000,
                "title": "下列一组句子中，没有语病的一句是",
                "options": ["桑娜无论自己受苦，都要收养西蒙的两个孩子"," 校园里屹立着一棵棵松树。"," 《蒙娜丽莎》这幅画的作者是达·芬奇。"," 我一定改正不好的缺点。"],
                "answer": [0,3],
                "category": "一年级",
                "type": 0,
                "difficulty": 1,
                "createTime": Wed Jul 15 2020 18:53:44 GMT+0800 (中国标准时间),
            } 
        ]
    
}
```



##  3 删除题目

###  URL

```js
GET  /subject/detele
```

###  参数

* 根据题目id删除
* 以数组的形式传入，删除多个

```json
{
    "userId": 用户唯一标识,
    "subIds": [10000, 100011], //题目唯一标识
}
```

### 返回值

```js
{
“status”:“ok”
}

```



#  二、试卷管理

##  1 提交接口

**提交内容：**

* 试卷名称
* 单选题分值
* 多选题分值
* 总题数
* 总分数
* 创建时间
* 试卷包含的题目：以数组的形式存放题目ID



##  2 查询试卷

**查询条件：**

* 情况1： 无查询条件

  * 参数

  ```js
  {
      "userId": 用户唯一标识,
      "pagendex": 
  }
  ```

  

* 情况2： 试卷名称**模糊**查询

  * 参数

  ```js
  {
      "userId": 用户唯一标识,
      "pagendex": 0,
      "paperTilte": 试卷名称
  }
  ```

  

**返回结果：**

* totalNum:  查询的总条数
* page:  当前返回的页码
* data： 返回的考试试卷数组  就是上面提交的对象，只是多了试卷唯一ID
* **每次返回都是10条记录**

```json
{
    "totalNum": 100,
    "page": 1,
    "data": [ ]
    
}
```



##  3 试卷删除

**参数**

```js
    {
        "userId": 用户唯一标识,
        "papers": [10000, 100011], //删除试卷id
    }

```

```js
POST /paper/delete HTTP/1.1
Host: http://localhost:8080
Content-Type: application/json

{
    "userId":194,
    "papers":[1,2,3]
}


```









#  三、考试管理

##  1 提交接口

###  URL  POST   ` /exam/add `

**提交内容：**

* userId

* 考试名称
* 考试开始时间
* 考试时长 单位：分钟
* 考试说明
* 考试对应的试卷id

```js
{
    userId:
   	examTitle: '',
    examStartTime:  ,
    examTotalTime:  ，
    examDescribe: '',
    paperId: 0000
        
}
```



##  2 考试查询

**查询条件：**

* 情况1 ：无条件查询
* 参数

```js
{
    userId: 0,
    pageIndex: 0
}
```



**返回结果：**一页10条

直接返回提交的即可，只是每个考试对象多了考试ID

```js
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:8080/home/testing?userId=123&pageIndex=0',
  headers: { 
    'Cookie': 'JSESSIONID=267504A5FCD0454605A544A1A31A7F3B'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```





#  四、成绩管理

##  1 成绩查询

根据试卷id查询

* 参数

```js
GET /user/exam/students?userId=123&examId=123 HTTP/1.1
Host: http://localhost:8080
Cookie: JSESSIONID=26CE98CB940E980B884F8FF13FC5BAE0



{
    "data": [
        {
            "level": 0,
            "name": "theStudent",
            "timeSubmit": "2020-07-30T03:59:31.555+00:00",
            "id": 195,
            "marks": 1.0,
            "detail": "ok",
            "status": "ok"
        }
    ],
    "totalNum": 1
}

```



**查询结果需要的数据：**

![1595942217155](B端接口文档/1595942217155.png)

##  



#  五、用户管理

##  1 用户查询

根据老师的id查询

**查询结果需要的数据：**

```js
GET /user/mystudents/all?userId=123 HTTP/1.1
Host: http://localhost:8080
Cookie: JSESSIONID=26CE98CB940E980B884F8FF13FC5BAE0
GET /user/mystudents/all?userId=123 HTTP/1.1
Host: http://localhost:8080
Cookie: JSESSIONID=26CE98CB940E980B884F8FF13FC5BAE0



[
    {
        "id": 195,
        "roleCode": 0,
        "nickName": "theStudent",
        "phoneNumber": null,
        "password": "theStudentPassword",
        "level": 0
    }
]


```





##  2 删除用户



