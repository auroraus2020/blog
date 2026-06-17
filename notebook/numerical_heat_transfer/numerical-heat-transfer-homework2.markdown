---
layout:     post
title:      "计算传热学期末大作业记录"
subtitle:   " \" numerical heat transfer\""
date:       2020-6-29 13:01:00
author:     "张凡"
header-img: "https://zfblog.oss-cn-hangzhou.aliyuncs.com/course/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6/%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%A4%A7%E4%BD%9C%E4%B8%9A/post.jpg"
catalog: true
tags:
    - 计算传热学
    - 作业
---

<center><h1>计算传热学期末大作业</h1></center>

### 问题描述

**顶盖驱动方腔流动**

1、方舱左表面、右表面和底部均为静止壁面，顶部为运动壁面，速度为u.
	
2、雷洛数Re=1000
	
3、顶盖温度500K

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps1.jpg)

**边界条件：**

**1、左、右、下壁面壁温300K（选择这个边界条件）**
	
2、左右壁面绝热，下壁面300K

 

### **一、**网格划分和计算算法选择

#### **1.1、**计算区域网格划分

##### 1.1.1、计算网格的选定

由问题描述可知，本次大作业的计算区域为一个二维的正方形区域，由于二维问题，第一步需要考虑的就是选取什么样的网格，以及采用怎样的网格计算形式。在本大作业中使用了交叉网格和同位网格，其中流场计算部分采用交叉网格，温度场计算部分采用同位网格，采用有限体积法作为计算的数值方法。

本问题温度场的求解需要先求出流场，再把流场作为已知条件带入温度控制方程计算温度场。详细如下所述：

在求解的第一个阶段，需要先求的计算区域的流场，即计算区域中压力P、水平速度U、垂直速度V的值。由于所求变量比较多，而且此部分课程中多以交错网格进行讲解，故在流场的计算中选择交错网格进行计算。在计算完毕后，将速度U、V插值到压力P的网格中，方便下一个阶段温度场的求解。

在求解的第二个阶段，求解的就是计算区域的温度场（温度分布）了。由于在第一个阶段中已经求出流场了，故在这个计算阶段待求的变量只有一个，为了方便起见，在温度场的求解中采用同位网格进行计算。

##### 1.1.2、交错网格划分

所谓的交错网格即在计算流场参数p、u、v的过程中各自采用一套网格，即三套网格，各个网格之间差半个单位网格长度。采用交错网格可以避免棋盘压力问题，以保证就算结果的准确性。

下面分别介绍p、v、u的网格划分和最后合在一起的交错网格形式。

###### 1）压力p网格划分，

下图所示为压力p网格的划分（备注：用电脑绘制网格图比较繁琐，故使用了手绘图，其余的网格划分示意图同样使用了手绘图）。图中的红点为压力节点，黑线的交叉点代表最后保存计算结果的实际节点，最后输出的压力值等于周围四个节点的平均值，计算公式如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps2.png)

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps3.png)

公式下标中的1、2、3、4分别代表实际节点的左上角、右上角、左下角、右下角的压力节点中的压力值。

###### 2）速度u网格划分

下图所示为速度u网格的划分。图中向右的红色箭头代表速度u节点中心，图中黑线的交叉点代表最后保存计算结果的实际节点，最后输出的速度u的值等于实际节点上下u节点速度的平均值，计算公式如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps4.png)

公式下标中的up、down分别代表实际节点的上、下速度u节点中的速度值。

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps5.png)



###### 3）速度v网格划分

下图所示为速度v网格的划分。图中向上的红色箭头代表速度v节点中心，图中黑线的交叉点代表最后保存计算结果的实际节点，最后输出的速度v的值等于实际节点左右v节点速度的平均值，计算公式如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps6.png)

公式下标中的left、right分别代表实际节点的左、右速度v节点中的速度值。

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps7.png)


上面我们介绍了p、v、u的网格划分的方式和最后输出结果在实际节点中保存的的计算公式。最后给出p、v、u网格组合在一起的交错网格图（为了防止显得混乱，中间部分速度为标出）。

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps8.png)



通过上述的网格划分，结合后面提到的方程离散形式，就可以计算出方腔中的流场了。

##### 1.1.3、同位网格划分

