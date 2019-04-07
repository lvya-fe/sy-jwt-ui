/**
 * 正则表达式
 */
class RegRule {
  // 构造
  constructor() {
    this.regHttp = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/gi;
  }
}

export default new RegRule()
