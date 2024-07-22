# 1.回顾

```tex
1. JDBC
	连接数据库并操作
2. HelloWorld
	导入jar包(数据库驱动包)
	准备数据库和表格
	编写java代码连接并操作
		加载驱动
		获取数据库连接
		获取命令对象(预命令对象)
		绑定参数并执行
		关闭资源
3. 注册练习
4. 预命令对象的使用
	预编译的sql语句
	绑定参数
5. 将字节数据存储到数据库
6. 自动返回自增主键
7. 批处理
```

# 2.JDBC

## 2.1 事务处理

```java
//完成转账的需求
//编程式事务  or  声明式事务
public static void main(String[] args) throws Exception {
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");
    //1. 设置手动提交
    connection.setAutoCommit(false);
    PreparedStatement preparedStatement = connection.prepareStatement("update account set balance=? where id=?");

    try {
        //张三减少50
        preparedStatement.setObject(1,800);
        preparedStatement.setObject(2,1);
        preparedStatement.executeUpdate();

        int i=10/0;//模拟的异常

        //赵四增加50
        preparedStatement.setObject(1,1150);
        preparedStatement.setObject(2,2);
        preparedStatement.executeUpdate();

        //2. 进行提交
        connection.commit();
    } catch (Exception e) {
        e.printStackTrace();
        //3. 回滚
        connection.rollback();
    } finally {
        preparedStatement.close();
        connection.close();
    }
}
```

## 2.2 数据库连接池

- 好处
  - 提前准备好一些数据库连接，提高用户的使用效率
  - 提高数据库连接的利用率

- 产品
  - dbcp
  - dbcp2
  - c3p0
  - druid ★

- 使用
  - 导入jar包
  - 创建数据源对象
  - 获取数据库连接

## 2.3 JdbcUtils01的封装

```java
package com.atguigu.jdbc;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.*;
import java.util.Properties;

/**
 * 功能：
 *      ① 对外提供数据库连接
 *      ② 对外提供关闭资源的方法
 *      ③ 添加了数据库连接池
 *      ④ 将数据库的信息提取到配置文件
 *          a. 在src下创建一个配置文件(db.properties)
 *          b. 将数据库的信息写到配置文件内
 *          c. 让Properties去读取配置文件内容
 */
public class JdbcUtils01 {

    //数据源
    private static DataSource dataSource;

    static {
        try {
            //需要将数据库的连接信息给到数据库连接池
            Properties properties=new Properties();

            //通过类加载器去自动寻找配置文件
            properties.load(JdbcUtils01.class.getClassLoader().getResourceAsStream("db.properties"));

            dataSource=DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //对外提供数据库连接
    public static Connection getConnection(){

        try {
            //从数据库连接池中获取一个数据库连接返给用户
            return dataSource.getConnection();
        } catch (SQLException e) {
           e.printStackTrace();
        }
        return null;
    }

    //对外提供关闭资源的方法
    public static void close(Connection connection, Statement statement, ResultSet resultSet){
        try {
            if(connection!=null){
                connection.close();
            }
            if(statement!=null){
                statement.close();
            }
            if(resultSet!=null){
                resultSet.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public static void close(Connection connection){
        try {
            if(connection!=null){
                connection.close();
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

}
```



## 2.4 Dbutils

- 好处
  - 快速进行增删改查
    - 省略参数绑定
    - 省略结果集处理

- 使用
  - 导入jar包
  - 创建QueryRunner对象
  - 调用方法对数据库做操作

```java
/**
 *  总结：
 *     QueryRunner  核心类
 *           update方法    增删改
 *           query方法     查询
 *              结果集处理器：  BeanHandler(Class c)    BeanListHandler(Class c)    ScalarHandler
 */

public class Demo02 {
    //DBUtils的使用
    public static void main(String[] args) throws SQLException {
        //1. 创建一个核心类对象
        QueryRunner runner=new QueryRunner();
        //2. 调用runner的方法进行数据库操作
        //2.1 增删改
        /*Connection connection = JdbcUtils01.getConnection();
        int update = runner.update(connection, "insert into users values(null,?,?)", "admin666", "root666");
        System.out.println("update = " + update);*/

        //2.2 查询
            //select * from users where id=?
            //select * from users
            //select username from users where id=?
            //结果集处理器

        Connection connection = JdbcUtils01.getConnection();
        //处理单条数据的   BeanHandler(Class c)
//        User user = runner.query(connection, "select * from users where id=?", new BeanHandler<>(User.class), 2);
//        System.out.println("user = " + user);

        //处理多条数据的    BeanListHandler(Class c)
       /* List<User> userList = runner.query(connection, "select * from users", new BeanListHandler<>(User.class));
        userList.forEach(System.out::println);*/

        //处理单个数据     ScalarHandler
        Object query = runner.query(connection, "select count(*) from users", new ScalarHandler<>());
        System.out.println("query = " + query);
        //3. 关闭资源
        JdbcUtils01.close(connection);

    }
    }
```

