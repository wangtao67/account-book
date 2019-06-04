
const jwt = require('jsonwebtoken');

// 创建 token 类
class Jwt {
    constructor() {
        this.cert = 'ATAO'
    }

    //生成token
    generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let token = jwt.sign({
            data,
            exp: created + 60 * 15, // s
        }, this.cert);
        return token;
    }

    // 校验token
    verifyToken(token) {
        let res;
        try {
            let result = jwt.verify(token, this.cert) || {};
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            } 
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res = 'expired'
            } else {
                res = 'err';
            }
        }
        return res;
    }
}

module.exports = Jwt;

// const crypto = require('crypto')

// export function encrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key)
//     var crypted = cipher.update(data, 'utf8', 'hex')
//     crypted += cipher.final('hex')
//     return crypted
// }

// export function decrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key)
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8')
//     decrypted += decipher.final('utf8')
//     return decrypted
// }