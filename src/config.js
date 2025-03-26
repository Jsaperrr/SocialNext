const config = {
  url: '',//上报url地址
  projectName: 'eyesdk',//项目名称
  appId: '123456',//应用id
  userId: '123456',//用户id
  isImageUpload: false,//是否开启图片上传
  batchSize: 2,//批量上报数量
}

/**
 * 设置配置
 * @param {Object} options 配置对象
 */
export function setConfig(options) {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
}
export default config;