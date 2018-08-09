const redis = require('redis');
const config = require('./../config/development.json')

class RedisFactory {

    constructor() {
        let self = this;
        this.redisClient = redis.createClient(config.redis);

        this.redisClient.on('ready', function() {
            console.log("Redis is ready");
        });

        this.redisClient.on('error', function() {
            console.log("Error in Redis");
        });
    }

    isExists(value) {
        return new Promise((resolve, reject) => {
            this.redisClient.exists(value, function(err, reply) {
                if (reply === 1) {
                    console.log('exists');
                    return resolve(reply)
                } else if (reply == 0) {
                    console.log('doesn\'t exist');
                    return resolve(reply)
                } else {
                    return reject(err);
                }
            });
        });
    }
    fetch(value) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(value, function(err, reply) {
                if (reply) {
                    console.log("REPLY----", JSON.parse(reply))
                    return resolve(reply)
                }
                if (!reply) {
                    console.log("REPLY NOT FORMATTED---", reply)
                    return reject({ message: "REPLY NOT FORMATTED", data: reply })
                }
                if (err) {
                    console.log("Error Handling--", err)
                    return reject({ message: "Encountered Redis error", err })
                } else {
                    console.log("Exception Handling---- ERR:", err, "    Response:", reply);
                    return reject({ message: "Exception Handling!!", err, response: reply })
                }
            })
        });
    }

    store(key, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.set([key, value], function(err, reply) {
                if (reply) {
                    return resolve(reply)
                }
                if (err) {
                    return reject(err)
                }
            })
        })
    }

    storeEx(key, value, expire) {
        return new Promise((resolve, reject) => {
            this.redisClient.set([key, value, 'EX', expire], function(err, reply) {
                if (reply) {
                    return resolve(reply)
                }
                if (err) {
                    return reject(err)
                }
            })
        })
    }
    storeNx(key, value, expire) {
        return new Promise((resolve, reject) => {
            this.redisClient.set([key, value, 'NX', 'EX', expire], function(err, reply) {
                if (reply) {
                    console.log("REPLY----", reply)
                    return resolve(reply)
                }
                if (err) {
                    return reject(err)
                }
            })
        })
    }
    clearAll() {
        return new Promise((resolve, reject) => {
            this.redisClient.flushdb(function(err, didSucceed) {
                if (err)
                    return reject(err)
                return resolve(didSucceed)
            });
        })
    }

}

module.exports = RedisFactory