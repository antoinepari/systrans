const fontManager = require('./fontManager');
const languageManager = require('./languageManager');
const { DIAG_EN, DIAG_FR } = require('./constants');

function removeSpaces(sXMLData) {
  // Using a regex to simply indicate the replace is recursive ('/g')
  // Remove all the useless spaces
  let sXMLDataWithoutSpaces = '';
  if (sXMLData) {
    let regex = /< /g;
    sXMLDataWithoutSpaces = sXMLData.replace(regex, '<');
    regex = /<\/ /g;
    sXMLDataWithoutSpaces = sXMLDataWithoutSpaces.replace(regex, '</');
    regex = / >/g;
    sXMLDataWithoutSpaces = sXMLDataWithoutSpaces.replace(regex, '>');
    regex = / \/>/g;
    sXMLDataWithoutSpaces = sXMLDataWithoutSpaces.replace(regex, '/>');
    regex = / =/g;
    sXMLDataWithoutSpaces = sXMLDataWithoutSpaces.replace(regex, '=');
    regex = /= /g;
    sXMLDataWithoutSpaces = sXMLDataWithoutSpaces.replace(regex, '=');
  }

  return sXMLDataWithoutSpaces;
}

function translateAllXFiles(sXMLDataTranslate) {
  let xmlAllFilesTranslated = sXMLDataTranslate;
  const occurences = sXMLDataTranslate.match(/Fichier(\d+)=/g);

  if (occurences) {
    occurences.forEach((o) => {
      const re = new RegExp(o);
      const suffix = o.substr('Fichier'.length);
      xmlAllFilesTranslated = xmlAllFilesTranslated.replace(
        re,
        `File${suffix}`,
      );
    });
  }

  return xmlAllFilesTranslated;
}

