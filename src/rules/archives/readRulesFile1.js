const { rulesCfg, xmlDataTranslated } = require('./data');

function getFragmentsNumber(xmlDataTranslated) {
  let nb = 0;
  const xmlTab = xmlDataTranslated.split(/\n|\r/).reverse();

  xmlTab.forEach((xmlLine) => {
    if (xmlLine.includes('<Fragment')) {
      nb += 1;
    }
  });
  return nb;
}

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
  let priorityLevel = -1;
  let simultaneousLevel = -1;
  // When a newSimultaneous is found, we need to increment it (otherwise we don't)
  let newSimultaneous = false;
  let allNodesFound = [];
  let cptPriority = [];
  let fragmentsDict = {};
  const xmlTab = xmlDataTranslated.split(/\n|\r/).reverse();

  xmlTab.forEach((line) => {
    if (line.includes('<Fragment')) {
      // console.log(line);
      // console.log(priorityLevel);
      // console.log(line, allNodesFound);
      // console.log(line, priorityLevel, simultaneousLevel);
      const fragmentName = getName(line);
      const lastNodeEntry = allNodesFound[allNodesFound.length - 1];
      if (lastNodeEntry === 'Priority' || newSimultaneous) {
        cptPriority[cptPriority.length - 1] += 1;
        newSimultaneous = false;
      }
      // else if (priorityLevel === -1 && simultaneousLevel === 0) {
      //   console.log(line);
      //   cptPriority.push(-1);
      // }

      // Deep copy
      let saveFragmentArray = JSON.parse(JSON.stringify(cptPriority));

      // If the first node is simultaneous, it is a particular scenario because all fragments will be dispalyed in parallel of all inside priority node
      if (allNodesFound && allNodesFound[0] === 'Simultaneous') {
        saveFragmentArray = [-1].concat(saveFragmentArray);
      }

      fragmentsDict[fragmentName] = saveFragmentArray;
    } else {
      if (line.includes('</Priority>')) {
        priorityLevel += 1;
        allNodesFound.push('Priority');
        cptPriority.push(0);
        return true;
      }
      if (line.includes('<Priority')) {
        priorityLevel -= 1;
        if (allNodesFound[allNodesFound.length - 1] === 'Priority') {
          allNodesFound.pop();
          cptPriority.pop();
        }
        return true;
      }
      if (line.includes('</Simultaneous>')) {
        simultaneousLevel += 1;
        allNodesFound.push('Simultaneous');
        newSimultaneous = true;
        return true;
      }
      if (line.includes('<Simultaneous')) {
        simultaneousLevel -= 1;
        if (allNodesFound[allNodesFound.length - 1] === 'Simultaneous') {
          allNodesFound.pop();
        }
        return true;
      }
    }
  });
  return fragmentsDict;
}

function readRules() {
  // console.log(xmlDataTranslated);
  // const fragmentsNb = getFragmentsNumber(xmlDataTranslated);
  // console.log(fragmentsNb);
  const fragmentsDict = buildPriorityArray(xmlDataTranslated);
  console.log(fragmentsDict);
}

// What is returned by the last console.log
// { NavineoArret: [ 1 ],
//   NavineoDeconnecte: [ 2 ],
//   GsRvInfosComptagePassagersUpDown: [ 3 ],
//   GsRvInfosComptagePassagersUp: [ 3 ],
//   GsRvSynoptique: [ 3, 1 ],
//   GsRvCartographie: [ 3, 2 ],
//   test: [ 3 ],
//   DiversMiseHorsTension: [ 4 ],
//   MiseAJourEnCours: [ 5 ],
//   PhonieAppelUrgentAttCom: [ -1 ],
//   ZrMaintenance: [ -1, 1 ],
//   ZrInitMaintenance: [ -1, 2 ],
//   ZhGsRvAvanceRetard: [ -1, 1 ],
//   ZhGsRvAvanceRetardEncadrants: [ -1, 2 ],
//   ZhGsRvDSO: [ -1, 3 ],
//   ZhHeure: [ -1 ] }

module.exports.readRules = readRules;
