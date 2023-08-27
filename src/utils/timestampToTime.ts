export default function (timestamp:string):string {
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  const date = new Date(Number(timestamp));
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  const h = date.getHours() + ":";
  const m = date.getMinutes() ;
  const d = date.getDay()
  const dAddQuote = '（' + getToday(d) + '）'
  return Y + M + D + h + m + dAddQuote;
  // const m = date.getMinutes() + ":";
  // const s = date.getSeconds();
  // return Y + M + D + h + m + s;
}

function getToday(week: number){
  let str = ''
  if (week == 0) {
    str = "星期日";
  } else if (week == 1) {
    str = "星期一";
  } else if (week == 2) {
    str = "星期二";
  } else if (week == 3) {
    str = "星期三";
  } else if (week == 4) {
    str = "星期四";
  } else if (week == 5) {
    str = "星期五";
  } else if (week == 6) {
    str = "星期六";
  }
  return str;
}