function biDialectInputFiles(sXMLData) {
  // Using a regex to simply indicate the replace is recursive ('/g')
  // Object names
  let sXMLDataTranslate = '';
  if (sXMLData) {
    let regex = /<Lot/g;
    sXMLDataTranslate = sXMLData.replace(regex, '<Fragment');
    regex = /Lot>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Fragment>');
    regex = /<Texte/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Text');
    regex = /Texte>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Text>');
    regex = /<BarGraphe/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<BarGraph');
    regex = /BarGraphe>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BarGraph>');
    regex = /<Saisie/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Input');
    regex = /Saisie>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Input>');
    regex = /<Son/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Sound');
    regex = /Son>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Sound>');

    // CAUTION: don't change the button order. Long words must be translate before short ones.
    // If not BoutonImageClignotant will be translate by ImageButtonClignotant
    regex = /<BoutonImageDroite/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<RightImageButton');
    regex = /BoutonImageDroite>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'RightImageButton>');
    regex = /<BoutonImageGauche/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<LeftImageButton');
    regex = /BoutonImageGauche>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'LeftImageButton>');
    regex = /<RenduWeb/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<WebRender');
    regex = /RenduWeb>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'WebRender>');
    regex = /<PrecedentImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<PreviousImg');
    regex = /PrecedentImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PreviousImg>');
    regex = /<SuivantImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<NextImg');
    regex = /SuivantImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'NextImg>');
    regex = /<RafraichirImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<RefreshImg');
    regex = /RafraichirImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'RefreshImg>');
    regex = /<BoutonImageBistable/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      '<BistableImageButton',
    );
    regex = /BoutonImageBistable>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'BistableImageButton>',
    );
    regex = /<BoutonImageClignotant/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      '<BlinkingImageButton',
    );
    regex = /BoutonImageClignotant>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'BlinkingImageButton>',
    );
    regex = /<BoutonImageEnfoncable/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<PushImageButton');
    regex = /BoutonImageEnfoncable>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PushImageButton>');
    regex = /<BoutonImage/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<ImageButton');
    regex = /BoutonImage>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ImageButton>');
    regex = /<BoutonOnglet/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<TabButton');
    regex = /BoutonOnglet>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TabButton>');
    regex = /<Bouton/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Button');
    regex = /Bouton>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Button>');
    regex = /<ImageClignotante/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<BlinkingImage');
    regex = /ImageClignotante>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BlinkingImage>');
    regex = /<Liste/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<List');
    regex = /Liste>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'List>');
    regex = /<Reglette/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Ruler');
    regex = /Reglette>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Ruler>');
    regex = /<TexteScrollable/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<ScrollableText');
    regex = /TexteScrollable>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ScrollableText>');
    regex = /<Pupitres/g; // MineoConfig
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Consoles');
    regex = /Pupitres>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Consoles>');
    regex = /<Pupitre/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Console');
    regex = /Pupitre>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Console>');
    regex = /<Police/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Font');
    regex = /Police>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Font>');
    regex = /<Regles/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Rules');
    regex = /Regles>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Rules>');
    regex = /<Regle/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Rule');
    regex = /Regle>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Rule>');
    regex = /<Clavier/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Keyboard');
    regex = /Clavier>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Keyboard>');
    regex = /<NavigateurWeb/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<WebBrowser');
    regex = /NavigateurWeb>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'WebBrowser>');
    regex = /<Lettres/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Letters');
    regex = /Lettres>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Letters>');
    regex = /<Commun/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Common');
    regex = /Commun>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Common>');
    regex = /<Chiffres/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Digits');
    regex = /Chiffres>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Digits>');
    regex = /<Lettres/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Letters');
    regex = /Lettres>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Letters>');
    regex = /<ToucheImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<ImageButton');
    regex = /ToucheImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ImageButton>');
    regex = /<AnnulationImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<CancelImg');
    regex = /AnnulationImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'CancelImg>');
    regex = /<CorrectionImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<BackImg');
    regex = /CorrectionImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BackImg>');
    regex = /<ValidationImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<OKImg');
    regex = /ValidationImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'OKImg>');
    regex = /<BasculeImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<ToggleImg');
    regex = /BasculeImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ToggleImg>');
    regex = /<SautLigneImg/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<LineFeedImg');
    regex = /SautLigneImg>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'LineFeedImg>');
    regex = /<Ecran/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Screen');
    regex = /Ecran>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Screen>');
    regex = /<langue/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<language');
    regex = /langue>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'language>');

    regex = /<Dynamique/g; // Règles
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Dynamic');
    regex = /Dynamique>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Dynamic>');
    regex = /<Priorite/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Priority');
    regex = /Priorite>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Priority>');
    regex = /<Simultane/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<Simultaneous');
    regex = /Simultane>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Simultaneous>');

    // Attribute names
    regex = /Nom=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Name=');
    // CAUTION: don't change the button order. Long words must be translate before short ones.
    // If not BoutonImageClignotant will be translate by ImageButtonClignotant
    regex = /LabelColonne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextX=');
    regex = /LabelLigne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextY=');
    regex = /LibelleColonne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextX=');
    regex = /LibelleLigne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextY=');
    regex = /Colonne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'X=');
    regex = /Ligne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Y=');
    // CAUTION: don't change the button order. Long words must be translate before short ones.
    // If not BoutonImageClignotant will be translate by ImageButtonClignotant
    regex = /NbColonnesVisibles=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'VisibleColumnsCount=',
    );
    regex = /NbLignesVisibles=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'VisibleRowsCount=');
    regex = /LibelleNbColonnes=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextWidth=');
    regex = /LibelleNbLignes=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextHeight=');
    regex = /NbColonnesItem=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ItemWidth=');
    regex = /NbLignesItem=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ItemHeight=');
    regex = /NbColonnes=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Width=');
    regex = /NbLignes=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Height=');
    regex = /Alignement=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Alignment=');
    regex = /AlignementV=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'VAlignment=');
    regex = /SautLigne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'LineFeed=');
    regex = /Libelle=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Text=');
    regex = /PageParPage=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PageByPage=');
    regex = /Police=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Font=');
    regex = /CouleurTexte=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TextColor=');
    regex = /CouleurFond=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BackgroundColor=');
    regex = /PasVScroll=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'StepVScroll=');
    regex = /PasHScroll=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'StepHScroll=');
    regex = /FichierAlerte=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'FileAlert=');
    regex = /FichierAlt=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'FileAlternative=');
    regex = /FichierDisc=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'FileDiscontinuous=');
    regex = /FichierGris=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'FileDisabled=');
    // Special func for FicherX=
    sXMLDataTranslate = translateAllXFiles(sXMLDataTranslate);
    regex = /Duree=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Duration=');
    regex = /Dynamique=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Dynamic=');
    regex = /IdxImage=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ImageIdx=');
    regex = /IdxSon=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'SoundIdx=');
    regex = /Lettres=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Letters=');
    regex = /LargeurScrollbar=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ScrollbarWidth=');
    regex = /PosBoutons="droite"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ButtonsPos="right"');
    regex = /PosBoutons="gauche"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ButtonsPos="left"');
    regex = /PosBoutons=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ButtonsPos=');
    regex = /NomApp=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'AppName=');
    regex = /ClicGlobal=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'GlobalClick=');
    regex = /Valeur=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value=');
    regex = /ValMin=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'MinValue=');
    regex = /ValMax=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'MaxValue=');
    regex = /ValCentre=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'CenterValue=');
    regex = /HauteurNeutre=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'CenterValue=');
    regex = /ValNeutreMin=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'MinNeutralValue=');
    regex = /ValNeutreMax=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'MaxNeutralValue=');
    regex = /BgImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BackgroundImg=');
    regex = /NeutreImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'NeutralImg=');
    regex = /FgImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ForegroundImg=');

    regex = /Limite=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Limit=');
    regex = /Multiligne=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Multiline=');
    regex = /Touche=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Key=');
    regex = /Validation=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'OK=');
    regex = /Annulation=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Cancel=');
    regex = /Correction=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Back=');
    regex = /Bascule=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Toggle=');
    regex = /ValidationImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'OKImg=');
    regex = /AnnulationImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'CancelImg=');
    regex = /CorrectionImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BackImg=');
    regex = /SautLigneImg=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'LineFeedImg');
    regex = /Modele=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Model=');
    regex = /BarreOnglets=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TabBar=');
    regex = /IdxOnglet=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TabIdx=');
    regex = /Bouchon=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Filler=');
    regex = /DynamiquementVisible=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'DynamicallyVisible=');
    regex = /fichierFond=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'BackgroundFile=');
    regex = /fichierSonTest=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'TestSoundFile=');
    regex = /fichier_regles=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'rule_file=');
    regex = /Fichier=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'File=');
    regex = /fullScreen=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Fullscreen=');
    regex = /hauteurQuadrillage=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'GridHeight=');
    regex = /largeurQuadrillage=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'GridWidth=');
    regex = /LargeurPx=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PxWidth=');
    regex = /HauteurPx=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PxHeight=');
    regex = /resolutionX=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ResolutionWidth=');
    regex = /resolutionY=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ResolutionHeight=');
    regex = /Cle=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Key=');
    regex = /NbItemsVisibles=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'VisibleItemsCount=');
    regex = /connectperiod=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Connectperiod=');
    regex = /ip=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Ip=');
    regex = /port=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Port=');
    regex = /LargeurPx=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PxWidth=');
    regex = /HauteurPx=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PxHeight=');
    regex = /Luminosite=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Brightness=');

    regex = /LargeurScrollbar=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ScrollbarWidth=');
    regex = /Permanent=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Persistent=');
    regex = /PreCree=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'PreBuilt=');
    regex = /curseur=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'cursor=');
    regex = /editeur=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'editor=');
    regex = /IdMultilingue=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'MultilingualId=');
    regex = /sae=/g; // MineoConfig
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'api_type=');
    regex = /lot_arret=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'stopped_fragment=');
    regex = /lot_deconnexion=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'disconnected_fragment=',
    );
    regex = /lot_onglet_actif=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'active_tab_fragment=',
    );
    regex = /lot_onglet_inactif=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'inactive_tab_fragment=',
    );
    regex = /attente_premier_msg_vie=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'first_alive_msg_waiting_time=',
    );
    regex = /attente_msg_vie=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'alive_msg_waiting_time=',
    );
    regex = /periode_polling=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'polling_period=');
    regex = /fichier=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'file=');
    regex = /TimerLancementMineo_s=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'MineoLaunchTimer_s=');

    // Values of the attributes
    // Always put the value translations after the attribute translations
    regex = /VAlignment="centre"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'VAlignment="middle"');
    regex = /VAlignment="haut"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'VAlignment="top"');
    regex = /VAlignment="bas"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'VAlignment="bottom"');
    regex = /Alignment="centre"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Alignment="center"');
    regex = /Alignment="droite"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Alignment="right"');
    regex = /Alignment="gauche"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Alignment="left"');
    regex = /Alignment="justifie"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'Alignment="justified"',
    );
    regex = /ImageIdx="alerte"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ImageIdx="alert"');
    regex = /ImageIdx="clign"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ImageIdx="blink"');
    regex = /ImageIdx="gris"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'ImageIdx="disabled"');
    regex = /Type="curseur"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Type="cursor"');
    regex = /Type="barre"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Type="bar"');
    regex = /SoundIdx="son/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'SoundIdx="sound');
    regex = /Persistent="Oui"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Persistent="Yes"');
    regex = /mode="onglet"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'mode="tab"');
    regex = /type="PttDistant"/g; // MineoConfig
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'type="DistantPtt"');
    regex = /type="PttLocal"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'type="LocalPtt"');
    regex = /api_type="Navineo"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'api_type="NavineoRx"',
    );
    regex = /api_type="Produit"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'api_type="NavineoVx"',
    );
    regex = /api_type="Standard"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      'api_type="NavineoRx"',
    );
    regex = /Model="Luminosite"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Model="Brightness"');
  }

  return sXMLDataTranslate;
}