利用1.1.2中的交叉网格可以计算出方腔中的流场，为了计算温度场的方便，把1.1.2交叉网格中计算出的流场参数取平均后使用了同一个网格，如下图所示。通过这个操作就可以在计算温度场的时候采用同位网格了，即p、v、u、T使用同一个网格。这样计算过程显得比较清晰。


![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps10.png)![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps11.jpg)

下图所示为温度场计算的同位网格形式，图中网格中心处的红点代表存p、u、v值的节点，温度值T同样保存在这个节点中，p、u、v、T共用一个节点。

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps9.png)

上述所述为流场参数和温度场参数网格的划分，下面介绍计算算法的选择。

#### **1.2、**计算算法的选择

由于Simple算法及其改进型算法在编程上比较繁琐，故在本算例的计算中，采用了人工压缩算法。

为了解决连续性方程和动量方程中没有压力P关于时间的偏导项，压力无法更新的问题，在simple算法中采取了压力修正和速度修正的方法，但是整个过程比较繁琐，求解压力修正值方程比较耗时。在人工压缩算法中，连续性方程人为的引入的人工压缩项a，在求解连续性方程时压力得到了更新，然后通过动量方程求解流场速度。公式如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps12.png)

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps13.png)

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps14.png)

### **二、**方程离散

#### 2.1 、流场计算方程的离散

##### 2.1.1 控制方程

上面已经提到，本算例采用人工压缩算法求解流场，由于是不可压缩流，密度保持不变，故在连续性方程和动量方程中去掉密度项，流场的控制方程如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps15.png)

##### 2.1.2 控制方程的离散

###### 1）连续性方程的离散

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps16.png) 

如下图所示，取以压力p为中心的节点网格，在该有限容积中连续性方程中的偏导数项可以离散为下面所示的形式：



![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps17.jpg) 


![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps18.png)

导出计算压力p的离散方程为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps19.png)

为了满足稳定性，时间步长![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps20.png)

###### 2）动量方程的离散

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps21.png) 

在连续性方程中解出压力p之后将压力p带入动量方程即可求得速度u,v，如此反复迭代，直至流场参数收敛。下面取以速度u为中心的节点网格(如下图所示)，在该有限容积中连续性方程中的偏导数项可以离散为下面所示的形式：

 ![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps22.jpg)

**a、速度u的离散格式：**

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps23.png)

上面的离散格式中，![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps24.png)为界面处的值，由于采用了均匀网格，这些值为附近节点处值的平均值。导出计算速度u的离散方程为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps25.png)	

可以注意到在![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps26.png)的计算中采用中心差分格式。在![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps27.png)和![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps28.png)的计算中采用了二阶偏导项的计算格式。

**b、速度v的离散格式：**

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps29.png)

上面的离散格式中，![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps30.png)为界面处的值，由于采用了均匀网格，这些值为附近节点处值的平均值。导出计算速度u的离散方程为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps31.png)	

同上，在![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps32.png)的计算中采用中心差分格式。在![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps33.png)和![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps34.png)的计算中采用了二阶偏导项的计算格式。

流场收敛条件为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps35.png)

#### 2.2 温度场计算方程的离散

##### 2.2.1 温度场控制方程

在温度场的计算中，同样采用人工压缩算法，但和上面流场计算不同的是，在温度场的计算中采用了同位网格。如下所示为温度场的控制方程：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps36.png)

##### 2.2.2 温度场控制方程的离散

在2.2.1中介绍了温度场的控制方程，可以把上式中的密度![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps37.png)提取出来，同除于![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps38.png)。

同时，导热系数k可以提取到方程外面，如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps39.png)

进一步整理为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps40.png)

 

其中，记：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps41.png)

方程可化为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps42.png)

到这一步，流场参数已知，仅温度T的值未知，故使用了同位网格，流场参数和温度场参数存在同一个节点中，其网格如下图所示。方程从在下图所示的控制题内离散：
![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps43.jpg)

离散格式为：



![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps44.png)

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps45.png)

其中：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps46.png)

最终导出温度T的离散方程为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps47.png)

温度控制方程方程收敛条件为：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps48.png)

#### 2.3 取值约定

