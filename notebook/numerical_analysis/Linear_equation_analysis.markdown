---
layout:     post
title:      "线性方程组求解算法对比分析（基于vb.NET）"
subtitle:   " \" numerical analysis\""
date:       2020-5-22 12:01:00
author:     "张凡"
catalog: true
---

### 一、源代码和程序界面

#### 1.1 源代码

```vb
Imports System.IO
Imports System.Math
Public Class 线性方程求解
    Private Function GaussMain(ByVal A(,) As Double, ByVal B() As Double)
        Dim n, k, i, j, Maxi As Long
        Dim Max, temp, X() As Double
        n = A.GetUpperBound(0)
        For k = 0 To n - 1
            If n > 1 Then
                ProgressBar1.Value = 0 + 99 * k / (n - 1)
            Else
                ProgressBar1.Value = 99
            End If
            Max = 0
            For i = k To n '寻找列的最大值
                If Abs(A(i, k)) > Max Then
                    Max = Abs(A(i, k))
                    Maxi = i
                End If
            Next
            If k <> Maxi Then
                For j = 0 To n '交换两行
                    temp = A(k, j)   '交换系数矩阵
                    A(k, j) = A(Maxi, j)
                    A(Maxi, j) = temp
                Next
                temp = B(k)   '交换右端向量
                B(k) = B(Maxi)
                B(Maxi) = temp
            End If
            For i = k + 1 To n
                temp = A(i, k) / A(k, k)
                For j = k + 1 To n
                    A(i, j) = A(i, j) - temp * A(k, j)
                Next
                B(i) = B(i) - temp * B(k)
            Next
        Next
        ReDim X(n)
        X(n) = B(n) / A(n, n)
        For k = n - 1 To 0 Step -1
            temp = 0
            For j = k + 1 To n
                temp = temp + A(k, j) * X(j)
            Next
            X(k) = (B(k) - temp) / A(k, k)
        Next
        ProgressBar1.Value = 100
        Return X
    End Function
    Private Function DoolittleMain(ByVal A(,) As Double, ByVal B() As Double)
        Dim n, k, i, j As Long
        Dim Y(), temp, X(), M(,) As Double
        n = A.GetUpperBound(0)
        ReDim X(n), Y(n), M(n, n)
        M = A
        For k = 0 To n
            If n > 1 Then
                ProgressBar1.Value = 0 + 99 * k / n
            Else
                ProgressBar1.Value = 99
            End If
            For j = k To n
                If k > 0 Then
                    temp = 0
                    For t As Integer = 0 To k - 1
                        temp = temp + A(k, t) * A(t, j)
                    Next
                    A(k, j) = M(k, j) - temp
                End If
            Next
            For i = k + 1 To n
                If 0 < k < n Then
                    temp = 0
                    For t As Integer = 0 To k - 1
                        temp = temp + A(i, t) * A(t, k)
                    Next
                    A(i, k) = (M(i, k) - temp) / A(k, k)
                End If
            Next
        Next
        Y(0) = B(0)
        For i = 1 To n
            temp = 0
            For t As Integer = 0 To i - 1
                temp = temp + A(i, t) * Y(t)
            Next
            Y(i) = B(i) - temp
        Next
        X(n) = Y(n) / A(n, n)
        For i = n - 1 To 0 Step -1
            temp = 0
            For t As Integer = i + 1 To n
                temp = temp + A(i, t) * X(t)
            Next
            X(i) = (Y(i) - temp) / A(i, i)
        Next
        ProgressBar1.Value = 100
        Return X
    End Function
    Private Function CroutMain(ByVal A(,) As Double, ByVal B() As Double)
        Dim n, k, i, j As Long
        Dim Y(), temp, X(), M(,) As Double
        n = A.GetUpperBound(0)
        ReDim X(n), Y(n), M(n, n)
        M = A
        For k = 0 To n
            If n > 1 Then
                ProgressBar1.Value = 0 + 99 * k / n
            Else
                ProgressBar1.Value = 99
            End If
            For i = k To n
                If k > 0 Then
                    temp = 0
                    For t As Integer = 0 To k - 1
                        temp = temp + A(i, t) * A(t, k)
                    Next
                    A(i, k) = M(i, k) - temp
                End If
            Next
            For j = k + 1 To n
                If 0 < k < n Then
                    temp = 0
                    For t As Integer = 0 To k - 1
                        temp = temp + A(k, t) * A(t, j)
                    Next
                    A(k, j) = (M(k, j) - temp) / A(k, k)
                End If
            Next
        Next
        Y(0) = B(0) / A(0, 0)
        For i = 1 To n
            temp = 0
            For t As Integer = 0 To i - 1
                temp = temp + A(i, t) * Y(t)
            Next
            Y(i) = (B(i) - temp) / A(i, i)
        Next
        X(n) = Y(n)
        For i = n - 1 To 0 Step -1
            temp = 0
            For t As Integer = i + 1 To n
                temp = temp + A(i, t) * X(t)
            Next
            X(i) = Y(i) - temp
        Next
        ProgressBar1.Value = 100
        Return X
    End Function
    Private Function ChooseDoolittleMain(ByVal A(,) As Double, ByVal B() As Double)
        Dim n, k, i, j, Maxi As Long
        Dim Y(), temp, Max, X(), M(,), S() As Double
        n = A.GetUpperBound(0)
        ReDim X(n), Y(n), M(n, n), S(n)
        M = A
        For k = 0 To n
            If n > 1 Then
                ProgressBar1.Value = 0 + 99 * k / n
            Else
                ProgressBar1.Value = 99
            End If
            For i = k To n
                temp = 0
                For t As Integer = 0 To k - 1
                    temp = temp + A(i, t) * A(t, k)
                Next
                S(i) = M(i, k) - temp
            Next
            Max = 0
            For i = k To n '寻找列的最大值
                If Abs(S(i)) > Max Then
                    Max = Abs(S(i))
                    Maxi = i
                End If
            Next
            If k <> Maxi Then
                For t = 0 To k - 1 '交换两行
                    temp = A(k, t)
                    A(k, t) = A(Maxi, t)
                    A(Maxi, t) = temp
                Next
                For t = k To n
                    temp = M(k, t)
                    M(k, t) = M(Maxi, t)
                    M(Maxi, t) = temp
                Next
                temp = S(k)   '交换
                S(k) = S(Maxi)
                S(Maxi) = temp
            End If
            A(k, k) = S(k)
            For j = k + 1 To n
                If k < n Then
                    temp = 0
                    For t As Integer = 0 To k - 1
                        temp = temp + A(k, t) * A(t, j)
                    Next
                    A(k, j) = M(k, j) - temp
                End If
            Next
            For i = k + 1 To n
                If k < n Then
                    A(i, k) = S(i) / A(k, k)
                End If
            Next
            If k < n Then
                If k <> Maxi Then
                    temp = B(k)   '交换B向量
                    B(k) = B(Maxi)
                    B(Maxi) = temp
                End If
            End If
        Next
        Y(0) = B(0)
        For i = 1 To n
            temp = 0
            For t As Integer = 0 To i - 1
                temp = temp + A(i, t) * Y(t)
            Next
            Y(i) = B(i) - temp
        Next
        X(n) = Y(n) / A(n, n)
        For i = n - 1 To 0 Step -1
            temp = 0
            For t As Integer = i + 1 To n
                temp = temp + A(i, t) * X(t)
            Next
            X(i) = (Y(i) - temp) / A(i, i)
        Next
        ProgressBar1.Value = 100
        Return X
    End Function
    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click

        '这一部分代码实现讲输入矩阵存入二维数组的功能
        '************************************************************************
        Randomize()  '随机数生成器初始化,以实现每次生成不同的随机数
        Dim rt1, rt2, rt3, rt4 As String
        Dim MatixA(,), M_B(), Xn() As Double
        Dim Matrix_in(), temp() As String
        Dim raw, M_v, B_v, M_in, M_B_in As String
        Dim ii As Long = 0
        Dim jj As Long = 0
        Dim col_num As Long
        M_in = TextBox1.Text  '接收的输入矩阵（字符串格式)
        M_B_in = TextBox2.Text
        '如果输入是一个完整的矩阵（也就是含有英文逗号）
        If (M_in.Contains(",") And M_in.Contains(vbLf)) Then
            Matrix_in = M_in.Split(vbLf)
            col_num = Matrix_in.Length
            ReDim MatixA(col_num - 1, col_num - 1), M_B(col_num - 1)
            For Each raw In Matrix_in
                temp = raw.Split(",")
                For Each M_v In temp
                    MatixA(ii, jj) = CDbl(M_v)  '将输入矩阵存入数组
                    jj += 1
                Next
                jj = 0
                ii += 1
            Next
            temp = M_B_in.Split(",")
            ii = 0
            For Each B_v In temp
                M_B(ii) = CDbl(B_v)
                ii += 1
            Next
        Else
            '如果输入的是一个数字，则生成对应该数字行和列的随机矩阵
            Dim i, j As Long
            col_num = CInt(M_in)
            ReDim MatixA(CInt(M_in) - 1, CInt(M_in) - 1), M_B(CInt(M_in) - 1)
            For i = 0 To CInt(M_in) - 1
                For j = 0 To CInt(M_in) - 1
                    MatixA(i, j) = Rnd() * 1000 - 450
                Next
                M_B(i) = Rnd() * 1000 - 500
            Next
        End If
        '****************************************************************************

        rt1 = RadioButton1.Checked '列主元高斯消元法
        rt2 = RadioButton2.Checked 'Doolittle消元法
        rt3 = RadioButton3.Checked 'Crout消元法
        rt4 = RadioButton4.Checked '列主元Doolittle消元法

        '线性方程求解算法选择
        '***************************************************************************
        If rt1 Then
            ReDim Xn(col_num - 1)
            Dim Time1 As Long = My.Computer.Clock.TickCount
            Xn = GaussMain(MatixA, M_B)
            Dim Time2 As Long = My.Computer.Clock.TickCount
            Dim str As String = ""
            For i = 0 To col_num - 1
                str = str + "," + Xn(i).ToString
            Next
            TextBox5.Text = str.Substring(1)
            TextBox4.Text = (Time2 - Time1).ToString
        End If
        If rt2 Then
            ReDim Xn(col_num - 1)
            Dim Time1 As Long = My.Computer.Clock.TickCount
            Xn = DoolittleMain(MatixA, M_B)
            Dim Time2 As Long = My.Computer.Clock.TickCount
            Dim str As String = ""
            For i = 0 To col_num - 1
                str = str + "," + Xn(i).ToString
            Next
            TextBox5.Text = str.Substring(1)
            TextBox4.Text = (Time2 - Time1).ToString
        End If
        If rt3 Then
            ReDim Xn(col_num - 1)
            Dim Time1 As Long = My.Computer.Clock.TickCount
            Xn = CroutMain(MatixA, M_B)
            Dim Time2 As Long = My.Computer.Clock.TickCount
            Dim str As String = ""
            For i = 0 To col_num - 1
                str = str + "," + Xn(i).ToString
            Next
            TextBox5.Text = str.Substring(1)
            TextBox4.Text = (Time2 - Time1).ToString
        End If
        If rt4 Then
            ReDim Xn(col_num - 1)
            Dim Time1 As Long = My.Computer.Clock.TickCount
            Xn = ChooseDoolittleMain(MatixA, M_B)
            Dim Time2 As Long = My.Computer.Clock.TickCount
            Dim str As String = ""
            For i = 0 To col_num - 1
                str = str + "," + Xn(i).ToString
            Next
            TextBox5.Text = str.Substring(1)
            TextBox4.Text = (Time2 - Time1).ToString
        End If
        '***************************************************************************
    End Sub

    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click
        TextBox1.Text = ""
        TextBox2.Text = ""
        TextBox3.Text = ""
        TextBox4.Text = ""
        TextBox5.Text = ""
        TextBox6.Text = ""
    End Sub
End Class
```

