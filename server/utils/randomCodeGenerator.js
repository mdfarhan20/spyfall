const RandomCodes = require("random-codes");

const config = {
    chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    parts: 1,
    part_size: 5
}

const rc = new RandomCodes(config);

function generateRandomCode() {
    return rc.generate();
}

module.exports = generateRandomCode;