const svgCaptcha = require('svg-captcha')

//存储验证码，用于后续的检验
const captchaStore = new Map()    // Redis 缓存是最好的方案

//验证码的有效期 5 分钟
const CAPTCHA_EXPIRETIME = 5 * 60 * 1000

function generateCaptcha(ctx) {
    const captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: 'o01il',
        noise: 2,
        color: true,
        background: '#f0f0f0'
    })


    //生成唯一 ID
    const captchaId = `captcha-${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // 存储
    const expireAt = Date.now() + CAPTCHA_EXPIRETIME
    captchaStore.set(captchaId, {
        text: captcha.text.toLocaleLowerCase(),
        expireAt
    })
    
    //过期清理
    setTimeout(() => {
      const stored = captchaStore.get(captchaId)
      if(stored){
          captchaStore.delete(captchaId)
      }
    },CAPTCHA_EXPIRETIME)
     
    return {
        id:  captchaId,
        svg: captcha.data
    }
}


 
module.exports = generateCaptcha