/** Formats a number to have two decimal places and commas for thousands */
function formatNumber(num) {
    const numWithDecimals = parseFloat(num).toFixed(2);
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
 */
function calculateLoanPmt(prin, int, time) {
    const annualRate = (parseFloat(int/100)) / 12;
    const simplified = Math.pow((1 + annualRate), time);

    return (prin * ((annualRate * simplified) / (simplified - 1)))
}

export {formatNumber, calculateLoanPmt};