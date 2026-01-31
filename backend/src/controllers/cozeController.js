const axios = require('axios')

async function recognition (ctx) {
   const { img } =ctx.request.body
    //向工作流发请求

  const params = {"image": {
    "url":img,
    "file_type": "image"
  } }

  await axios({
    method:'post',
    url:'https://sxvxdzkwjn.coze.site/run',
    headers:{
        'Authorization': `Bearer ${process.env.VITE_COZE_IMAGE_TO_TEXT_AND_VOICE}`,
        'Content-Type':'application/json'
    },
    data: params
  })
   
}
module.exports = {
    recognition
}