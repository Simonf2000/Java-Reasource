# 1.JDBC 

## 1.1 什么是JDBC

- 它是代表一组独立于任何数据库管理系统（DBMS）的API
  - 能够连接很多种类的数据库(需要该数据库实现jdbc标准)

## 1.2 HelloWorld

- 导入mysql驱动包

- 准备数据库和表格

- 编写java代码连接数据库并操作

  - ```java
    //增删改
    public static void main(String[] args) throws Exception {
            //1. 加载驱动(在新版本中可以省略)
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2. 驱动管理器中获取数据库连接
            String url="jdbc:mysql://localhost:3306/bj1023";
            Connection connection = DriverManager.getConnection(url, "root", "root");
            System.out.println("connection = " + connection);
            //3. 获取命令对象(操作数据库)
            Statement statement = connection.createStatement();
            //4. 操作(增删改查)
    //        int i = statement.executeUpdate("insert into users values(null,'admin','root')");
    //        int i = statement.executeUpdate("update users set password='root666' where id=1");
            int i = statement.executeUpdate("delete from users where id=1");
            System.out.println("i = " + i);
            //5. 需要释放资源
            statement.close();
            connection.close();
        }
    ```

  - ```java
    //查询
    public static void main2(String[] args) throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
    
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");
        Statement statement = connection.createStatement();
    
        //进行查询
            //查询的三种情况
            //select * from users where id=1    或  select * from users where username=''
            //select * from users   或    select * from users where username like ''
            //select count(*) from users  或   select password from users where id=1
    
        ResultSet resultSet = statement.executeQuery("select * from users");
    
        //处理结果集(从resultSet中拿出数据)，类似于迭代器
        while (resultSet.next()){
            int anInt = resultSet.getInt(1);
            System.out.println("anInt = " + anInt);
    
            int id = resultSet.getInt("id");
            System.out.println("id = " + id);
    
            
            String string = resultSet.getString(2);
            System.out.println("string = " + string);
    
            String username = resultSet.getString("username");
            System.out.println("username = " + username);
    
            //如果你不确定结果集是什么数据类型
            String string1 = resultSet.getString(1);
            System.out.println("string1 = " + string1);
    
            Object object = resultSet.getObject(1);
            System.out.println("object = " + object);
    
        }
    
    }
    ```

## 1.3 注册练习

```java
package com.atguigu.jdbc;

import java.sql.*;
import java.util.Scanner;

public class Demo2 {
    //练习：在控制台模拟网页，完成注册和登录功能
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        System.out.println("欢迎来到尚硅谷！ 1. 注册  2.登录");
        int i = input.nextInt();
        if(i==1){
            System.out.println("欢迎来到注册页面！");
            System.out.println("请输入用户名和密码");
            String username=input.next();
            String password=input.next();

            //将数据添加到数据库
            //1. 拿着用户名去查询
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");
            Statement statement = connection.createStatement();
            //select * from users where username='admin'
            String sql="select * from users where username='"+username+"'";
            System.out.println("sql = " + sql);
            ResultSet resultSet = statement.executeQuery(sql);

            //2. 如果没有就新增
            if(resultSet.next()){
                System.out.println("用户名重复，请更换！");
            }else{
                //进行新增操作
                Connection connection1 = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");
                Statement statement1 = connection.createStatement();
                int i1 = statement1.executeUpdate("insert into users values(null,'" + username + "','" + password + "')");
                if(i1>0){
                    System.out.println("注册成功");
                }
            }

        }else if(i==2){
            System.out.println("欢迎来到注册页面！");
        }

    }
}
```

## 1.4 Preparestatement

- 避免sql语句拼接
- 避免sql注入

```java
public static void main(String[] args) throws Exception {
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");

    //获取预命令对象(对sql语句进行预编译)   提高效率
    //准备预编译的sql语句(对于不知道的数据用占位符占位--> ? )
    String sql="insert into users values(null,?,?)";
    PreparedStatement preparedStatement = connection.prepareStatement(sql);

    System.out.println("请输入用户名");
    Scanner input=new Scanner(System.in);
    String username=input.next();

    //进行参数绑定
    preparedStatement.setString(1,username);
    preparedStatement.setString(2,"root567");

    //执行
    int i = preparedStatement.executeUpdate();
    System.out.println("i = " + i);


    //关闭
    preparedStatement.close();
    connection.close();


}
```

## 1.5 将字节数据存储到数据库

```java
public static void main1(String[] args) throws Exception {
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");

    //获取预命令对象(对sql语句进行预编译)   提高效率
    //准备预编译的sql语句(对于不知道的数据用占位符占位--> ? )
    String sql="insert into t_user values(null,?,?,?)";
    PreparedStatement preparedStatement = connection.prepareStatement(sql);

    preparedStatement.setString(1,"admin333");
    preparedStatement.setString(2,"root333");
    preparedStatement.setObject(3,new FileInputStream("D:\\images\\logo.png"));

    int i = preparedStatement.executeUpdate();
    System.out.println("i = " + i);


    preparedStatement.close();
    connection.close();
}
```

## 1.6 自动返回自增主键值

```java
public static void main(String[] args) throws Exception {
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");

    //获取预命令对象(对sql语句进行预编译,返回主键值的参数)   提高效率
    //准备预编译的sql语句(对于不知道的数据用占位符占位--> ? )
    String sql="insert into users values(null,?,?)";
    PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

    //进行参数绑定
    preparedStatement.setString(1,"admin444");
    preparedStatement.setString(2,"root567");

    //执行
    int i = preparedStatement.executeUpdate();
    System.out.println("i = " + i);

    //获取自增主键值
    ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
    if(generatedKeys.next()){
        int anInt = generatedKeys.getInt(1);
        System.out.println("anInt = " + anInt);
    }

    //关闭
    preparedStatement.close();
    connection.close();
}
```

## 1.7 批处理

```java
//没有批处理的5万条数据新增
public static void main1(String[] args) throws Exception {
    long start = System.currentTimeMillis();

    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023", "root", "root");

    //获取预命令对象(对sql语句进行预编译,返回主键值的参数)   提高效率
    //准备预编译的sql语句(对于不知道的数据用占位符占位--> ? )
    String sql="insert into users values(null,?,?)";
    PreparedStatement preparedStatement = connection.prepareStatement(sql);

    for (int i = 1; i <= 50000; i++) {
        preparedStatement.setString(1,"admin444");
        preparedStatement.setString(2,"root567");

        preparedStatement.executeUpdate();
    }

    connection.close();
    preparedStatement.close();

    long end = System.currentTimeMillis();
    System.out.println(end-start);//237582
}
//批处理的5万条数据新增
public static void main(String[] args) throws SQLException {
    long start = System.currentTimeMillis();
    //在url上拼接一个参数，开通批处理
    //url?key=value&key=value&key=value
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/bj1023?rewriteBatchedStatements=true", "root", "root");

    //获取预命令对象(对sql语句进行预编译,返回主键值的参数)   提高效率
    //准备预编译的sql语句(对于不知道的数据用占位符占位--> ? )
    String sql="insert into users values(null,?,?)";
    PreparedStatement preparedStatement = connection.prepareStatement(sql);

    for (int i = 1; i <= 50000; i++) {
        preparedStatement.setString(1,"admin444");
        preparedStatement.setString(2,"root567");

        preparedStatement.addBatch();

        if(i%1000==0){
            preparedStatement.executeBatch();
        }
    }

    connection.close();
    preparedStatement.close();

    long end = System.currentTimeMillis();
    System.out.println(end-start);
}
```











