# 1.回顾

```tex
1. JDBC
	事务处理
	封装JdbcUtils
		对外提供数据库连接
		对外提供释放资源
	数据库连接池
	将数据库信息提取到配置文件
	DBUtils
	BaseDao工具封装
	ThreadLocal
2. 前端工程化
	web概述
	HTML:超文本标记语言
	HelloWorld
	vs code
```

# 2.HTML

## 2.1 head中的标签

```html
<head>
    <!-- 1. meta  charset是设置网页的编码格式 -->
    <meta charset="UTF-8">
    <!-- 2. title  设置网页的标题 -->
    <title>bj1023</title>
    <!-- 3. style  设置样式 -->
    <!-- 4. link  引入样式文件 -->
    <!-- 5. script  编写js代码 -->
</head>
```

## 2.2 body中的标签

### 2.2.1 基础标签01

```html
<!DOCTYPE html>
<HTML lang="en">
<HEAD>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</HEAD>
<body>
    <!-- 1. 标题标签   h1~h6   功能：改变字体大小和加粗、换行  -->
    <h1>标题</h1>
    <h2>标题</h2>
    <h3>标题</h3>
    <h4>标题</h4>
    <h5>标题</h5>
    <h6>标题</h6>
    <h7>标题</h7>
    尚硅谷
    atguigu.com

    <!-- 2. 倾斜标签   i -->
    尚硅谷 <i>尚硅谷 </i>

    <!-- 3. 加粗标签 b  -->
    尚硅谷 <b>尚硅谷</b>

    <!-- 练习 -->
    尚硅谷 <b><i>尚硅谷</i></b>


    <h1>标题1</h1>
    标题2
    <br/>

    <!-- 注释内容 <!-- 内部注释 -->  -->
</body>
</html>
```

### 2.2.2 基础标签02

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 1. 段落标签    p -->
    <p>前端工程师“Front-End-Developer”源自于美国。</p>
    

    <!-- 2. 换行标签   br -->
    大约从2005年开始正式的前端工程师角色被行业所认可，<br>
    到了2010年，互联网开始全面进入移动时代，<br>前端开发的工作越来越重要

    <!-- 3. 列表  
        3.1 有序列表   ol  li
        3.2 无序列表   ul  li
    -->
    <ol type="i">
        <li>北京</li>
        <li>深圳</li>
        <li>上海</li>
        <li>武汉</li>
        <li>西安</li>
        <li>成都</li>
    </ol>

    <ul>
        <li>我的世界</li>
        <li>QQ飞车</li>
        <li>英雄联盟</li>
        <li>原神</li>
        <li>王者荣耀</li>
    </ul>
</body>
</html>
```

### 2.2.3 超链接

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 1. 超链接  a 
        href属性： 设置超链接的目标地址(网络上的资源和本地资源)
        target属性：  设置新窗口的位置
            _self  本窗口(默认值)
            _blank  新开窗口
    -->
    <a href="http://baidu.com" target="_self">点击跳转至百度</a>
    <a href="http://atguigu.com"  target="_blank">点击跳转至尚硅谷</a>
    <!-- 
        目标路径
            ./     当前文件所在的级别
            ../    当前文件所在级别的上一级
     -->
    <a href="./01_head中的标签.html">点击跳转至01</a>
    <a href="./02_body的基础标签.html">点击跳转至02</a>
    <a href="./aa/bb/cc.html">点击跳转至cc</a>
</body>
</html>
```

### 2.2.4 多媒体

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 1. 图片 img
        src属性：设置图片路径
        width: 设置宽度
        height: 设置高度
        title: 鼠标悬停的提示信息
        alt:图片加载失败的提示信息
    -->
    <img src="./sources/20231030162428.jpg"  height="300px" title="这是日照金山，好看吗？">
    <img src="./sources/20231030162441.jpg" width="300px" alt="图片加载失败了">

    <!-- 2. 音频 -->
    <audio src="./sources/music.mp3" controls="controls" loop></audio>  <br>
    <!-- 3. 视频 -->
    <video src="./sources/movie.mp4" controls  loop></video>

</body>
</html>
```

### 2.2.5 表格

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 1. 表格
        table  表格
            border="边框宽度"
            width="表格宽度"
            align="表格的位置（left/right/center）"
        thead  tbody  tfoot
        tr         行
        td/th      单元格
            合并单元格
                colspan跨列
                rowspan跨行

    -->

    <table border="1" width="300px" height="300px" align="center">
        <tr>
            <th colspan="2">a1</th>
            <!-- <th>a2</th> -->
            <th rowspan="3">a3</th>
        </tr>
        <tr>
            <td rowspan="2">b1</td>
            <td>b2</td>
            <!-- <td>b3</td> -->
        </tr>
        <tr>
            <!-- <td>c1</td> -->
            <td>c2</td>
            <!-- <td>c3</td> -->
        </tr>
    </table>
</body>
</html>
```

