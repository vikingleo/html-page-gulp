## gulp自动编译HTML静态页
> 每次做静态页都要重新配一次gulp，直接clone可用

## 说明
 1. @@include ：载入html
 2. @@title 使用@@include第二参数中的json属性，title是key
 3. @@include的第二参数必须是json标准，即`{"key":"value"}`格式
 4. 随包搭配`basic-style`，不喜自删
## 安装
```bash
npm install
# npm i 
```

## 使用
```bash
gulp watch / npm run watch # 监听总方法
gulp html / npm run html # 手动合并html
... 具体看package.json
```
