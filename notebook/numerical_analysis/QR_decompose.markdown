---
layout:     post
title:      "QR分解求解矩阵特征值和特征向量"
subtitle:   " \" numerical analysis\""
date:       2020-5-22 12:01:00
author:     "张凡"
catalog: true
---

```c
/*
个人信息
	学生：张凡
	学号：ZY1904332
	邮箱：zhangfan525@buaa.edu.cn
	完成时间：2019/10/30
程序功能
	完成数值分析计算实习第二大题问题的数值求解
*/

#include<stdio.h>
#include<stdlib.h>
#include<math.h>

#define N 10
#define eps 1.0e-12

double sgn(double);
void QRmain();  //QR分解函数

double M[N+1][N+1],Q[N+1][N+1],u[N+1],w[N+1],p[N+1],A[N+1][N+1];
int nk;


/* 主函数*/
void main()
{
	int i,j;
	for(i=1;i<=N;i++)
	{
		for(j=1;j<=N;j++)
		{
			if(i==j)
			{
				M[i][j]=1.52*cos(i+1.2*j);
			}
			else
			{
				M[i][j]=sin(0.5*i+0.2*j);
			}
			Q[i][j]=1;
			//printf("%f\t",M[i][j]);
		}
		u[i]=0;
	}
	QRmain();
	printf("%f   %f    %f    %f",A[1][1],A[10][1],A[5][4],A[2][3]);
	system("pause");
}

/*符号函数*/
double sgn(double x)
{
	if(x>0) return 1.0;
	else return -1.0;  //注意：在这里，当x=0时，返回-1.0
}

void QRmain()
{
	int r,i,j,t;
	double dr,cr,hr,temp;
	for(i=1;i<=N;i++)
	{
		for(j=1;j<=N;j++)
		{
			A[i][j]=M[i][j];
		}
	}
	for(r=1;r<=N-1;r++)
	{
		t=0;
		for(i=r+1;i<=N;i++)
		{
			if(A[i][r]==0) t+=1;
		}
		if(t!=N-r)
		{
			//求解dr,cr,hr
			temp=0;
			for(i=r;i<=N;i++)
			{
				temp+=A[i][r]*A[i][r];
			}
			dr=sqrt(temp);
			cr=-1*sgn(A[r][r])*dr;
			hr=cr*cr-cr*A[r][r];

			//求解向量u
			for(i=1;i<=N;i++)
			{
				if(i==r)
				{
					u[r]=A[r][r]-cr;
				}
				if(i>r)
				{
					u[i]=A[i][r];
				}
				else
				{
					u[i]=0;
				}
			}

			//求解w=Qu
			for(i=1;i<=N;i++)
			{
				temp=0;
				for(j=1;j<=N;j++)
				{
					temp=temp+Q[i][j]*u[j];
				}
				w[i]=temp;
			}

			//求解Q=Q-wu/h
			for(i=1;i<=N;i++)
			{
				for(j=1;j<=N;j++)
				{
					Q[i][j]=Q[i][j]-w[i]*u[j]/hr;
				}
			}

			//求解pr
			for(i=1;i<=N;i++)
			{
				temp=0;
				for(j=1;j<=N;j++)
				{
					temp+=A[j][i]*u[j]/hr;
				}
				p[i]=temp;
			}

			//求解A=A-u*pr
			for(i=1;i<=N;i++)
			{
				for(j=1;j<=N;j++)
				{
					A[i][j]=A[i][j]-u[i]*p[j];
				}
			}
		}
	}
}
```
