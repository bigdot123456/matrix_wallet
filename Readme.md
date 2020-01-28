# MATRIX blockchain smartcontract compile and deploy tool 
1.进入command目录，然后
1.nvm use 10.15

1.更新数据库，会读取对应的require
 
 ```
 npm install
```
1.需要编译某个文件
```bash
node-gyp rebuild
npm run rebuild 
```
1.再次更新
```
npm install
```
1.运行deploy.js程序
```
node deploy
```
1.在其中选择对应的菜单

## 配置方法
 
### 核心配置在：
* config.js *
设定目录和路径
* deploy.js *
```javascript
let transactionClass = require('../transaction/transactionClass.js');

let deploy = new transactionClass(["FROM","SOLFILE","CONTRACT","DEPLOYDATA","GAS","SUBMIT","PASSWORD","NORMALRAW","TRANSDATABASE","INSERTTRANS"]);
deploy.file = "../sol/sc_AITravelToken_2.sol";
deploy.contractArgs = []
deploy.run();
```
可以看到，智能合约设定位置，并通过transactionClass.js实现发送
* transactionClass.js *
打开run函数，位于promptClass.js中
```javascript
   run(){
        for(var i=0;i<this.schemaAry.length;i++){
            if(this[this.schemaAry[i]]){
                this[this.schemaAry[i]]();
            }
        }
        super.run()
    }

```javascript

### remix的运行方式
remix-ide
然后在浏览器中打开
