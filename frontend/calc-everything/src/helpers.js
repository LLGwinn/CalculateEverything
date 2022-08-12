/** Formats a number to have two decimal places and commas for thousands */
function formatNumber(num) {
    console.log('num', num, typeof num)
    const numWithDecimals = parseFloat(num).toFixed(2);
    console.log('numWithDecimals', numWithDecimals)
    const numArray = numWithDecimals.split("");
    if (isNaN(num) || num == Infinity || num < 0) return '--';
    if (numArray.length < 7) return numWithDecimals;

    for (let i=numArray.length-6; i>=1; i=i-3) {
        numArray.splice(i, 0, ',')
    }

    return numArray.join('');
}

/** Simple loan calculation
 *  args: principle amt, interest rate, term of loan
 *  returns: pmt amount, total interest, and total loan
 */
function calculateLoanPmt(prin, int, time) {
    const annualRate = (parseFloat(int/100)) / 12;
    const simplified = Math.pow((1 + annualRate), time);
    const pmt = (prin * ((annualRate * simplified) / (simplified - 1)));
    const intTotal = formatNumber((pmt * time) - prin);
    const loanTotal = formatNumber(pmt * time);
    const formattedPmt = formatNumber((prin * ((annualRate * simplified) / (simplified - 1))));
    return {formattedPmt, intTotal, loanTotal};
}

export {formatNumber, calculateLoanPmt};

// INTTOTAL AND LOANTOTAL KEEP RETURNING NaN, IN FACT I THINK THEY'RE SENDING AS NaN TO THE FORMAT FUNCTION