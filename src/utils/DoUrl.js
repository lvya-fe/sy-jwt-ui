export default function (url) {
  var bool = url.indexOf("http");
  var bool2 = url.indexOf("src");
  var bool3 = url.indexOf("href");
  if(bool>=0&&bool2<0&&bool3<0){
    url = url.replace(/_tcn_/g, 't.cn');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\&|-)+)/g, "<a href='$1$2' target='_blank'> 分享链接 </a>");
  }
  return url;
};
