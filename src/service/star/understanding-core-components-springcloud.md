---
title: 认识SpringCloud核心组件
icon: circle-info
order: 2
category:
  - 微服务
tag:
  - 微服务
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


在上一节 [初步了解SpringCloud微服务架构](https://blog.csdn.net/qq_58608526/article/details/131110733?spm=1001.2014.3001.5501)， 我们初步学习了微服务架构的体系结构，对`SpringCloud`也有一个简单的了解。这一节我们来进一步认识`SpringCloud`的一些核心组件，在此之前我们先来一个案例练练手。

## 1.案例准备

### 1.1 案例说明

本部分我们按照普通方式模拟一个微服务之间的调用，后续我们将一步步使用Spring Cloud的组件对案例进行改造

需求：

- 订单微服务和用户微服务都必须有各自的数据库，相互独立

- 订单服务和用户服务都对外暴露Restful的接口

- 订单服务如果需要查询用户信息，只能调用用户服务的Restful接口，不能查询用户数据库

  **完整流程图**

![image-20230609140600652](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091406727.png)



cloud-demo：父工程，管理依赖

- `order-service`：订单微服务，负责订单相关业务
- `user-service`： 用户微服务，负责用户相关业务

### 1.2 案例数据库准备

`本次笔者数据库使用的是MySQL8`

**订单表**

```sql
/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50622
 Source Host           : localhost:3306
 Source Schema         : heima

 Target Server Type    : MySQL
 Target Server Version : 50622
 File Encoding         : 65001

 Date: 06/09/2023 14:57:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_order
-- ----------------------------
DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `price` bigint(20) NOT NULL COMMENT '商品价格',
  `num` int(10) NULL DEFAULT 0 COMMENT '商品数量',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_order
-- ----------------------------
INSERT INTO `tb_order` VALUES (101, 1, 'Apple 苹果 iPhone 12 ', 699900, 1);
INSERT INTO `tb_order` VALUES (102, 2, '雅迪 yadea 新国标电动车', 209900, 1);
INSERT INTO `tb_order` VALUES (103, 3, '骆驼（CAMEL）休闲运动鞋女', 43900, 1);
INSERT INTO `tb_order` VALUES (104, 4, '小米10 双模5G 骁龙865', 359900, 1);
INSERT INTO `tb_order` VALUES (105, 5, 'OPPO Reno3 Pro 双模5G 视频双防抖', 299900, 1);
INSERT INTO `tb_order` VALUES (106, 6, '美的（Midea) 新能效 冷静星II ', 544900, 1);
INSERT INTO `tb_order` VALUES (107, 2, '西昊/SIHOO 人体工学电脑椅子', 79900, 1);
INSERT INTO `tb_order` VALUES (108, 3, '梵班（FAMDBANN）休闲男鞋', 31900, 1);

SET FOREIGN_KEY_CHECKS = 1;
```



**用户表**

~~~sql
/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50622
 Source Host           : localhost:3306
 Source Schema         : heima

 Target Server Type    : MySQL
 Target Server Version : 50622
 File Encoding         : 65001

 Date: 01/04/2021 14:57:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收件人',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES (1, '柳岩', '湖南省衡阳市');
INSERT INTO `tb_user` VALUES (2, '文二狗', '陕西省西安市');
INSERT INTO `tb_user` VALUES (3, '华沉鱼', '湖北省十堰市');
INSERT INTO `tb_user` VALUES (4, '张必沉', '天津市');
INSERT INTO `tb_user` VALUES (5, '郑爽爽', '辽宁省沈阳市大东区');
INSERT INTO `tb_user` VALUES (6, '范兵兵', '山东省青岛市');

SET FOREIGN_KEY_CHECKS = 1;
~~~

cloud-user表中初始数据如下：

![image-20230609113947136](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091139178.png)

cloud-order表中初始数据如下：

![image-20230609114012494](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091140542.png)

`cloud-order`表中持有`cloud-user`表中的id字段。

### 1.3 环境搭建

`笔者并不喜欢直接创建SpringBoot项目，更倾向于创建Maven项目然后添加依赖以及yml文件，这样启动会更快一点，当然这个大家随意就好！`

我们基于Maven来构造工程环境，我们的工程模块关系如下所示：

![image-20230609140454827](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091404936.png)

首先 启动`IDEA`

#### 1. 创建一个空的项目

![image-20230609114432188](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091144298.png)

#### 2. 创建Maven工程

![image-20230609114555821](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091145888.png)

#### 3. 配置父工程依赖，SpringCloud版本以及对应的SpringBoot版本

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.cisyam</groupId>
    <artifactId>cloud-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <packaging>pom</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.9.RELEASE</version>
        <relativePath/>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <spring-cloud.version>Hoxton.SR10</spring-cloud.version>
        <mysql.version>8.0.23</mysql.version>
        <mybatisplus.version>3.5.1</mybatisplus.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <!-- springCloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- mysql驱动 -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>
            <!--mybatis plus-->
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>${mybatisplus.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <dependencies>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

</project>
~~~

#### 4.创建公共模块

`在父模块中创建子模块工程`

![image-20230609140910046](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091416290.png)

**跟刚刚的创建方式大同小异**

![image-20230609141718661](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091417734.png)

`生成数据库实体类`

~~~java
package com.cisyam.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 21:12
 */
@TableName("tb_order")
@Data
public class Order {
    private Long id;
    private Long price;
    private String name;
    private Integer num;
    private Long userId;

    @TableField(exist = false)
    private User user;
}
~~~

~~~java
package com.cisyam.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author gaoziman
 */
@Data
@TableName("tb_user")
public class User {
    private Long id;
    private String username;
    private String address;
}
~~~



#### 5. 创建用户模块工程

**用户微服务是服务提供者，订单服务是服务的消费者**

`在父模块中创建子模块工程`

![image-20230609140910046](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091409133.png)

**跟刚刚的创建方式大同小异**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091411880.png)



##### 5.1 引入依赖以及配置文件

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.cisyam</groupId>
        <artifactId>cloud-demo</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>springcloud01-user-service</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.cisyam</groupId>
            <artifactId>springcloud4-common</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--mybatis plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>${mybatisplus.version}</version>
        </dependency>
        <!--eureka客户端依赖-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
    </dependencies>
    <build>
        <finalName>app</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
~~~

##### 5.2 在用户微服务的pom文件中，引入公共组件坐标

~~~xml
 <dependency>
            <groupId>com.cisyam</groupId>
            <artifactId>springcloud4-common</artifactId>
            <version>1.0-SNAPSHOT</version>
</dependency>
~~~

##### 5.3 在yml配置文件中配置端口、应用名、数据库连接等信息

~~~yml
server:
  port: 9001
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/cloud-demo?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
  application:
    name: userservice
logging:
  level:
    com.cisyam: debug
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
~~~

##### 5.4 Mapper接口开发

```Java
package com.cisyam.user.mapper;



import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cisyam.pojo.User;
import org.apache.ibatis.annotations.Mapper;


/**
 * @author gaoziman
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    

}
```

##### 5.5 Serive层开发

**接口**

```Java
package com.cisyam.user.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.cisyam.pojo.User;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 20:54
 */
public interface UserService extends IService<User> {
}

```

**实现类**

```java
package com.cisyam.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cisyam.pojo.User;
import com.cisyam.user.mapper.UserMapper;
import com.cisyam.user.service.UserService;
import org.springframework.stereotype.Service;

/**
 * @author gaoziman
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {


}
```

##### 5.6 controller层开发

~~~java
package com.cisyam.user.controller;

import com.cisyam.pojo.User;
import com.cisyam.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;



    /**
     * 路径： /user/110
     *
     * @param id 用户id
     * @return 用户
     */
    @GetMapping("/{id}")
    public User queryById(@PathVariable("id") Long id) {
        return userService.getById(id);
    }
}

