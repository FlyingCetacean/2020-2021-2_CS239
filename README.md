# 📈2020-2021-2_CS239📊
数据可视化与可视分析





## [hw1](https://github.com/FlyingCetacean/2020-2021-2_CS239/tree/main/%E4%BD%9C%E4%B8%9A1)

## hw2

## hw3

## hw4

## hw5

## hw6

## hw7

## hw8





## Final-Project：ChinaVis 2021🌏

王泽浩 王正 郑东林 王星力


### 题目概述

### 时间表
### 开发文档
#### 开发环境
```
python
echart
```
#### 前端
##### 热力图

[热力图](https://echarts.apache.org/examples/zh/editor.html?c=effectScatter-bmap)
##### 柱状图与折线图
找到一个功能强大、交互多样的[实例](https://echarts.apache.org/examples/zh/editor.html?c=bar-label-rotation)
#### 后端
##### 数据库下载
jbox [包含日数据的数据库](https://jbox.sjtu.edu.cn/l/hFDBsS)（提取码：autm）（已更新）
### 接口约定
前后端暂时分别独自开发。暂定以字典进行交互。

| Name      | Type   | Example     | Comments |
| --------- | ------ | ----------- | -------- |
| Province: | String | "江苏省"    |          |
| City:     | String | "苏州市"    |          |
| Type:     | String | "P" "C" "N" |          |
| StartYear: | int             | 2013                                                         | 闭区间
| StartMon:  | int             | 1                                                            |
| StartDay:  | int             | 1                                                            |
| EndYear:   | int             | 2013                                                         | 闭区间
| EndMon:   | int             | 1                                                            |
| EndDay:   | int             | 1                                                            |
| Content:   | String List     | ["PM25","PM10","NO2","SO2","O3","CO","TEMP","RH","PSFC","lon","lat"] |
|            |                 |                                                              |
| Return:    | Dictionary List | [  { }, { } ]                                                | 要求按照时间的升序


### 数据库设计
数据库ChinaVis.db，表有Hourly，Daily，Monthly，Yearly，其中Hourly和Daily为原始数据，Monthly和Yearly是在Daily的基础上分别在月和年粒度上求的平均结果。(其实如果没有Yearly的话通过Monthly现求要的是几秒钟，前端展示效果不好，所以还是建一个。)

##### 以下是碎碎念
SQLite不支持对视图建索引。
由primary key生成的默认索引为(year, month, day, lat, lon)。
不再为month或day创建索引，通过python代码解决。例如如果需要每一年的同一个月份的数据，就遍历所有的年份，然后用确定的年份和月份select。
计划为(lat, lon)建立索引，方便对指定地点的信息进行查询。
以后如果需要月均数据，由于其数据量不小，计算一次要几十秒钟，就单独建一张月表，提前花时间计算好，然后到时候直接查月表。可以直接用月均的平均估计年均，这样年表就可以建得很快了，不准确的点在于认为所有月份的天数相等。（当然也可以建一个精确的年表，考虑一下每月的天数不同。）
做y1-m1-d1到y2-m2-d2的平均值，用year, month, day依次条件判断的方法可以利用索引，但遍历的太多，还是很慢。可行的做法是，夹在之间的整年的数据用年表查，两头的整月用月表查，再两头的日用日表查，考虑天数求加权平均。天数使用datetime标准库计算。
### 教程
[python字典教程](https://www.runoob.com/python/python-dictionary.html)
[git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
[github+git配合使用](https://segmentfault.com/a/1190000002645623) 可以免输入用户名密码。git的用户名和邮箱是你们的github账号
[sqlite教程](https://www.runoob.com/sqlite/sqlite-python.html)
[使用pandas将.csv导入SQLite](https://www.fullstackpython.com/blog/export-pandas-dataframes-sqlite-sqlalchemy.html)
