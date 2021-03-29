const fs = require('fs');
const pathLib = require('path');
const mineoProtocol = require('./mineoProtocol');
const { APP_TYPE_VX, UNKNOW } = require('./constants');

// Some global definitions
const fileName = pathLib.basename(__filename, '.js');

function getName(xmlLine) {
  const start = xmlLine.search('Name="') + 'Name="'.length;
  let i = start;
  // TODO KME Ici faire + conci dans a recherche du nom avec getFirstIndexof ('"')
  while (xmlLine[i] !== '"') {
    i += 1;
  }
  return xmlLine.substring(start, i);
}

function createPriorityObject(xmlTab, owner) {
  const priorities = {};
  let nbPriority = 0;

  xmlTab.forEach((xmlLine) => {
    if (xmlLine.includes('<Fragment')) {
      priorities[getName(xmlLine)] = { priority: nbPriority, owner };
      nbPriority += 1;
    }
  });
  return priorities;
}

function parseXmlByRuleFile(rulesCfg) {
  if (rulesCfg !== undefined) {
    const rulesPriorityTab = {};
    let appType = '';
    // We reverse the map because of common fragments and their owner
    // Common fragment's owner has to be the first App to call the fragment
    rulesCfg.reverse().forEach((rule) => {
      const { file } = rule;
      if (file) {
        if (fs.existsSync(file)) {
          const xmlData = fs.readFileSync(file, 'utf8');
          const xmlDataTranslated = mineoProtocol.transformDataFromRules(
            xmlData,
          );
          const nbOpenSimultane = (
            xmlDataTranslated.match(/<Simultaneous/g) || []
          ).length;
          const nbOpenPriorite = (xmlDataTranslated.match(/<Priority/g) || [])
            .length;

          // Only one Simultaneous tag ==> Navineo Vx mode (AKA dynamic mode)
          // Priority are defined by the show/hide commands.
          // The last shown fragment is the most prioritary.
          if (nbOpenPriorite === 0 && nbOpenSimultane === 1) {
            console.log(
              `[${fileName}]   parseXmlByRuleFile: Rules are dynamic`,
            );
            appType = APP_TYPE_VX;
            return null;
          }
          // More than one Simultaneous tag ==> Navineo Rx mode
          // Priority are defined by the rules files.
          console.log(`[${fileName}]   parseXmlByRuleFile: Rules are static`);
          const xmlTab = xmlDataTranslated.split(/\n|\r/).reverse();

          return Object.assign(
            rulesPriorityTab,
            createPriorityObject(xmlTab, rule.id ? rule.id : UNKNOW),
          );
        }
      }
      return {};
    });
    return appType !== APP_TYPE_VX ? rulesPriorityTab : null;
  }
  return {};
}

module.exports.getName = getName;
module.exports.createPriorityObject = createPriorityObject;
module.exports.parseXmlByRuleFile = parseXmlByRuleFile;