~~~

##### 5.7  启动类

~~~java
package com.cisyam.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

/**
 * @author gaoziman
 */
@MapperScan("com.cisyam.user.mapper")
@SpringBootApplication
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }
}
~~~

#### 6.创建订单模块工程

**用户微服务是服务提供者，订单服务是服务的消费者**

`在父模块中创建子模块工程`

![image-20230609140910046](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091456769.png)



**跟刚刚的创建方式大同小异**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091457504.png)

##### 6.1 引入依赖以及配置文件

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.cisyam</groupId>
        <artifactId>cloud-demo</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>springcloud02-order-service</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--mybatis plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
        </dependency>
    </dependencies>
    <build>
        <finalName>app</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
~~~

##### 6.2 在用户微服务的pom文件中，引入公共组件坐标

```xml
 <dependency>
            <groupId>com.cisyam</groupId>
            <artifactId>springcloud4-common</artifactId>
            <version>1.0-SNAPSHOT</version>
</dependency>
```

##### 6.3 在yml配置文件中配置端口、应用名、数据库连接等信息

~~~xml
server:
  port: 9002
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/cloud-demo?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
  application:
    name: orderservice
logging:
  level:
    com.cisyam: debug
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
~~~

##### 6.4 Mapper接口开发

~~~xml
package com.cisyam.order.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cisyam.pojo.Order;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 21:30
 */