function biDialectInputCommands(sXMLData) {
  // Using a regex to simply indicate the replace is recursive ('/g')
  // Object names
  let sXMLDataTranslate = '';
  if (sXMLData) {
    let regex = /<Vie/g;
    sXMLDataTranslate = sXMLData.replace(regex, '<Alive');
    regex = /<App-Info/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<App-Data');
    regex = /<LotDeconnecte/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      '<DeconnectedFragment',
    );
    regex = /<GetVolume/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<VolumeGet');
    regex = /<SetVolume/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<VolumeSet');
    regex = /<Liste/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, '<List');
    regex = /Liste>/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'List>');

    regex = /Lot=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Fragment=');
    regex = /Nom=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Name=');
    regex = /Attribut=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Attribute=');
    regex = /Valeur=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value=');
    regex = /Liste=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'List=');
    regex = /Cle=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Key=');
    regex = /Libelle=/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Text=');
    regex = /Attribute='Libelle'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='Text'");
    regex = /Attribute='Lettres'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='Letters'");
    regex = /Attribute='Limite'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='Limit'");
    regex = /Attribute='Fichier'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='File'");
    regex = /='Attribute=CouleurTexte'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='TextColor'",
    );
    regex = /='Attribute=CouleurFond'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='BackgroundColor'",
    );
    regex = /Attribute='ValNeutreMin'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='MinNeutralValue'",
    );
    regex = /Attribute='ValNeutreMax'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='MaxNeutralValue'",
    );
    regex = /Attribute='Valeur'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='Value'");
    regex = /Attribute='CouleurFond'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='BackgroundColor'",
    );
    regex = /Attribute='CouleurTexte'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='TextColor'",
    );
    regex = /Attribute='IdxImage'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='ImageIdx'",
    );
    regex = /Attribute='IdxSon'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='SoundIdx'",
    );
    regex = /Attribute='son/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='sound");
    regex = /Attribute='Police'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Attribute='Font'");
    regex = /Attribute='IdMultilingue'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='MultilingualId'",
    );
    regex = /Attribute='Alignement'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='Alignment'",
    );
    if (sXMLDataTranslate.includes("Attribute='Alignment'")) {
      regex = /Value='centre'/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Value='center'");
      regex = /Value="droite"/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="right"');
      regex = /Value="gauche"/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="left"');
      regex = /Value="justifie"/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="justified"');
    }
    regex = /Attribute='AlignementV'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='VAlignment'",
    );
    if (sXMLDataTranslate.includes("Attribute='VAlignment'")) {
      regex = /Value="centre"/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="middle"');
      regex = /Value="haut"/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="top"');
      regex = /Value="bas"/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="bottom"');
    }
    regex = /Value='gris'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, "Value='disabled'");
    regex = /Attribute='IdxSon'/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(
      regex,
      "Attribute='SoundIdx'",
    );
    if (sXMLDataTranslate.includes("Attribute='SoundIdx'")) {
      regex = /Value="Son/g;
      sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'Value="Sound');
    }
  }

  return sXMLDataTranslate;
}