#### 1.2 程序界面

<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/xianxingfangchengzu.png" width="100%" height="100%" />


### 二、耗时分析

**分别对列主元Guass消去法、Doolittle消去法、Crout消去法进行了耗时分析（结果为五次耗时的平均值）。结果如下表所示：**

| 计算矩阵阶数 | 列主元Gauss平均耗时（单位：毫秒） | Doolittle平均耗时（单位：毫秒） | Crout平均耗时（单位：毫秒） | 列主元Doolittle平均耗时（单位：毫秒） |
| ------------ | --------------------------------- | ------------------------------- | --------------------------- | ------------------------------------- |
| 0            | 0                                 | 0                               | 0                           | 0                                     |
| 200          | 47                                | 24.8                            | 25                          | 28                                    |
| 300          | 140.4                             | 93.8                            | 87.6                        | 93.8                                  |
| 400          | 334.6                             | 215.8                           | 209.6                       | 215.8                                 |
| 500          | 659.2                             | 406.2                           | 418.8                       | 412.6                                 |
| 600          | 1140.4                            | 724.8                           | 722.2                       | 725                                   |
| 800          | 2731.4                            | 1850                            | 1928.2                      | 1861.8                                |
| 1000         | 5331.2                            | 3853                            | 3947                        | 3903                                  |
| 1200         | 9209.4                            | 6931                            | 6984.4                      | 6937.6                                |
| 1500         | 18494                             | 16168.6                         | 15915.8                     | 15772                                 |
| 2000         | 42923.6                           | 36456.4                         | 36222.2                     | 35831.2                               |

