const formatTime = timeStamp => {
  let date = new Date(timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 分转换成元 1角=10分 1元=100分
 */
const moneyFormat = amount => {
  console.log(amount,'amount')
  return amount/100
}

module.exports = {
  formatTime: formatTime,
  moneyFormat: moneyFormat
}
