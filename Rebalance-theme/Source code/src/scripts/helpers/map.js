// maps a range of numbers to another

export default (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
