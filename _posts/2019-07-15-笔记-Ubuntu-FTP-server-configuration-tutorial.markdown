---
layout:     post
note: true
title:      "Ubuntu FTP服务器搭建"
subtitle:   " \"Ubuntu FTP server configuration tutorial\""
date:       2019-07-15 18:24:00
author:     "张凡"
header-img: "https://aerozf.oss-cn-beijing.aliyuncs.com/images/frp_network.jpg"
catalog: true
tags:
    - 服务器
    - FTP
    - ubuntu
---

## 1、FTP介绍

FTP File Transfer Protocol文件传输协议，两台计算机传送文件的协议，客户端可以通过FTP命令从服务器下载，上传文件，修改目录。可以通过命令vsftpd -version查看是否安装了vsftpd。

> 文件传输协议（File Transfer Protocol，FTP）是用于在网络上进行文件传输的一套标准协议，它工作在 OSI 模型的第七层， TCP 模型的第四层， 即应用层， 使用 TCP 传输而不是 UDP， 客户在和服务器建立连接前要经过一个“三次握手”的过程， 保证客户与服务器之间的连接是可靠的， 而且是面向连接， 为数据传输提供可靠保证。 [1] 
FTP允许用户以文件操作的方式（如文件的增、删、改、查、传送等）与另一主机相互通信。然而， 用户并不真正登录到自己想要存取的计算机上面而成为完全用户， 可用FTP程序访问远程资源， 实现用户往返传输文件、目录管理以及访问电子邮件等等， 即使双方计算机可能配有不同的操作系统和文件存储方式[^1]。
[^1]: [FTP_百度百科](https://baike.baidu.com/item/ftp/13839?fr=aladdin)

## 2、FTP服务器配置

#### 2.1 安装vsftpd

使用如下指令下载vsftpd:
```
sudo apt install vsftpd
```
#### 2.2 配置vsftpd.conf文件

在系统命令行中输入如下指令打开并编辑vsftpd的配置文件vsftpd.conf
```
sudo nano /etc/vsftpd.conf
```

在vsftpd的配置文件vsftpd.conf中末行加入如下代码
```
userlist_deny=NO
userlist_enable=YES
userlist_file=/etc/allowed_users
seccomp_sandbox=NO
```

去掉vsftpd的配置文件vsftpd.conf中如下代码前的#使代码生效
```
local_enable=YES
write_enable=YES
```

完成以上工作后，按下ctrl+X组合键，再按下Y键保存配置修改就生效了。

#### 2.3 新建FTP文件夹

输入以下指令建立FTP文件夹：
```
cd

mkdir ftp
```

#### 2.4 创建ftp的账户及密码

输入以下指令建立FTP的账户和密码
- 建立FTP的账户(账户名为：zhangfan)
```
sudo useradd -d /root/ftp -s /bin/bash -m zhangfan
```

- 设置账户密码
```
passwd zhangfan
```
  输入以上指令后设置密码（要输入两次，密码不显示）

#### 2.5 设置允许登录的用户名单

创建/etc/allowed_users文件，用来存放允许哪些用户登录（把上面创建的账户输入），在系统命令行输入以下代码创建/etc/allowed_users文件。
```
sudo nano /etc/allowed_users
```
在创建的/etc/allowed_users文件中输入上面创建的FTP账户名：*zhangfan*。
```
zhangfdan
```
然后按下ctrl+X组合键，再按下Y键保存。

#### 2.6 使配置生效

在系统命令行中输入以下指令使以上配置生效
```
service vsftpd restart
```

## 3、远程连接FTP服务器

   - 这里以普通的装有Windows系统的电脑为例，首先下载[FileZilla Client](https://download.filezilla-project.org/client/FileZilla_3.43.0_win64_sponsored-setup.exe)软件
   
   - 下载并安装以上软件后，打开软件，如下图所示，点击箭头所指圆圈内的图标

   ![](https://aerozf.oss-cn-beijing.aliyuncs.com/images/filezilla1.png)

   -打开上图所示的图标后，出现下图所示的对话框，请把红框内的所有选项按照图中所示设置。

   ![](https://aerozf.oss-cn-beijing.aliyuncs.com/images/fielzilla2.png)

   - 最后为了成功连接，请把上图中传输设置改为主动模式。
   
   - 最后点击连接显示出远程服务器上的所有文件（可下载，也可上传文件）,如下图1红框所示，下图2为对应的服务器上的FTP文件夹。

   ![](https://aerozf.oss-cn-beijing.aliyuncs.com/images/filezilla_file.png)

   ![](https://aerozf.oss-cn-beijing.aliyuncs.com/images/ftp_server.png)

