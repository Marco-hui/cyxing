export default {
    set(_date,fmt){
        var date = new Date(_date);
        var o={
            "M+": date.getMonth() + 1,
            "D+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        };

        // 配置年份（年份比较特殊，这里单独处理）
        // 若有年份，则匹配年份，利用RegExp.$1可以获取第一个分组内容
        if(/(Y+)/.test(fmt)){
            // true 说明有传入年份
            var res=String(date.getFullYear()).substr(4-RegExp.$1.length);
            fmt=fmt.replace(RegExp.$1,res);
        }

        // 配置其他
        for(var attr in o){
            var reg=new RegExp('('+attr+')')
            if(reg.test(fmt)){
                var res = RegExp.$1.length<2 ? o[attr] : ('00'+o[attr]).substr(String(o[attr]).length);
                fmt=fmt.replace(RegExp.$1,res);
            }
        }
        return fmt;
    }
}