##### 2.3.1 流场计算参数取值

在流场计算中，参数取值如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps49.png)

说明：由于是不可压缩流动，故流体密度取定值。在流中起作用的是压力的相对值，而不是绝对值，故为了计算的方便，压力初始值取为1.0，在最后计算结果的基础上加上标准大气压-1。人工压缩系数是参考下面所示的公式和多次测试选取的值，最终取a=2.0。

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps50.png)  人工压缩系数取值参考公式

##### 2.3.2 温度场计算参数取值

在温度场计算中，取空气的物性参数，假定比热Cp和导热系数为常数，参数取值如下所示：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps51.png)

### **三、**网格无关性验证

为了减弱网格数量对计算结果的影响，在这里必须要进行网格无关性验证，以得到准确结果。

在计算中，网格数量分别取10x10、30x30、60x60、80x80，如下面图片所示，分别展示不同网格数量时解的分布：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps52.jpg) 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps53.jpg) 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps54.jpg) 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps55.jpg) 

 

从上面图片中可以看到，当网格数量在80x80时，计算解的分布已经趋于稳定，故取网格数量为：80x80时计算求得的解作为最终的结果。

### **四、**计算结果展示及分析

在上面的网格无关性验证中已经验证了计算解分布的稳定性，并取80x80时计算求得的解作为最终的结果。

为了比较好的展示计算结果，在本作业中使用了tecplot展示流场和温度场的分布。在计算程序的后半部分，将计算结果按照tecplot的数据保存格式保存为.DAT文件（或者.plt文件也可以），代码片段如下所示：

```python
'''保存流场参数和温度场参数，在tecplot中展示'''
tecplot='''Title=SquareCavity Flow
Variables=X,Y,U,V,P,T
ZONE I={} J={} F=POINT\n'''.format(Grid,Grid)
for i in range(Grid):
     for j in range(Grid):
       tecplot+="""{} {} {} {} {} {}\n""".format(L*i/Grid,L*j/Grid,u[i][j],v[i][j],p[i][j],T[i][j])

with open('方腔流动_等壁温_{}.plt'.format(Grid),'w') as f:
   f.write(tecplot)
   f.close()
```

下面在tecplot中分别展示网格划分，计算结果中流场压力、横向速度u、纵向速度v、流线的分布，以及温度的分布：

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps56.jpg) 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps57.jpg) 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps58.jpg) 

 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps59.jpg) 

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps60.jpg)

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps61.jpg)

由上述的流场和温度场展示图片可以看出，计算结果和预期的效果是相符合的，在顶盖附近横向速度较大，并在方腔中形成了一个涡的结构，压力分布满足涡中压力的分布规律。由于顶板运动速度取为了U=1.0,方腔三个壁面取等壁温

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps62.jpg)

条件，可以看出由于方腔中涡结构的影响，靠近方腔右侧的壁温变化教右侧剧烈一些（即上图中彩色部分是非对称的，偏向右边），但是由于顶盖速度取的比较小，温度分布不太明显，如下图，在顶盖速度U=3.0的时候这种温度分布情况就很明显了。

![img](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/wps63.jpg)

下图为Ghia K.N论文中在雷洛数Re=1000时的流线图，可以看出，本次大作业的结果中流线的分布和Ghia K.N论文中的流线分布高度相似。由于本次计算结果所选取的网格数多，详细计算结果在word中不好展示，下面附几张Anaconda Spyder中的变量截图，详细结果请见邮件附件中的excel表格。



### **五、**程序及程序说明

本次大作业的计算程序由 python 语言编写， 相比于c语言和Fortran语言，python语言语法简介、便于调试和展示计算结果，且在导入 numba 模块中的 jit 进行加速后计算速度可以媲美C语言的计算速度， 大大提高了编程和计算的效率。 

#### 程序介绍

本程序一共包含一个计算函数和三个辅助处理过程。

其中计算函数名为SolveSquareCavity(L,U,Re,Grid)，其一共有四个输入参数，分别为：方腔边长、顶盖速度、雷洛数、网格数。流场的计算和温度场的求解都在SolveSquareCavity(L,U,Re,Grid)这个函数中进行，先计算求得流场，然后再把流场作为已知量带入温度控制方程求得温度场的分布，在这个函数中使用了人工压缩算法作为主要的求解算法，其返回值为：流场中横向速度u、纵向速度v、压力p、温度T、网格数量Grid和方腔边长L。

