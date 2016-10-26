var stats = require('./stats');
var report = {
    count: 0, // 总消息量
    min: Number.MAX_VALUE, // 最小值
    max: Number.MIN_VALUE, // 最大值
    mean: 0,  // 平均值
    stdev: 0, // 标准差
    median: 0, // 中位数
    $75: 0, // <= 75%
    $95: 0, // <= 95%
    $98: 0, // <= 98%
    $99: 0, // <= 99%
    $99_9: 0 // <= 99.9%
};
var calculate = function(useTimesArray) {
    report.count = useTimesArray.length;
    report.min = Math.min.apply(null, useTimesArray);
    report.max = Math.max.apply(null, useTimesArray);
    report.mean = stats.mean(useTimesArray);
    report.stdev = stats.stdev(useTimesArray);
    report.median = stats.median(useTimesArray);
    report.$75 = stats.percentile(useTimesArray, 0.75);
    report.$95 = stats.percentile(useTimesArray, 0.95);
    report.$98 = stats.percentile(useTimesArray, 0.98);
    report.$99 = stats.percentile(useTimesArray, 0.99);
    report.$99_9 = stats.percentile(useTimesArray, 0.999);

    console.log(reportFormat());
    useTimesArray.length = 0;
};

var reportFormat = function() {
    return '---------------分割线------------------\n' +
        'count = '+report.count + '\n' +
          'min = '+report.min + '\n' +
          'max = '+report.max +'\n' +
         'mean = '+report.mean +'\n' +
        'stdev = '+report.stdev +'\n' +
       'median = '+report.median +'\n' +
         '75% <= '+report.$75 +'\n' +
         '95% <= '+report.$95 +'\n' +
         '98% <= '+report.$98 +'\n' +
         '99% <= '+report.$99 +'\n' +
       '99.9% <= '+report.$99_9;
};

module.exports = {
    calculate: calculate
};