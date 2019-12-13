/**
 * checkData 数据格式验证
 * @pramas [All] val 传入的值，任意类型
 * @pramas [String] checkType 对比类型
 */
let getType = Object.prototype.toString;

function checkData(val, checkType) {
  let checkRule;
  switch (checkType) {
    case 'Number':
      checkRule = '[object Number]';
      break;
    case 'String':
      checkRule = '[object String]';
      break;
    case 'Boolean':
      checkRule = '[object Boolean]';
      break;
    case 'Undefined':
      checkRule = '[object Undefined]';
      break;
    case 'Null':
      checkRule = '[object Null]';
      break;
    case 'Object':
      checkRule = '[object Object]';
      break;
    case 'Array':
      checkRule = '[object Array]';
      break;
    case 'Function':
      checkRule = '[object Function]';
      break;
    default:
      console.log('没有可用的验证类型')

  };
  return getType.call(val) == checkRule;
}

/**
 * validate 表单验证
 * @pramas [Object] config 表单字段配置
 * @pramas [Object] config 表单数据
 */

function Validate(config, pramas) {

  //处理结果
  this.res = []
  this.config = config;
  this.pramas = pramas;

  //继承数据验证模块
  this.checkData = checkData;
  //执行验证

}

/**
 * init 初始化
 * @pramas [Object] config 表单配置
 * return  [Object] res处理结果对象
 */
Validate.prototype.init = function () {
  let res = {};
  let msg = {};
  let firstFalse = "";
  let config = this.config;

  Object.keys(config).forEach(field => {
    let checkField = true;
    config[field].map(rule => {
      //数据check
      if (!this.resolveRule(rule, field)) {
        checkField = false;
        msg[field] = rule.message;
        if (!firstFalse) firstFalse = rule.message;
      }
    })
    res[field] = checkField;
  })

  // 整体验证结果
  let check = true;
  Object.keys(res).forEach(key => {
    if (!res[key]) {
      check = false;
    }
  })

  return {
    check,
    msg,
    res,
    firstFalse
  }
}

/**
 * resolveRule 分解验证规则
 * @pramas [Object] rule 规则
 * @pramas [Object] field 字段
 */
Validate.prototype.resolveRule = function (rule, field) {
  let checkRes;
  Object.keys(rule).forEach(key => {
    //检查是否有匹配的规则
    if (this.check.hasOwnProperty(key)) {
      checkRes = this.check[key](this.pramas[field], rule[key]);
    }

  })
  return checkRes;
}

/**
 * check 数据验证处理
 * @pramas [Object] val 传入的值
 * @pramas [Object] rule 规则
 */
Validate.prototype.check = {
  required(val, rule) { //必填
    if(val === 0) return true
    return (val != '') && (val != null);
  },
  min(val, rule) { //最小
    return val >= rule
  },
  max(val, rule) {
    return val <= rule
  },
  between(val, rule) {
    return val > rule[0] && val < rule[1]
  },
  callback(val, rule) {
    return rule(val);
  },
  isNumber(val, rule) {
    return checkData(val, 'Number')
  },
  existEmoji(val, rule) {
    // let reg = /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g;
    let reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    if (val) {
      return !val.match(reg);
    } else {
      return true
    }
  },
  //只输入数字和字母
  cardNum(val, rule) {
    let reg = /^[0-9a-zA-Z]+$/g;
    return val.match(reg);
  },
  numString(val, rule) {
    let reg = /^[1-9][0-9]*([.]{1}[0-9]+){0,1}$/g;
    return val.match(reg);
  },
  isPhone(val) {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)
  },
  chNum(val) {
    return /^[0-9\u4e00-\u9fa5]+$/.test(val);
  },
  email(val) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)
  },
  // 身份证
  creditCard(val) {
    let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|(^[1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])/;
    return reg.test(val);
  },
  // 护照
  passPort(val) {
    let reg = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/;
    return reg.test(val);
  },

  //军官证
  officerCard(val) {
    let reg = /([\u4e00-\u9fa5]{1}(\d{4,8})$)/;
    return reg.test(val);
  }
}

//文本参数替换
Validate.prototype.format = function () {
  if (arguments.length == 0) {
    return null;
  }
  let str = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    let re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
  }
  return str;
}

// 例子：需要一份配置和一份数据
// let config = {
//   name: [{
//     required: true,
//     message: '请输入活动名称'
//   },
//   {
//     min: 3,
//     message: '长度在 {0}个以上字符'
//   }
//   ],
//   phone: [{
//     between: [10, 20]
//   }],
//   age: [{
//     callback: function (val) {
//       console.log("执行了回调，参数为:" + val)
//     }
//   }],
// }

// let pramas = {
//   name: "1",
//   phone: 151,
//   age: 100
// }
// 实例化：let Vali = new Validate(config, pramas)
// 验证：let res = Vali.init()
module.exports = {
  Validate
}