function manageDeprecated(sXMLData) {
  // Using a regex to simply indicate the replace is recursive ('/g')
  // Object names
  let sXMLDataTranslate = '';
  if (sXMLData) {
    let regex = /type="file_buffered"/g;
    sXMLDataTranslate = sXMLData.replace(regex, 'type="file"');
    regex = /type="file_web"/g;
    sXMLDataTranslate = sXMLDataTranslate.replace(regex, 'type="file"');
  }
  return sXMLDataTranslate;
}

function transformDataFromFiles(sXMLData, isDescription) {
  let sXMLDataTranslate = '';
  if (sXMLData) {
    sXMLDataTranslate = removeSpaces(sXMLData);
    sXMLDataTranslate = biDialectInputFiles(sXMLDataTranslate);
    sXMLDataTranslate = manageDeprecated(sXMLDataTranslate);
    if (isDescription) {
      sXMLDataTranslate = languageManager.convertMultilingualIdInDescription(
        sXMLDataTranslate,
      );
    }
  }

  return sXMLDataTranslate;
}

function transformDataFromConfig(sXMLData) {
  return transformDataFromFiles(sXMLData, false);
}

function transformDataFromDescription(sXMLData) {
  return transformDataFromFiles(sXMLData, true);
}

function transformDataFromRules(sXMLData) {
  return transformDataFromFiles(sXMLData, true);
}

