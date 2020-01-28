"use strict";


const fs = require('fs');
const Q = require('bluebird');
const Loki = require('lokijs');
let collections = require('./collections.js');
const path = require('path');
let logger = require("../logger/logger.js");
let logDebug;
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

module.exports = class mandb
{
    constructor(filePath,name) {
        this.dbName = name;
        this.db = null;
        logDebug = logger.create('matrixDb');
        this.filePath = filePath;
    }
    init() {
        var temp = this;
        mkdirsSync(this.filePath);
        let filePath = this.filePath + '/' + this.dbName;
    //    web3Require.logger.debug(filePath);
        return Q.try(() => {
            // if db file doesn't exist then create it
            try {
                logDebug.debug(`Check that db exists and it's writeable: ${filePath}`);
                fs.accessSync(filePath, fs.R_OK | fs.W_OK);
                return Q.resolve();
            } catch (err) {
                logDebug.debug(`Creating db: ${filePath}`);

                const tempdb = new Loki(filePath, {
                    env: 'NODEJS',
                    autoload: false,
                });

                return new Q.promisify(tempdb.saveDatabase, { context: tempdb })();
            }
        })
        .then(() => {
            logDebug.debug(`Loading db: ${filePath}`);

            return new Q((resolve, reject) => {
                temp.db = new Loki(filePath, {
                    env: 'NODEJS',
                    autosave: true,
                    autosaveInterval: 5000,
                    autoload: true,
                    autoloadCallback(err) {
                        if (err) {
                            logDebug.error(err);
                            reject(new Error('Error instantiating db'));
                        }
                        resolve();
                    },
                });
            });
        });
    }

    getCollection(name,uniqueID){
        if (!this.db.getCollection(name)) {
            if(uniqueID)
            {
                this.db.addCollection(name, {unique: ['_id']});
            }
            else
            {
                this.db.addCollection(name, {unique: [uniqueID]});
            }
        }
        return this.db.getCollection(name);
    }


    close(){
        return new Q((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

