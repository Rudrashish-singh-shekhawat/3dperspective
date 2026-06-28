export const FIBONACCI_TERMS = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2048];

export const findClosestFibIndex = (val) => {
    let closestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i < FIBONACCI_TERMS.length; i++) {
        const diff = Math.abs(FIBONACCI_TERMS[i] - val);
        if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
        }
    }
    return closestIdx;
};