@Mapper
public interface OrderMapper  extends BaseMapper<Order> {
}
~~~



##### 6.5 Service层开发

**接口**

```JAVA
package com.cisyam.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cisyam.pojo.Order;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 21:29
 */
public interface OrderService extends IService<Order> {
}

```

**实现类**

```JAVA
package com.cisyam.order.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cisyam.order.mapper.OrderMapper;
import com.cisyam.order.service.OrderService;
import com.cisyam.pojo.Order;
import org.springframework.stereotype.Service;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 21:29
 */
@Service
public class OrderServiceImpl  extends ServiceImpl<OrderMapper, Order> implements OrderService {
}

```



##### 6.6 Controller层开发

~~~java
package com.cisyam.order.controller;

import com.cisyam.pojo.Order;
import com.cisyam.pojo.User;
import com.cisyam.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 21:28
 */
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/{orderId}")
    public Order queryOrderByUserId(@PathVariable("orderId") Long orderId) {
        // 根据id查询订单并返回
        Order order = orderService.getById(orderId);
        User user = restTemplate.getForObject("http://localhost:9001/user/" + order.getUserId(), User.class);
        order.setUser(user);
        return order;
    }
}
~~~



##### 6.7 启动类

```java
package com.cisyam.order;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * @author gaoizman
 */
@MapperScan("com.cisyam.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

    /**
     * 创建RestTemplate并注入Spring容器
     */
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

   /* @Bean
    public IRule randomRule() {
        return new RandomRule();
    }*/
}
```

#### 7. 启动微服务模块测试

访问order服务看看效果 ：

![image-20230609150652427](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091506531.png)

**到这里就说明我们订单微服务远程调用了用户微服务，nice！**

### 1.4 案例代码问题分析

们在订单微服务中使用RestTemplate调用商品微服务的商品状态接口时（Restful API 接口）。在微服务**分布式集群环境**下会存在什么问题呢？怎么解决？

**存在的问题：**

1. 在服务消费者中，我们把url地址硬编码到代码中，不方便后期维护。
2. 服务提供者只有一个服务，即便服务提供者形成集群，服务消费者还需要自己实现负载均衡。
3. 在服务消费者中，不清楚服务提供者的状态。
4. 服务消费者调用服务提供者时候，如果出现故障能否及时发现不向用户抛出异常页面？
5. RestTemplate这种请求调用方式是否还有优化空间？能不能类似于Dubbo那样玩？
6. 这么多的微服务统一认证如何实现？
7. 配置文件每次都修改好多个很麻烦！？

**上述分析出的问题，其实就是微服务架构中必然面临的一些问题：**

1. 服务管理：自动注册与发现、状态监管
2. 服务负载均衡
3. 熔断
4. 远程过程调用
5. 网关拦截、路由转发
6. 统一认证
7. 集中式配置管理，配置信息实时自动更新

这些问题，`Spring Cloud` 体系都有解决方案，后续我们会逐个学习。



## 2. Eureka服务注册中心

今天我们学习第一个SpringCloud一代组件，`Eureka`，虽然现在他已经被`Nacos`替代了，但是我们还是需要对他有一定的了解，对于我们后面学习`Nacos`做下铺垫

常用的服务注册中心：`Eureka`、`Nacos`、`Zookeeper`、`Consul`

#### 2.1 关于服务注册中心

​		**注意：服务注册中心本质上是为了解耦服务提供者和服务消费者。**

`服务消费者`  -->  `服务提供者`