三个过程分别是：

1、将计算结果保存为tecplot数据格式的过程，此过程生成的文件可以用来展示流场和温度场。

2、网格无关性数据提取过程，此过程提取的数据可以用来进行网格无关性分析

3、流场数据、温度场数据保存到excel文件中的过程。

#### 计算流程

调用SolveSquareCavity(L,U,Re,Grid)函数，按照问题条件输入相应的参数，该函数先会计算出流场参数，再把计算出的流场带入温度控制方程求解温度场，求解完毕后，会把计算结果返回。然后会把计算出来的数据导出为tecplot数据格式，以及保存计算数据到excel表格中。

源代码如下所示：

```python
# -*- coding: utf-8 -*-
"""
Created on Jun 6 15:47:34 2020

@author: zhangfan
"""

import numpy
from numba import jit  #引入jit装饰，提高运算速度
import xlwt   #保存数据到excel表格



'''人工压缩算法'''
######################################################################################
@jit(nopython=True)
def SolveSquareCavity(L,U,Re,Grid):
    
    dx=L/(Grid-1)   #网格大小
    dy=L/(Grid-1)   #网格大小
    a=2    #连续性方程中压缩系数  
    dt=L**2/(2*(a+1)*Grid**2)   #时间步长(满足稳定条件)
    epsUV=1.0e-7   #流场收敛判断条件
    eps=0.0   #速度精度
    
    '''流场&温度场参数定义及初始化'''
    pnew=numpy.ones((Grid+1,Grid+1))  #压力(新值)
    p=numpy.ones((Grid+1,Grid+1))     #压力（旧值）
    pa=numpy.ones((Grid,Grid))        # 压力（节点处平均压力）
    unew=numpy.zeros((Grid,Grid+1))   #水平速度(新值)
    u=numpy.zeros((Grid,Grid+1))      #水平速度（旧值）
    ua=numpy.zeros((Grid,Grid))       #水平速度（节点处平均速度）
    for i in range(Grid): #边界条件赋值
        u[i][Grid-1]=U
        u[i][Grid]=U
        unew[i][Grid-1]=U
        unew[i][Grid]=U
    vnew=numpy.zeros((Grid+1,Grid))   #竖直速度(新值)
    v=numpy.zeros((Grid+1,Grid))      #竖直速度(旧值)
    va=numpy.zeros((Grid,Grid))       #竖直速度(平均速度)
    #计算速度v偏导数项中间变量
    uu_x=0.0
    uv_y=0.0
    uu_xx=0.0
    uu_yy=0.0
    p_x=0.0  #表示偏p比偏x的值，两个x代表二阶导数，上同、下同
    
    #计算速度v偏导数项中间变量
    vv_y=0.0
    vu_x=0.0
    vv_xx=0.0
    vv_yy=0.0
    p_y=0.0
     
    t=1  #流场计算轮数
    while True:
        for i in range(1,Grid-1):
            for j in range(1,Grid):
                uu_x=(u[i+1][j]**2-u[i-1][j]**2)/(2*dx)  #中心差分格式
                uv_y=((u[i][j]+u[i][j+1])*(v[i][j]+v[i+1][j])-(u[i][j]+u[i][j-1])*(v[i+1][j-1]+v[i][j-1]))/(4*dy)
                uu_xx=(u[i+1][j]-2*u[i][j]+u[i-1][j])/(dx**2)
                uu_yy=(u[i][j+1]-2*u[i][j]+u[i][j-1])/(dy**2)
                p_x=(p[i+1][j]-p[i][j])/dx
                unew[i][j]=u[i][j]+dt*(1/Re*(uu_xx+uu_yy)-uu_x-uv_y-p_x)
                
             
        for i in range(Grid):
            unew[i][0]=0
            unew[i][Grid]=2*U-unew[i][Grid-1] #平均值为U
            
        for j in range(1,Grid):
            unew[0][j]=0.0
            unew[Grid-1][j]=0.0
        
        for i in range(1,Grid):
            for j in range(1,Grid-1):
                vv_y=(v[i][j+1]**2-v[i][j-1]**2)/(2*dy)  #中心差分格式
                vu_x=((u[i][j]+u[i][j+1])*(v[i][j]+v[i+1][j])-(u[i-1][j]+u[i-1][j+1])*(v[i][j]+v[i-1][j]))/(4*dx)
                vv_yy=(v[i][j+1]-2*v[i][j]+v[i][j-1])/(dy**2)  #二阶格式
                vv_xx=(v[i+1][j]-2*v[i][j]+v[i-1][j])/(dx**2)
                p_y=(p[i][j+1]-p[i][j])/dy
                vnew[i][j]=v[i][j]+dt*(1/Re*(vv_yy+vv_xx)-vv_y-vu_x-p_y)  
                
        for i in range(Grid+1):
            vnew[i][0]=0.0
            vnew[i][Grid-1]=0.0
            
        for j in range(1,Grid-1):  #界面v速度为0
            vnew[0][j]=0
            vnew[Grid][j]=0
            
        for i in range(1,Grid):
            for j in range(1,Grid):
                pnew[i][j]=p[i][j]-dt*a*a*((unew[i][j]-unew[i-1][j])/dx+(vnew[i][j]-vnew[i][j-1])/dy)
        
        for i in range(1,Grid):
            pnew[i][0]=pnew[i][1]
            pnew[i][Grid]=pnew[i][Grid-1]
            
        for j in range(Grid+1):  #界面v速度为0
            pnew[0][j]=pnew[1][j]
            pnew[Grid][j]=pnew[Grid-1][j]
        u=unew
        v=vnew
        p=pnew
        
        eps=0.0
        for i in range(1,Grid):
            for j in range(1,Grid):
                eps+=abs((u[i][j]-u[i-1][j])/dx+(v[i][j]-v[i][j-1])/dy)
                
        if t%10000==0:            
            print('步数：',t,'\t精度：',eps)
        t+=1
        if  eps<epsUV:
            break
    print('流场计算总步数：',t,'\t收敛精度：',eps)
    for i in range(Grid):
        for j in range(Grid):
            ua[i][j]=(unew[i][j]+unew[i][j+1])/2
            va[i][j]=(vnew[i][j]+vnew[i+1][j])/2
            pa[i][j]=(pnew[i][j]+pnew[i+1][j]+pnew[i][j+1]+pnew[i+1][j+1])/4  
            
    Tnew=numpy.ones((Grid,Grid))  #流场温度(新值)
    T=numpy.ones((Grid,Grid))    #流场温度(旧值)
        
     
    t=1
    k=300.0 
    Cp=1005.0
    epsT=1.0e-8
    pa=pa+101324.0
    T0=300.0  #壁面温度
    T1=500.0  #顶盖温度
    Tu_x=0.0
    Tv_y=0.0
    TT_xx=0.0
    TT_yy=0.0
    Te=0.0
    Tw=0.0
    Tn=0.0
    Ts=0.0
    dt=numpy.sqrt(Cp/(k+100))*L**2/(20*Grid**2)  #时间步长(满足稳定条件)
    epsn=0
    epso=0
    while True:
        epsn=0.0
        for i in range(Grid):
            for j in range(Grid):
                if i==0:
                    if j==0:
                        ue=(ua[i][j]+ua[i+1][j])/2.0
                        uw=0
                        vn=(va[i][j]+va[i][j+1])/2.0
                        vs=0
                        Te=(T[i][j]+T[i+1][j])/2.0
                        Tw=T0
                        Tn=(T[i][j]+T[i][j+1])/2.0
                        Ts=T0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=4*(Te-2*T[i][j]+Tw)/(dx**2)
                        TT_yy=4*(Tn-2*T[i][j]+Ts)/(dy**2)
                        Je=(Te*ue-k/Cp*(T[i+1][j]-T[i][j])/dx)*dy
                        Jw=(Tw*uw-2*k/Cp*(T[i][j]-T0)/dx)*dy
                        Jn=(Tn*vn-k/Cp*(T[i][j+1]-T[i][j])/dy)*dx
                        Js=(Ts*vs-2*k/Cp*(T[i][j]-T0)/dy)*dx
                    elif j==Grid-1:
                        ue=(ua[i][j]+ua[i+1][j])/2.0
                        uw=0
                        vn=U
                        vs=(va[i][j]+va[i][j-1])/2.0
                        Te=(T[i][j]+T[i+1][j])/2.0
                        Tw=T0
                        Tn=T1
                        Ts=(T[i][j]+T[i][j-1])/2.0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=4*(Te-2*T[i][j]+Tw)/(dx**2)
                        TT_yy=4*(Tn-2*T[i][j]+Ts)/(dy**2)
                        Je=(Te*ue-k/Cp*(T[i+1][j]-T[i][j])/dx)*dy
                        Jw=(Tw*uw-2*k/Cp*(T[i][j]-T0)/dx)*dy
                        Jn=(Tn*vn-2*k/Cp*(T1-T[i][j])/dy)*dx
                        Js=(Ts*vs-k/Cp*(T[i][j]-T[i][j-1])/dy)*dx
                    else:
                        ue=(ua[i][j]+ua[i+1][j])/2.0
                        uw=0
                        vn=(va[i][j]+va[i][j+1])/2.0
                        vs=(va[i][j]+va[i][j-1])/2.0
                        Te=(T[i][j]+T[i+1][j])/2.0
                        Tw=T0
                        Tn=(T[i][j]+T[i][j+1])/2.0
                        Ts=(T[i][j]+T[i][j-1])/2.0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=4*(Te-2*T[i][j]+Tw)/(dx**2)
                        TT_yy=(T[i][j+1]-2*T[i][j]+T[i][j-1])/(dy**2)
                        Je=(Te*ue-k/Cp*(T[i+1][j]-T[i][j])/dx)*dy
                        Jw=(Tw*uw-2*k/Cp*(T[i][j]-T0)/dx)*dy
                        Jn=(Tn*vn-k/Cp*(T[i][j+1]-T[i][j])/dy)*dx
                        Js=(Ts*vs-k/Cp*(T[i][j]-T[i][j-1])/dy)*dx
                elif i==Grid-1:
                    if j==0:
                        ue=0
                        uw=(ua[i][j]+ua[i-1][j])/2.0
                        vn=(va[i][j]+va[i][j+1])/2.0
                        vs=0
                        Te=T0
                        Tw=(T[i][j]+T[i-1][j])/2.0
                        Tn=(T[i][j]+T[i][j+1])/2.0
                        Ts=T0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=4*(Te-2*T[i][j]+Tw)/(dx**2)
                        TT_yy=4*(Tn-2*T[i][j]+Ts)/(dy**2)
                        Je=(Te*ue-2*k/Cp*(T0-T[i][j])/dx)*dy
                        Jw=(Tw*uw-k/Cp*(T[i][j]-T[i-1][j])/dx)*dy
                        Jn=(Tn*vn-k/Cp*(T[i][j+1]-T[i][j])/dy)*dx
                        Js=(Ts*vs-2*k/Cp*(T[i][j]-T0)/dy)*dx
                    elif j==Grid-1:
                        ue=0
                        uw=(ua[i][j]+ua[i-1][j])/2.0
                        vn=U
                        vs=(va[i][j]+va[i][j-1])/2.0
                        Te=T0
                        Tw=(T[i][j]+T[i-1][j])/2.0
                        Tn=T1
                        Ts=(T[i][j]+T[i][j-1])/2.0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=4*(Te-2*T[i][j]+Tw)/(dx**2)
                        TT_yy=4*(Tn-2*T[i][j]+Ts)/(dy**2)
                        Je=(Te*ue-2*k/Cp*(T0-T[i][j])/dx)*dy
                        Jw=(Tw*uw-k/Cp*(T[i][j]-T[i-1][j])/dx)*dy
                        Jn=(Tn*vn-2*k/Cp*(T1-T[i][j])/dy)*dx
                        Js=(Ts*vs-k/Cp*(T[i][j]-T[i][j-1])/dy)*dx
                    else:
                        ue=0
                        uw=(ua[i][j]+ua[i-1][j])/2.0
                        vn=(va[i][j]+va[i][j+1])/2.0
                        vs=(va[i][j]+va[i][j-1])/2.0
                        Te=T0
                        Tw=(T[i][j]+T[i-1][j])/2.0
                        Tn=(T[i][j]+T[i][j+1])/2.0
                        Ts=(T[i][j]+T[i][j-1])/2.0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=4*(Te-2*T[i][j]+Tw)/(dx**2)
                        TT_yy=(T[i][j+1]-2*T[i][j]+T[i][j-1])/(dy**2)
                        Je=(Te*ue-2*k/Cp*(T0-T[i][j])/dx)*dy
                        Jw=(Tw*uw-k/Cp*(T[i][j]-T[i-1][j])/dx)*dy
                        Jn=(Tn*vn-k/Cp*(T[i][j+1]-T[i][j])/dy)*dx
                        Js=(Ts*vs-k/Cp*(T[i][j]-T[i][j-1])/dy)*dx
                else:
                    if j==0:
                        ue=(ua[i][j]+ua[i+1][j])/2.0
                        uw=(ua[i][j]+ua[i-1][j])/2.0
                        vn=(va[i][j]+va[i][j+1])/2.0
                        vs=0
                        Te=(T[i][j]+T[i+1][j])/2.0
                        Tw=(T[i][j]+T[i-1][j])/2.0
                        Tn=(T[i][j]+T[i][j+1])/2.0
                        Ts=T0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=(T[i+1][j]-2*T[i][j]+T[i-1][j])/(dx**2)
                        TT_yy=4*(Tn-2*T[i][j]+Ts)/(dy**2)
                        Je=(Te*ue-k/Cp*(T[i+1][j]-T[i][j])/dx)*dy
                        Jw=(Tw*uw-k/Cp*(T[i][j]-T[i-1][j])/dx)*dy
                        Jn=(Tn*vn-k/Cp*(T[i][j+1]-T[i][j])/dy)*dx
                        Js=(Ts*vs-2*k/Cp*(T[i][j]-T0)/dy)*dx
                    elif j==Grid-1:
                        ue=(ua[i][j]+ua[i+1][j])/2.0
                        uw=(ua[i][j]+ua[i-1][j])/2.0
                        vn=U
                        vs=(va[i][j]+va[i][j-1])/2.0
                        Te=(T[i][j]+T[i+1][j])/2.0
                        Tw=(T[i][j]+T[i-1][j])/2.0
                        Tn=T1
                        Ts=(T[i][j]+T[i][j-1])/2.0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=(T[i+1][j]-2*T[i][j]+T[i-1][j])/(dx**2)
                        TT_yy=4*(Tn-2*T[i][j]+Ts)/(dy**2)
                        Je=(Te*ue-k/Cp*(T[i+1][j]-T[i][j])/dx)*dy
                        Jw=(Tw*uw-k/Cp*(T[i][j]-T[i-1][j])/dx)*dy
                        Jn=(Tn*vn-2*k/Cp*(T1-T[i][j])/dy)*dx
                        Js=(Ts*vs-k/Cp*(T[i][j]-T[i][j-1])/dy)*dx
                    else:
                        ue=(ua[i][j]+ua[i+1][j])/2.0
                        uw=(ua[i][j]+ua[i-1][j])/2.0
                        vn=(va[i][j]+va[i][j+1])/2.0
                        vs=(va[i][j]+va[i][j-1])/2.0
                        Te=(T[i][j]+T[i+1][j])/2.0
                        Tw=(T[i][j]+T[i-1][j])/2.0
                        Tn=(T[i][j]+T[i][j+1])/2.0
                        Ts=(T[i][j]+T[i][j-1])/2.0
                        Tu_x=(Te*ue-Tw*uw)/dx
                        Tv_y=(Tn*vn-Ts*vs)/dy
                        TT_xx=(T[i+1][j]-2*T[i][j]+T[i-1][j])/(dx**2)
                        TT_yy=(T[i][j+1]-2*T[i][j]+T[i][j-1])/(dy**2)
                        Je=(Te*ue-k/Cp*(T[i+1][j]-T[i][j])/dx)*dy
                        Jw=(Tw*uw-k/Cp*(T[i][j]-T[i-1][j])/dx)*dy
                        Jn=(Tn*vn-k/Cp*(T[i][j+1]-T[i][j])/dy)*dx
                        Js=(Ts*vs-k/Cp*(T[i][j]-T[i][j-1])/dy)*dx
                        
                Tnew[i][j]=T[i][j]+dt*((k/Cp)*(TT_xx+TT_yy)-Tu_x-Tv_y)
                epsn+=abs(Je-Jw+Jn-Js)

        T=Tnew
        t+=1     
        if t%10000==0:            
            print('步数：',t,'\t温度精度：',eps)
        if  abs(epsn-epso)<epsT and eps!=0.0:
            break
                
        epso=epsn
    print('温度场计算总步数：',t,'\t收敛精度：',eps)
    return ua,va,pa,T,Grid,L

######################################################################################


u,v,p,T,Grid,L=SolveSquareCavity(1.0,3.0,1000.0,20 )


'''保存流场和温度场数据到tecplot数据格式，用来显示流场和温度场'''
######################################################################################
tecplot='''Title=SquareCavity Flow
Variables=X,Y,U,V,P,T
ZONE I={} J={} F=POINT\n'''.format(Grid,Grid)
for i in range(Grid):
        for j in range(Grid):
            tecplot+="""{} {} {} {} {} {}\n""".format(L*i/Grid,L*j/Grid,u[i][j],v[i][j],p[i][j],T[i][j])

with open('方腔流动\方腔流动_{}Node.DAT'.format(Grid),'w') as f:
    f.write(tecplot)
    f.close()
######################################################################################



'''将流场数据和温度场数据保存到excel表格中'''
####################################################################################
work=xlwt.Workbook()
sheet1 =work.add_sheet("流场横向速度u")#建立一个名为 流场横向速度u 的表单
style = xlwt.easyxf('font: bold 1, color red;')
sheet1.row(0).height = 256 *3
for j in range(Grid):
    sheet1.col(j).width = 256 *10  
for i in range(Grid):
    for j in range(Grid):
        sheet1.write(i,j,u[j][Grid-1-i])
        
sheet2 =work.add_sheet("流场纵向速度v")
style = xlwt.easyxf('font: bold 1, color red;')
sheet2.row(0).height = 256 *3
for j in range(Grid):
    sheet2.col(j).width = 256 *10  
for i in range(Grid):
    for j in range(Grid):
        sheet2.write(i,j,v[j][Grid-1-i])
        
sheet3 =work.add_sheet("流场压力p")
style = xlwt.easyxf('font: bold 1, color red;')
sheet3.row(0).height = 256 *3
for j in range(Grid):
    sheet3.col(j).width = 256 *10  
for i in range(Grid):
    for j in range(Grid):
        sheet3.write(i,j,p[j][Grid-1-i])

sheet4 =work.add_sheet("温度T")
style = xlwt.easyxf('font: bold 1, color red;')
sheet4.row(0).height = 256 *3
for j in range(Grid):
    sheet4.col(j).width = 256 *10  
for i in range(Grid):
    for j in range(Grid):
        sheet4.write(i,j,T[j][Grid-1-i])#
        
work.save('方腔流动\方腔流动_{}Node.xls'.format(Grid))
######################################################################################
        
        
        
        
'''保存对角线节点上的数据，以供网格无关性分析'''
######################################################################################
data='速度U：\n'
for i in range(Grid):
    if (i+1)%(round(Grid/10))==0:
        data+=str(u[i][i])+'\n'

data+='\n速度V：\n'
for i in range(Grid):
    if (i+1)%(round(Grid/10))==0:
        data+=str(v[i][i])+'\n'
    
data+='\n压力P：\n'
for i in range(Grid):
    if (i+1)%(round(Grid/10))==0:
        data+=str(p[i][i])+'\n'
    
data+='\n温度T：\n'
for i in range(Grid):
    if (i+1)%(round(Grid/10))==0:
        data+=str(T[i][i])+'\n'

with open('方腔流动\方腔流动_{}Node.txt'.format(Grid),'w') as f:
    f.write(data)
    f.close()
    
######################################################################################

```



详情文件请点击**[这里](https://auroraus-1258416167.cos.ap-beijing.myqcloud.com/NoteBook/Note/%E8%AE%A1%E7%AE%97%E4%BC%A0%E7%83%AD%E5%AD%A6%E6%9C%9F%E6%9C%AB%E5%A4%A7%E4%BD%9C%E4%B8%9A/%E5%A4%A7%E4%BD%9C%E4%B8%9A.zip)**下载