### 2.2.6 表单

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 
        1. 表单
            form标签
                action属性：设置表单内数据的提交位置(提交到java程序，暂时用一个网页路径代替)
                method属性: 设置提交方式
                    get (默认值)
                    post
        2. 表单项
            用户名、密码、身份证号码、验证码、手机号、邮箱、性别、生日、地址、爱好、学历、身高、体重、附件简历、上传头像、个人简介

            2.1 文本框  input
                type属性：text

            2.2 密码框  input
                type="password"

            2.3 单选按钮  input
                type="radio"
                如何设置单选效果
                    添加name属性，并设置一样的name属性值
                如何设置默认选中
                    在需要默认选中的标签上添加checked属性
            2.4 日期表单  input
                type="date"

            2.5 地址  select+option
                如何设置默认选中
                    在需要默认选中的标签上添加selected属性

            2.6 爱好  input
                type="checkbox"
                如何设置默认选中
                    在需要默认选中的标签上添加checked属性

            2.7 头像  input
                type="file"

            2.8 多行文本域  textarea

            2.9 隐藏域  input
                type="hidden"

            2.10 按钮  input或button
                普通按钮  type="button"
                提交按钮  type="submit"
                重置按钮  type="reset"
        3. 介绍两个重要属性
            name : 为数据设置key值(表单项如果没有name属性值，则不会被提交)
            value : 值，表单项的值
                value属性值 == 用户输入/选择的值
     -->
     <form action="./success.html" method="get">
        username:<input type="text" name="username" value="bj1023"/>  <br>
        password:<input type="password" name="password" value="333"/>  <br>
        gender:<input type="radio" name="abc" value="1"/> 男 <input type="radio" name="abc" checked value="0"/>女 <br>
        birthday: <input type="date" name="birthday"> <br>
        address:  
        <select name="address">
            <option value="bj">北京市</option>
            <option value="hn">河南省</option>
            <option  selected>河北省</option>
            <option >山东省</option>
            <option >山西省</option>
        </select>省  <br>
        hobby:
            <input type="checkbox" checked name="hobby" value="java">java 
            <input type="checkbox" name="hobby" value="唱">唱  
            <input type="checkbox" checked name="hobby" value="跳">跳 
            <input type="checkbox" name="hobby" value="rap">rap 
            <input type="checkbox" name="hobby" value="篮球">篮球  <br>
        file: <input type="file" name="file">  <br>
        info <textarea cols="30" rows="10" name="info"></textarea>  <br>
        hidden:  <input type="hidden" name="hidden" id="" value="隐藏数据">  <br>
        <input type="button" value="按钮上的字">
        <button type="button">按钮</button>
        <input type="submit" value="提交">
        <button type="submit" >提交</button>
        <input type="reset" value="重置">
        <button type="reset">重置</button>

     </form>
</body>
</html>
```

### 2.2.7 其他

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 1. 布局相关  div+css   span -->
    <div style="border: 1px solid red;width: 200px; height: 200px;">一个框<br>aaa</div>

    尚硅谷
    <span>atguigu.com</span>  <br>

    <!-- 2. 实体兑换 
        空格   &nbsp;
        <      &lt;
        >      &gt;
        版权符  &copy;

    -->
    尚硅谷&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;atguigu.com
    1. 选出下面哪个是换行标签？（）
    A. &lt;h1&gt;</h1>
    B. <b></b>
    C. <br>
    D. <h3></h3> 
    &copy;
</body>
</html>
```



## 2.3 html的语法规则

- 根标签是`<html></html>`有且只能有一个
- 无论是双标签还是单标签都需要正确关闭；
  - 单标签可以不关(功能上没有影响)

- 标签可以嵌套但不能交叉嵌套；
- 注释语法为<!-- -->  ，注意不能嵌套；

- 属性必须有值，值必须加引号，H5中属性名和值相同时可以省略属性值
- HTML中不严格区分字符串使用单双引号
- HTML标签不严格区分大小写，但是不能大小写混用；
- HTML中不允许自定义标签名，强行自定义则无效；

# 3.CSS

## 3.1 CSS的引入方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* css的注释，内部样式 */
        /* 选择器：选择需要设置样式的元素 */
        /* a. 标签选择器 ：根据标签名进行选择 */
        /* p{color: red;font-size: 30px;} */
        /* b. id选择器  ： 根据id属性值进行选择 */
        /* #p01{
            color: red;
            font-size: 30px;
        } */
        /* c. 类选择器：  根据class属性值进行选择 */
        /* .c01{color: red;
            font-size: 30px;} */
    </style>

    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <!-- 1. 行内样式
        将样式代码以属性的方式写在标签上
    -->
    <!-- <p style="color: red;">CSS  层叠样式表(英文全称：(Cascading Style Sheets),</p>
    <p style="font-size: 30px;">能够对网页中元素位置的排版进行像素级精确控制，</p>
    <p style="color: red;font-size: 30px;">支持几乎所有的字体字号样式，</p>
    <p>拥有对网页对象和模型样式编辑的能力 ，简单来说，美化页面。</p> -->

    <!-- 2. 内部样式
        将样式代码写在head标签内    
    -->

    <!-- 3. 外部引入
        将样式代码写在css文件内，html将文件引入进来
    -->
    <h1>标题</h1>
    <p id="p01" class="c01">CSS  层叠样式表(英文全称：(Cascading Style Sheets),</p>
    <p class="c01">能够对网页中元素位置的排版进行像素级精确控制，</p>
    <p class="c01">支持几乎所有的字体字号样式，</p>
    <p>拥有对网页对象和模型样式编辑的能力 ，简单来说，美化页面。</p>
</body>
</html>
```

## 3.2 常用css

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* div{
            width: 300px;
            height: 150px;
            border: 1px solid blue;
            
        }
        .div02{
            position: fixed;
            top:300px;
            left: 500px;
        } */

        .div01{
            width: 300px;
            height: 300px;
            border: 1px solid red;
        }

        .div02{
            width: 100px;
            height: 100px;
            border: 1px solid rgb(0, 255, 98);
            margin-top: 50px;
            margin-left: 60px;
            padding-top: 20px;
            padding-left: 30px;
        }
    </style>
</head>
<body>
    <!-- <div>div01</div>
    <div class="div02">div02</div>
    <div>div03</div>
    <div>div04</div>
    <div>div05</div>
    <div>div06</div> -->

    <div class="div01">
        <div class="div02">div02</div>
    </div>
</body>
</html>
```

# 4.js