`服务消费者`  --> `服务注册中心` -->  `服务提供者`

​		对于任何一个微服务，原则上都应存在或者支持多个提供者（比如商品微服务部署多个实例），这是由微服务的**分布式属性**决定的。

​		更进一步，为了支持弹性扩、缩容特性，一个微服务的提供者的数量和分布往往是动态变化的，也是无法预先确定的。因此，原本在单体应用阶段常用的静态LB机制就不再适用了，需要引入额外的组件来管理微服务提供者的注册与发现，而这个组件就是服务注册中心。

##### 2.1.1注册中心实现原理

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091658799.png" alt="image-20200921173149497" style="zoom:80%;" />

​		![image-20201001204956251](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531322.png)

> ​			分布式微服务架构中，服务注册中心用于存储服务提供者地址信息、服务发布相关的属性信息，消费者通过主动查询和被动通知的方式获取服务提供者的地址信息，而不再需要通过硬编码方式得到提供者的地址信息。消费者只需要知道当前系统发布了那些服务，而不需要知道服务具体存在于什么位置，这就是`透明化路由`。
>

1. 服务提供者启动

2. 服务提供者将相关服务信息主动注册到注册中心

3. 服务消费者获取服务注册信息：

   1. pull模式：服务消费者可以主动拉取可用的服务提供者清单
   2. push模式：服务消费者订阅服务（当服务提供者有变化时，注册中心也会主动推送更新后的服务清单给消费者

4. 服务消费者直接调用服务提供者

   **另外，注册中心也需要完成服务提供者的健康监控，当发现服务提供者失效时需要及时剔除；**

##### 	2.1.2主流服务中心对比

* **Zookeeper**

  ​	    Dubbo + Zookeeper

  ​		Zookeeper它是一个分布式服务框架，是Apache Hadoop 的一个子项目，它主要是用来解决分布式应用中经常遇到的一些数据管理问题，如：统一命名服务、状态同步服务、集群管理、分布式应用配置项的管理等。

  ​		简单来说zookeeper本质 = 存储 + 监听通知。

  ​		Zookeeper 用来做服务注册中心，主要是因为它具有节点变更通知功能，只要客户端监听相关服务节点，服务节点的所有变更，都能及时的通知到监听客户端，这样作为调用方只要使用 Zookeeper 的客户端就能实现服务节点的订阅和变更通知功能了，非常方便。另外，Zookeeper 可用性也可以，因为只要半数以上的选举节点存活，整个集群就是可用的，最少节点数为3。

* **Eureka**

  ​		由Netflix开源，并被Pivatal集成到SpringCloud体系中，它是基于 RestfulAPI 风格开发的服务注册与发现组件。

* **Consul**

  ​		Consul是由HashiCorp基于Go语言开发的支持多数据中心分布式高可用的服务发布和注册服务软件， 采用Raft算法保证服务的一致性，且支持健康检查。

* **Nacos**

  ​		Nacos是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。简单来说 Nacos 就是 注册中心 + 配置中心的组合，帮助我们解决微服务开发必会涉及到的服务注册 与发现，服务配置，服务管理等问题。Nacos 是 Spring Cloud Alibaba 核心组件之一，负责服务注册与发现，还有配置。

| 组件名    | 语言 | CAP                          | 对外暴露接口 |
| --------- | ---- | ---------------------------- | ------------ |
| Eureka    | Java | AP（自我保护机制，保证可用） | HTTP         |
| Consul    | Go   | CP                           | HTTP/DNS     |
| Zookeeper | Java | CP                           | 客户端       |
| Nacos     | Java | 支持AP/CP切换                | HTTP         |

CAP定理又称CAP原则，指的是在一个分布式系统中，Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），最多只能同时三个特性中的两个，三者不可兼得。

P：分区容错性：分布式系统在遇到某节点或网络分区故障的时候，仍然能够对外提供满足一致性或可用性的服务（一定的要满足的）

C：数据一致性：all nodes see the same data at the same time

A：高可用：Reads and writes always succeed

**CAP不可能同时满足三个，要么是AP，要么是CP**

#### 2.2 服务注册中心组件 Eureka

​		服务注册中心的一般原理、对比了主流的服务注册中心方案，目光聚焦Eureka。

