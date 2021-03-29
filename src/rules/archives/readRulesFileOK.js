const { rulesCfg, xmlDataTranslated } = require('./data');

function getName(xmlLine) {
  const start = xmlLine.search('Name="') + 'Name="'.length;
  let i = start;
  // TODO KME Ici faire + conci dans a recherche du nom avec getFirstIndexof ('"')
  while (xmlLine[i] !== '"') {
    i += 1;
  }
  return xmlLine.substring(start, i);
}

function buildPriorityArray(xmlDataTranslated) {
  let priorityCpt = 0;
  let simultaneousCpt = 0;
  let FragmentNb = 0;
  // When a newSimultaneous is found, we need to increment it (otherwise we don't)
  let newSimultaneous = false;
  let allNodesFound = '';
  let cptPriority = [];
  let fragmentsDict = {};
  const xmlTab = xmlDataTranslated.split(/\n|\r/).reverse();

  xmlTab.forEach((line) => {
    if (line.includes('<Fragment')) {
      const fragmentName = getName(line);

      FragmentNb++;
      const test = allNodesFound.substring(0, allNodesFound.length - 1);

      fragmentsDict[fragmentName] = {
        pos: test.split('-'),
        priority: FragmentNb,
      };

      // Deep copy
      // let saveFragmentArray = JSON.parse(JSON.stringify(cptPriority));
    } else {
      if (line.includes('</Priority>')) {
        priorityCpt++;
        allNodesFound += `p${priorityCpt}-`;
        return true;
      }
      if (line.includes('<Priority')) {
        allNodesFound = allNodesFound.substring(0, allNodesFound.length - 3);
        return true;
      }
      if (line.includes('</Simultaneous>')) {
        simultaneousCpt++;
        allNodesFound += `s${simultaneousCpt}-`;
        return true;
      }
      if (line.includes('<Simultaneous')) {
        allNodesFound = allNodesFound.substring(0, allNodesFound.length - 3);
        return true;
      }
    }
  });
  return fragmentsDict;
}

function readRules() {
  const fragmentsDict = buildPriorityArray(xmlDataTranslated);
  console.log(fragmentsDict);
}

module.exports.readRules = readRules;
