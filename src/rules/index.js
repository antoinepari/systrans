const { readRules } = require('./readRulesFile');
const { main } = require('./showHideAlgo');

const fragmentsDict = readRules();
// console.log(fragmentsDict);
main(fragmentsDict);