- Eureka 基础架构

  ![image-20200921173905946](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531378.png)

  ![image-20201002105445180](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531369.png)

- Eureka 交互流程及原理

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091659451.png" alt="image-20200921174025653" style="zoom:150%;" />

![image-20201002110004098](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531335.png)

Eureka 包含两个组件`：Eureka Server` 和 `Eureka Client`，`Eureka Client`是一个Java客户端，用于简化与Eureka Server的交互；Eureka Server提供服务发现的能力，各个微服务启动时，会通过`Eureka Client`向Eureka Server 进行注册自己的信息（例如网络信息），Eureka Server会存储该服务的信息；

- 图中us-east-1c、us-east-1d，us-east-1e代表不同的区也就是不同的机房
- 图中每一个Eureka Server都是一个集群。
- 图中Application Service作为服务提供者向Eureka Server中注册服务，Eureka Server接受到注册事件会在集群和分区中进行数据同步，Application Client作为消费端（服务消费者）可以从Eureka Server中获取到服务注册信息，进行服务调用。
- **微服务启动后**，会周期性地向Eureka Server发送心跳（**默认周期为30秒**，默认Eureka Server 90S会将还没有续约的给剔除）以续约自己的信息
- Eureka Server在一定时间内没有接收到某个微服务节点的心跳，**Eureka Server将会注销该微服务节点（默认90秒）**
- 每个Eureka Server同时也是Eureka Client，多个Eureka Server之间通过复制的方式完成服务注册列表的同步
- Eureka Client会缓存Eureka Server中的信息。即使所有的Eureka Server节点都宕掉，服务消费者依然可以使用缓存中的信息找到服务提供者

​		**Eureka通过心跳检测、健康检查和客户端缓存等机制，提高系统的灵活性、可伸缩性和高可用性。** 



#### 2.3 搭建单例Eureka Server服务注册中心

**实现过程：**

1. 单实例`Eureka Server`—>访问管理界面

2. 服务提供者（商品微服务注册到集群）

3. 服务消费者（用户微服务注册到Eureka/从Eureka Server获取服务信息）

4. 完成调用		

   

##### 1、按照之前的模块搭建方式搭建Eureka Server服务 cloud-eureka

​     **cloud-demo**中引入Spring Cloud 依赖

​	**Spring Cloud 是一个综合的项目，下面有很多子项目，比如eureka子项目**

```xml
<!-- springCloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
```



##### 2. cloud-eureka工程pom.xml中引入依赖

```xml
<dependencies>
        <!--eureka服务端-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
</dependencies>
```

**注意：在父工程的pom文件中手动引入jaxb的jar，因为Jdk9之后默认没有加载该模块，Eureka Server使用到，所以需要手动导入，否则Eureka Server服务无法启动**

父工程：

```xml
 <!--引入Jaxb，开始-->
 <dependency>
   <groupId>com.sun.xml.bind</groupId>
   <artifactId>jaxb-core</artifactId>
   <version>2.2.11</version>
 </dependency>
 <dependency>
   <groupId>javax.xml.bind</groupId>
   <artifactId>jaxb-api</artifactId>
 </dependency>
 <dependency>
   <groupId>com.sun.xml.bind</groupId>
   <artifactId>jaxb-impl</artifactId>
   <version>2.2.11</version>
 </dependency>
 <dependency>
   <groupId>org.glassfish.jaxb</groupId>
   <artifactId>jaxb-runtime</artifactId>
   <version>2.2.10-b140310.1920</version>
 </dependency>
 <dependency>
   <groupId>javax.activation</groupId>
   <artifactId>activation</artifactId>
   <version>1.1.1</version>
 </dependency>
 <!--引入Jaxb，结束-->
```



##### 3.  在yml文件中配置Eureka server服务端口，服务名等信息

```yml
  #Eureka server服务端口
server:
  port: 9200
spring:
  application:
    name: demo-cloud-eureka-server # 应用名称，会在Eureka中作为服务的id标识（serviceId）
eureka:
  instance:
    hostname: localhost
  client:
    service-url: # 客户端与EurekaServer交互的地址，如果是集群，也需要写其它Server的地址
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
    register-with-eureka: false  # 自己就是服务不需要注册自己
    fetch-registry: false #自己就是服务不需要从Eureka Server获取服务信息,默认为true，置为false
```



