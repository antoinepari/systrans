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

function buildPriorityDict(xmlDataTranslated) {
  let priorityCpt = 0;
  let simultaneousCpt = 0;
  let fragmentNb = 0;
  // Priority only incremented on the first level
  let globalPriority = 0;
  let allNodesFound = [];
  // Save the path throughout the read of each line to know which path was used at any time
  let nodePath = '';
  let fragmentsDict = {};
  // Only use to know when we go from a layer 1 to a layer 2
  let isFirstLayer = false;
  const xmlTab = xmlDataTranslated.split(/\n|\r/).reverse();

  xmlTab.forEach((line) => {
    if (line.includes('<Fragment')) {
      const fragmentName = getName(line);

      fragmentNb++;
      const test = nodePath.substring(0, nodePath.length - 1);

      // Calculate the globalPriority
      let updatedGlobalPriority = 0;
      if (allNodesFound.length === 1 && allNodesFound[0] === 'Priority') {
        globalPriority++;
        updatedGlobalPriority = globalPriority;
        isFirstLayer = true;
      }
      // If last layer was the layer 1, then we need to increment globalPriority
      else if (
        allNodesFound.length > 1 &&
        allNodesFound[0] === 'Priority' &&
        isFirstLayer
      ) {
        isFirstLayer = false;
        globalPriority++;
        updatedGlobalPriority = globalPriority;
      } else if (allNodesFound.length > 1 && allNodesFound[0] === 'Priority') {
        updatedGlobalPriority = globalPriority;
      }

      // Set the fragment's data (code = globalPriority (priority not counting simultaneous), pos and priority)
      fragmentsDict[fragmentName] = {
        code: updatedGlobalPriority,
        pos: test.split('-'),
        priority: fragmentNb,
      };
    } else {
      if (line.includes('</Priority>')) {
        priorityCpt++;
        nodePath += `p${priorityCpt}-`;
        allNodesFound.push('Priority');
        return true;
      }
      if (line.includes('<Priority')) {
        nodePath = nodePath.substring(0, nodePath.length - 3);
        allNodesFound.pop();
        return true;
      }
      if (line.includes('</Simultaneous>')) {
        simultaneousCpt++;
        nodePath += `s${simultaneousCpt}-`;
        allNodesFound.push('Simultaneous');
        return true;
      }
      if (line.includes('<Simultaneous')) {
        nodePath = nodePath.substring(0, nodePath.length - 3);
        allNodesFound.pop();
        // When a Simultaneous node is closed, check if it was one of layer 1 to set isFirstLayer to true
        if (allNodesFound.length === 1 && allNodesFound[0] === 'Priority') {
          isFirstLayer = true;
        }
        return true;
      }
    }
  });
  return fragmentsDict;
}

function readRules() {
  const fragmentsDict = buildPriorityDict(xmlDataTranslated);
  // console.log(fragmentsDict);
  return fragmentsDict;
}

module.exports.readRules = readRules;
