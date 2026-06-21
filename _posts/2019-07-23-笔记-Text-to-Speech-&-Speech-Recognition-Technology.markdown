---
layout:     post
isblog: true
note: true
title:      "文本转语音&语音识别技术"
subtitle:   " \"Text to Speech & Speech Recognition Technology\""
date:       2019-07-23 17:24:00
author:     "张凡"
header-img: "https://aerozf.oss-cn-beijing.aliyuncs.com/images/frp_network.jpg"
catalog: true
tags:
    - python
    - AI
---

## 1 文本转语音技术

文本转语音用到的是科大讯飞的文本转语音AI的api。
首先注册科大讯飞的账号，再然后开通文本转语音服务（免费版），记下创建的应用的API_KEY和APP_ID，填到如下所示的代码中，即可实现文本转语音。

```python
# -*- coding: utf-8 -*-
"""
Created on Sun Jul 21 21:30:49 2019
@author: zhangfan
"""

import base64
import json
import time
import hashlib
import requests

"""构造一个文本转语音函数，直接调用"""
def text2audio(text):
    # API请求地址、API KEY、APP ID等参数，提前填好备用
    api_url = "http://api.xfyun.cn/v1/service/v1/tts"
    API_KEY = "你的API_KEY"
    APP_ID = "你的APP_ID"
    OUTPUT_FILE = "output.mp3"    # 输出音频的保存路径，请根据自己的情况替换
    TEXT = text
    
    # 构造输出音频配置参数
    Param = {
    "auf": "audio/L16;rate=16000",    #音频采样率
    "aue": "lame",    #音频编码，raw(生成wav)或lame(生成mp3)
    "voice_name": "xiaoyan",
    "speed": "50",    #语速[0,100]
    "volume": "77",    #音量[0,100]
    "pitch": "50",    #音高[0,100]
    "engine_type": "aisound"    #引擎类型。aisound（普通效果），intp65（中文），intp65_en（英文）
    }
    # 配置参数编码为base64字符串，过程：字典→明文字符串→utf8编码→base64(bytes)→base64字符串
    Param_str = json.dumps(Param)    #得到明文字符串
    Param_utf8 = Param_str.encode('utf8')    #得到utf8编码(bytes类型)
    Param_b64 = base64.b64encode(Param_utf8)    #得到base64编码(bytes类型)
    Param_b64str = Param_b64.decode('utf8')    #得到base64字符串
                                   
                                   # 构造HTTP请求的头部
    time_now = str(int(time.time()))
    checksum = (API_KEY + time_now + Param_b64str).encode('utf8')
    checksum_md5 = hashlib.md5(checksum).hexdigest()
    header = {
    "X-Appid": APP_ID,
    "X-CurTime": time_now,
    "X-Param": Param_b64str,
    "X-CheckSum": checksum_md5
    }

    # 发送HTTP POST请求
    response = requests.post(api_url, data={'text':TEXT}, headers=header)
    # 读取结果
    response_head = response.headers['Content-Type']
    if(response_head == "audio/mpeg"):
        out_file = open(OUTPUT_FILE, 'wb')
        data = response.content # a 'bytes' object
        out_file.write(data)
        out_file.close()
        #print('输出文件: ' + OUTPUT_FILE)
    else:
        pass
        #print(response.text)
```
测试一下上面构造的文本转语音函数
```python
text2audio('这是一个文本转语音的测试！')  #文本转语音测试文本
```

生成的语音效果如下所示，音频的音速、音调、音高等参数在程序中都是可以调节的。
<div markdown="0">
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="https://aerozf.oss-cn-beijing.aliyuncs.com/audios/output.mp3" >
</audio></div>

## 2 语音转文本技术

语音转文本用到的是百度的语音转文本AI的api。
流程和上面一样，注册百度AI开放平台，然后创建语音识别应用（免费版），记下APP_ID、API_KEY、SECRET_KEY。然后下载百度AI接口模块，在系统命令行中输入以下命令下载：
```
pip install baidu-aip
```

然后运行代码即可（注意填入你的百度AI应用的APP_ID、API_KEY、SECRET_KEY）

```python
# -*- coding: utf-8 -*-
"""
Created on Tue Jul 23 17:36:34 2019
@author: zhangfan
"""

from aip import AipSpeech

# Baidu Speech API, replace with your personal key
APP_ID = '你的 APP_ID'
API_KEY = '你的 API_KEY'
SECRET_KEY = '你的 SECRET_KEY'

client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

"""构造语音识别函数"""
def listen(audio):
    with open(audio, 'rb') as f:
        audio_data = f.read()
    result = client.asr(audio_data, 'wav', 16000, {
        'dev_pid': 1536,
    })
    result_text = result["result"][0]
    return result_text
```

用下面音频测试试试
<div markdown="0">
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="https://aerozf.oss-cn-beijing.aliyuncs.com/audios/output.mp3" >
</audio></div>

运行代码，调用语音识别函数
```python
print(listen('output.mp3'))
```
识别结果如下所示：
```
>> 这是一个文本转语音的测试
```

> 1、[百度AI开放平台](http://ai.baidu.com/?track=cp:aipinzhuan|pf:pc|pp:AIpingtai|pu:title|ci:|kw:10005792)
2、[科大讯飞](https://www.iflytek.com/)