##### 4. 编写启动类，声明当前服务为Eureka注册中心

```java
    package com.demo.eureka;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

    @SpringBootApplication
    //// 声明本项目是一个Eureka服务
    @EnableEurekaServer
    public class EurekaApplication {
        public static void main(String[] args) {
            SpringApplication.run(EurekaApplication.class,args);
        }
    }
```



##### 5。 访问测试

访问 http://127.0.0.1:9000，如果看到如下页面（Eureka注册中心后台），则表明Eureka Server发布成功

![image-20200921175831744](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531300.png)

![image-20201002120321395](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531314.png)

![image-20201002120535024](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091531922.png)



**6、用户服务和页面订单微服务注册到Eureka**

pom文件中添加Eureka Client依赖

```xml
        <!--Eureka client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
```



yml配置Eureka服务端信息

```yml
eureka:
  client:
    service-url:  # eureka的地址信息
      defaultZone: http://127.0.0.1:9000/eureka 
```



修改启动类

```java
package com.cisyam.order;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * @author gaoizman
 */
@MapperScan("com.cisyam.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

    /**
     * 创建RestTemplate并注入Spring容器
     */
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

   /* @Bean
    public IRule randomRule() {
        return new RandomRule();
    }*/
}
```



#### 2.4 搭建Eureka Server 高可用集群

​		在互联网应用中，服务实例很少有单个的。

​		如果EurekaServer只有一个实例，该实例挂掉，正好微服务消费者本地缓存列表中的服务实例也不可用，那么这个时候整个系统都受影响。

​		在生产环境中，我们会配置`Eureka Server`集群实现高可用。Eureka Server集群之中的节点通过点对点（P2P）通信的方式共享服务注册表。我们开启两台 Eureka Server 以搭建集群。

`这里介绍IDEA一个简单快捷的方法`，右键点击 `copy Configuration`

​	![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091603681.png)

![image-20230609160529754](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091605974.png)



**服务消费者调用服务提供者**

改造页面静态化微服务：之前是直接通过RestTemplate写死URL进行调用，现在通过Eureka方式进行调用。

```java
package com.cisyam.order.controller;

import com.cisyam.pojo.Order;
import com.cisyam.pojo.User;
import com.cisyam.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * @author : gaoziman
 * @description :
 * @date 2023/6/8 21:28
 */
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/{orderId}")
    public Order queryOrderByUserId(@PathVariable("orderId") Long orderId) {
        // 根据id查询订单并返回
        Order order = orderService.getById(orderId);
        User user = restTemplate.getForObject("http://userservice/user/" + order.getUserId(), User.class);
        order.setUser(user);
        return order;
    }
}

```



##### 2.5.4 用户模块改造

**用户模块也是按照同样的方式进行改造**

##### 2.5.5 访问测试

![image-20230609160834942](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091608177.png)



#### 2.5 Eureka细节详解

##### 2.5.1 Eureka元数据详解

Eureka的元数据有两种：标准元数据和自定义元数据。

​		**标准元数据** 主机名、IP地址、端口号等信息，这些信息都会被发布在服务注册表中，用于服务之间的调用。 

​		**自定义元数据** 可以使用eureka.instance.metadata-map配置，符合KEY/VALUE的存储格式。这些元数据可以在远程客户端中访问。

类似于

```yaml
  instance:
    #使用ip注册，否则会使用主机名注册了（此处考虑到对老版本的兼容，新版本经过实验都是ip）
    prefer-ip-address: true
    #自定义实例显示格式，加上版本号，便于多版本管理，注意是ip-address，早期版本是ipAddress
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}:@project.version@
    metadata-map:
      ip: 192.168.200.128
      port: 10000
      user: demo
      pwd: 123456
```



##### 2.5.2 Eureka客户端详解

​		服务提供者（也是Eureka客户端）要向`Eureka Server`注册服务，并完成服务续约等工作

**服务注册详解（服务提供者）**

​		1）当我们导入了`eureka-client`依赖坐标，配置Eureka服务注册中心地址

​		2）服务在启动时会向注册中心发起注册请求，携带服务元数据信息

​		3）Eureka注册中心会把服务的信息保存在Map中。

**服务续约详解（服务提供者）**

