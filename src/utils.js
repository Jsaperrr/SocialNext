/**
 * 深拷贝
 * @param {*} target 
 * @returns 
 */
export function deepCopy(target) {
  if(typeof target === 'object') {
    const result = Array.isArray(target) ? [] : {};
    for(const key in target) {
      if(typeof target[key] === 'object') {
        result[key] = deepCopy(target[key]);
      }else {
        result[key] = target[key];
      }
    }
    return result;
  }
  return target;
}

/**
 * 生成唯一id
 * @returns 
 */
export function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
}