function transformCommand(sXMLData) {
  let sXMLDataTranslate = '';
  if (sXMLData) {
    sXMLDataTranslate = removeSpaces(sXMLData);
    sXMLDataTranslate = biDialectInputCommands(sXMLDataTranslate);
    sXMLDataTranslate = fontManager.convertFontInCommand(sXMLDataTranslate);
    sXMLDataTranslate = languageManager.convertIMultilingualIdInCommand(
      sXMLDataTranslate,
    );
    // sXMLDataTranslate = manageDeprecated(sXMLDataTranslate);
  }

  return sXMLDataTranslate;
}

function whatDialectIs(sXMLData) {
  let dialect = DIAG_EN;
  if (
    sXMLData.includes('<Vie') ||
    sXMLData.includes('<App-Info') ||
    sXMLData.includes('<LotDeconnecte') ||
    sXMLData.includes('<GetVolume') ||
    sXMLData.includes('<SetVolume') ||
    sXMLData.includes('<Liste') ||
    sXMLData.includes('</Liste') ||
    sXMLData.includes('Lot=') ||
    sXMLData.includes('Nom=') ||
    sXMLData.includes('Attribut=') ||
    sXMLData.includes('Valeur=') ||
    sXMLData.includes('Liste=') ||
    sXMLData.includes('Cle=') ||
    sXMLData.includes('Libelle=') ||
    sXMLData.includes("='Libelle'") ||
    sXMLData.includes("='Valeur'")
  ) {
    dialect = DIAG_FR;
  }
  return dialect;
}

module.exports.removeSpaces = removeSpaces;
module.exports.transformDataFromConfig = transformDataFromConfig;
module.exports.transformDataFromDescription = transformDataFromDescription;
module.exports.transformDataFromRules = transformDataFromRules;
module.exports.transformCommand = transformCommand;
module.exports.whatDialectIs = whatDialectIs;
