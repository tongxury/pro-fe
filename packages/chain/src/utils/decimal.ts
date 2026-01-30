import Decimal from "decimal.js"

export const safeNumber = (num?: number, fixed?: number): number => {
    if (!num) return 0
    const dl = new Decimal(num)
    if (dl.isZero() || dl.isNaN()) {
        return 0
    }

    return new Decimal(dl.toFixed(fixed || 5)).toNumber()
}


function transferToNumber(inputNumber: any) {
    if (isNaN(inputNumber)) {
        return inputNumber
    }
    inputNumber = '' + inputNumber
    inputNumber = parseFloat(inputNumber)
    let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
    let tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
    let number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
    return number
}

export const shortenDecimal = (value?: number, options?: { fixed?: number, maxZeros?: number }): string => {

    if (!value) {
        return '0'
    }

    value = Number(value)

    const fixed = options?.fixed || 4
    const maxZeros = options?.maxZeros || 3


    if (value > 1000000) {
        return `${(value / 1000000).toFixed(2)}M `
    }

    if (value > 1000) {
        return `${(value / 1000).toFixed(2)}K `
    }

    if (value > 1) {
        return value.toFixed(fixed);
    }

    if (value * 10 ** maxZeros > 1) {
        return value.toFixed(fixed);
    }

    let rawValueString = transferToNumber(value).toString();

    // console.log('rawValueString', transferToNumber(value).toString());

    const decimalPointIndex = rawValueString.indexOf('.');

    let leadingZerosCount = 0;
    for (let i = decimalPointIndex + 1; i < rawValueString.length; i++) {
        if (rawValueString[i] === '0') {
            leadingZerosCount++;
        } else {
            break; // 找到第一个非零字符后停止计数
        }
    }

    if (leadingZerosCount < maxZeros) {
        return value.toPrecision(fixed)
    }

    const fixedValue = value.toFixed(leadingZerosCount + fixed);


    return `0.{${leadingZerosCount}}${fixedValue.slice(decimalPointIndex + leadingZerosCount + 1)}`;
}

