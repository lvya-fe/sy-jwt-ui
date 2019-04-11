// ======== 配置文件 开始==================
// 地址有内外网，如果没有内网，仅填写外网地址就行；如果只有内网，请将内外网都填写成内网

const WebConfig = {
  GateWayServer: {
    IP: 'http://sy-test.lvya.org/',  // nginx网关服务,即后端外网地址，以 /结束
    // IP: 'http://sy.lvya.org/',  // nginx网关服务,即后端外网地址，以 /结束
    innerIP: ''
  }
}



//=========== 配置文件结束 ======================

try {
  module.exports = WebConfig
}catch(err) {
  window.GateWayServer = WebConfig.GateWayServer.IP
  window.LocalGateWayServer = WebConfig.GateWayServer.innerIP
}