**计算矩阵阶数和计算耗时之间的拟合关系分别如下图所示：**

<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/lieguass.png" width="100%" height="100%" />

> 拟合关系式：Y=0.000005x<sup>3</sup>+-0.0008x<sup>2</sup>-0.5731x+61.799


<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/doolittle.png" width="100%" height="100%" />

> 拟合关系式：Y=0.000004x<sup>3</sup>+0.0015x<sup>2</sup>-1.746x+226.71


<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/crout.png" width="100%" height="100%" />

> 拟合关系式：Y=0.000004x<sup>3</sup>+0.0012x<sup>2</sup>-1.4587x+185.06

<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/liedoolitte.png" width="100%" height="100%" />

> 拟合关系式：Y=0.000004x<sup>3</sup>+0.0013x<sup>2</sup>-1.5215x+194.81

#### 耗时分析

​	用python 将上述拟合曲线的趋势画出来，代码如下：

```python
import pylab,numpy

x=numpy.arange(10,10000,0.1)
G=0.000005*x**3+0.0008*x**2-0.5731*x+61.799
D=0.000004*x**3+0.0015*x**2-1.746*x+226.71
C=0.000004*x**3+0.0012*x**2-1.4587*x+185.06
LD=0.000004*x**3+0.0013*x**2-1.5215*x+194.81
pylab.plot(x,G,'r',label = "Gauss")
pylab.plot(x,D,'b',label = "Doolittle")
pylab.plot(x,C,'g',label = "Crout")
pylab.plot(x,LD,'y',label = "Col_Doolittle")
pylab.legend(loc='upper left')
pylab.title("Time-consuming analysis")
pylab.xlabel('Matrix Size')
pylab.ylabel('Time-consuming')
pylab.grid(True)
```

得到的图表如下所示：

<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/timeanalysis-1.png" width="100%" height="100%" />

<img src="https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/timeanalysis.png" width="100%" height="100%" />

从上图可以看出，**列主元Doolittle耗时 ≈ Doolittle耗时 ≈ Crout耗时 <  列主元Guass消元法耗时**，但综合考虑的话，<u>列主元Doolittle消元法最优</u>。





**备注：耗时分析表格下载**[请点击这里](https://aerozf.oss-cn-beijing.aliyuncs.com/images/numerical_analysis/%E7%BA%BF%E6%80%A7%E6%96%B9%E7%A8%8B%E7%BB%84%E6%B1%82%E8%A7%A3%E8%80%97%E6%97%B6%E5%88%86%E6%9E%90.xlsx)