## 2.5 BaseDao封装

```java
package com.atguigu.dao;

import com.atguigu.bean.User;
import com.atguigu.jdbc.JdbcUtils01;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * 功能：提供通用的增删改查方法
 */
public abstract class BaseDao<T> {
   private QueryRunner runner=new QueryRunner();

    //实现通用的增删改
    public boolean update(String sql,Object...params){
        Connection connection = JdbcUtils01.getConnection();
        try {
            int update = runner.update(connection, sql, params);
            if(update>0)
                return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils01.close(connection);
        }
        return false;
    }

    //实现通用的查询之查询一条数据
    public  T getBean(Class type,String sql,Object...params){

        Connection connection = JdbcUtils01.getConnection();
        try {
            return runner.query(connection, sql, new BeanHandler<T>(type), params);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils01.close(connection);
        }
    }
    //实现通用的查询之查询多条数据
    public List<T> getList(Class type,String sql,Object...params){

        Connection connection = JdbcUtils01.getConnection();
        try {
            return runner.query(connection, sql, new BeanListHandler<T>(type), params);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils01.close(connection);
        }
    }
    //实现通用的查询之查询一个数据
    public Object getOnly(String sql,Object...params) {
        Connection connection = JdbcUtils01.getConnection();
        try {
            return runner.query(connection,sql,new ScalarHandler<>(),params);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcUtils01.close(connection);
        }
    }

}
```

## 2.6 ThreadLocal

```java
package com.atguigu.jdbc;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * 功能：
 *      ① 对外提供数据库连接
 *      ② 对外提供关闭资源的方法
 *      ③ 添加了数据库连接池
 *      ④ 将数据库的信息提取到配置文件
 *          a. 在src下创建一个配置文件(db.properties)
 *          b. 将数据库的信息写到配置文件内
 *          c. 让Properties去读取配置文件内容
 *      ⑤ 添加了一个数据库连接的存储容器 ThreadLocal
 */
public class JdbcUtils02 {

    //数据源
    private static DataSource dataSource;

    //创建一个容器
    private static ThreadLocal<Connection> local=new ThreadLocal<>();

    static {
        try {
            //需要将数据库的连接信息给到数据库连接池
            Properties properties=new Properties();

            //通过类加载器去自动寻找配置文件
            properties.load(JdbcUtils02.class.getClassLoader().getResourceAsStream("db.properties"));

            dataSource=DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //对外提供数据库连接
    public static Connection getConnection(){
        Connection connection = local.get();
        if(connection==null){
            try {
                //从数据库连接池中获取一个数据库连接返给用户
                connection= dataSource.getConnection();
                local.set(connection);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return connection;
    }

    //对外提供关闭资源的方法
    public static void close(){
        Connection connection = local.get();
        try {
            if(connection!=null){
                connection.close();
                local.remove();
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
```

# 3.前端工程化

## 3.1 web概述

- 客户端
  - 客户使用的一端就是客户端
    - 电脑下载安装的软件
    - 电脑上的浏览器
    - 手机、平板上app
    - 微信小程序
    - 智能家居、汽车
    - ...

- 服务器端
  - 为客户端提供服务的一端就是服务器端
  - 硬件
    - 电脑( 操作系统 --> linux )
  - 软件
    - 服务器软件(部署我们的项目)

- 请求
  - 客户端发送数据到服务器端

- 响应
  - 服务器发送数据到客户端

- C/S 和 B/S



## 3.2 HTML

- HTML
  - 做网页布局和内容(毛坯房)
- CSS
  - 美化网页(装修)
- JavaScript(JS)
  - 实现一些动态效果

- 概述
  - 超文本标记语言
    - 超文本
      - 图片、音频、视频...
    - 标记语言
      - 通过标签编写的语言

### 3.2.1 标签

- 双标签
  - <abc>内容</abc>
- 单标签
  - <abc/>

### 3.2.2 属性

```tex
<a href="http://baidu.com">点击跳转至百度</a>
	属性：href="http://baidu.com"
<img src="图片的路径" title="提示信息"/>
```

## 3.3 HTML的HelloWorld

- 创建一个html文件(以html结尾的文件)
- 编写html代码
  - 文档声明
  - 根节点
  - 头部
  - 身体
  - 注释

















