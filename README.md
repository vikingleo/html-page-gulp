## gulp自动编译HTML静态页
> 每次做静态页都要重新配一次gulp，为免麻烦，直接开了个库

## 说明
 1. @@include ：载入html
 2. @@title 使用@@include第二参数中的json属性，title是key
 3. @@include的第二参数必须是json标准，即`{"key":"value"}`格式</p>

## 安装
```bash
npm install
# npm i 
```

## 使用
```bash
gulp watch # 监听总方法
gulp fileInclude # 手动合并html
gulp scss # 手动编译css
```