​		服务每隔30秒会向注册中心续约(心跳)一次（也称为报活），如果没有续约，租约在90秒后到期，然后服务会被失效。每隔30秒的续约操作我们称之为心跳检测

- `Eureka Client` ：30S续约一次，在Eureka Server更新自己的状态 (Client端进行配置)

- `Eureka Server`： 90S还没有进行续约，将该微服务实例从服务注册表（Map）剔除 (Client端进行配置)

- `Eureka Client`： 30S拉取服务最新的注册表并缓存到本地 (Client端进行配置)

​		往往不需要我们调整这两个配置

```yaml
#向Eureka服务中心集群注册服务
eureka:
  instance:
    # 租约续约间隔时间，默认30秒
    lease-renewal-interval-in-seconds: 30 
  	# 租约到期，服务时效时间，默认值90秒,服务超过90秒没有发生心跳，EurekaServer会将服务从列表移除
    lease-expiration-duration-in-seconds: 90 
```



​	**获取服务列表（服务注册表）详解（服务消费者）**

​		每隔30秒服务会从注册中心中拉取一份服务列表，这个时间可以通过配置修改。往往不需要我们调整

```yaml
#向Eureka服务中心集群注册服务
eureka:
  client:
  	# 每隔多久拉取一次服务列表
    registry-fetch-interval-seconds: 30 
```

1. 服务消费者启动时，从 EurekaServer服务列表获取只读备份，缓存到本地
2. 每隔30秒，会重新获取并更新数据
3. 每隔30秒的时间可以通过配置eureka.client.registry-fetch-interval-seconds修改

##### 2.5.3 Eureka服务端详解

​	**服务下线**：

1. 当服务正常关闭操作时，会发送服务下线的REST请求给EurekaServer。
2. 服务中心接受到请求后，将该服务置为下线状态

**失效剔除：**

​		Eureka Server会定时（间隔值是eureka.server.eviction-interval-timer-in-ms，默认60s）进行检查，如果发现实例在在一定时间（此值由客户端设置的eureka.instance.lease-expiration-duration-in-seconds定义，默认值为90s）内没有收到心跳，则会注销此实例。



**自我保护机制：**

​	**自我保护模式正是一种针对网络异常波动的安全保护措施，使用自我保护模式能使Eureka集群更加的健壮、稳定的运行。**

​	自我保护机制的工作机制是：**如果在15分钟内超过85%的客户端节点都没有正常的心跳，那么Eureka就认为客户端与注册中心出现了网络故障，Eureka Server自动进入自我保护机制**，此时会出现以下几种情况：

1. `Eureka Server`不再从注册列表中移除因为长时间没收到心跳而应该过期的服务。
2. `Eureka Server`仍然能够接受新服务的注册和查询请求，但是不会被同步到其它节点上，保证当前节点依然可用。
3. 当网络稳定时，当前Eureka Server新的注册信息会被同步到其它节点中。

因此Eureka Server可以很好的应对因网络故障导致部分节点失联的情况，而不会像ZK那样如果有一半不可用的情况会导致整个集群不可用而变成瘫痪。

**为什么会有自我保护机制？**

​		默认情况下，如果Eureka Server在一定时间内（默认90秒）没有接收到某个微服务实例的心跳，Eureka Server将会移除该实例。但是当网络分区故障发生时，微服务与Eureka Server之间无法正常通信，而微服务本身是正常运行的，此时不应该移除这个微服务，所以引入了自我保护机制。

​		服务中心页面会显示如下提示信息

![image-20230609161513317](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306091615458.png)

我们在单机测试的时候很容易满足心跳失败比例在 15 分钟之内低于 85%，这个时候就会触发 Eureka 的保护机制，一旦开启了保护机制（**默认开启**），则服务注册中心维护的服务实例就不是那么准确了，此时我们通过修改Eureka Server的配置文件来关闭保护机制，这样可以确保注册中心中不可用的实例被及时的剔除（**不推荐**）。

```yml
eureka:
  server:
    enable-self-preservation: false # 关闭自我保护模式（缺省为打开）
```

**经验：建议生产环境打开自我保护机制**

今天就到这里了，下一节我们继续学习分享SpringCloud的相关组件，欢迎大家评论区留言讨论！

