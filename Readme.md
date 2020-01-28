MATRIX blockchain smartcontract compile and deploy tool 
（1）进入command目录，然后
 （2）nvm use 10.15

 （3）更新数据库，会读取对应的require
  npm install
（4）需要编译某个文件
node-gyp rebuild
npm run rebuild 
 （5）再次更新
 npm install
（6）运行deploy.js程序
node deploy
  (7) 在其中选择对应的菜单
  
核心配置在：
（1)config.js
设定目录和路径
（2）deploy.js
let transactionClass = require('../transaction/transactionClass.js');

let deploy = new transactionClass(["FROM","SOLFILE","CONTRACT","DEPLOYDATA","GAS","SUBMIT","PASSWORD","NORMALRAW","TRANSDATABASE","INSERTTRANS"]);
deploy.file = "../sol/sc_AITravelToken_2.sol";
deploy.contractArgs = []
deploy.run();
可以看到，智能合约设定位置，并通过transactionClass.js实现发送
（3）transactionClass.js
打开run函数，位于promptClass.js中
   run(){
        for(var i=0;i<this.schemaAry.length;i++){
            if(this[this.schemaAry[i]]){
                this[this.schemaAry[i]]();
            }
        }
        super.run()
    }


remix的运行方式
remix-ide
然后在浏览器中打开




# matrix_wallet
# matrix_wallet
# matrix_wallet
