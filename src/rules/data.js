const rulesCfg = [
  {
    id: 'Navineo',
    file: './cfg/regles_rx.xml',
    path: '',
    pattern: '',
    extention: '',
  },
];

const xmlDataTranslated = `<?xml version="1.0" encoding="utf-8"?>
<Dynamic version="10.11">
   <!-- L'ensemble des lots présentés ci-dessous peuvent s'afficher simultanément dans l'IHM -->
   <Simultaneous>
      <Fragment Name="ZhHeure"/>
      <Priority>
         <Fragment Name="ZhGsRvDSO"/>
         <Fragment Name="ZhGsRvAvanceRetardEncadrants"/>
         <Fragment Name="ZhGsRvAvanceRetard"/>
      </Priority>

      <Fragment Name="ZpRappelAlarme"/>
      <Fragment Name="ZpRappelMessageConducteur"/>
      <Fragment Name="ZpRappelInformationVoyageurs"/>

      <Fragment Name="ZsRappelAbsenceLiaisonPCC"/>
      <Fragment Name="ZsRappelModeAutonome"/>
      <Fragment Name="ZsRappelDefautLiaisonPupitreGirouette"/>
      <Fragment Name="ZsRappelIVVInhibe"/>
      <Fragment Name="ZsRappelDefautMaterielLocalisation"/>
      <Fragment Name="ZsRappelDefautLiaisonPostePhonie"/>
      <Fragment Name="ZsRappelAvRetAlternatif"/>

      <Fragment Name="ZrSignalementConducteur"/>
      <Fragment Name="ZrMessageVoyageurs"/>

      <!--
         ZrInitMaintenance se superpose à ZrMaintenance en mise en service.
         ZrReglagePhonie se superpose au bouton de maintenance en cas d'appel entrant.
       -->
      <Priority>
         <Fragment Name="ZrReglagePhonie"/>
         <Fragment Name="ZrInitMaintenance"/>
         <Fragment Name="ZrMaintenance"/>
      </Priority>

      <Fragment Name="ZrDemandeIntervention"/>
      <Fragment Name="ZrDemandeInterventionAttAcq"/>

      <Fragment Name="PhonieAppelNormal"/>
      <Fragment Name="PhonieAppelNormalAttAcq"/>
      <Fragment Name="PhonieAppelNormalAttCom"/>
      <Fragment Name="PhonieAppelUrgent"/>
      <Fragment Name="PhonieAppelUrgentAttAcq"/>
      <Fragment Name="PhonieAppelUrgentAttCom"/>
   </Simultaneous>

<!--=================================================================================
Les écrans listés ci-dessous sont classés par ordre de priorité.
Du plus prioritaire (celui tout en haut) au moins prioritaire (celui tout en bas).
==================================================================================-->
   <Priority>
      <!-- Mise à jour des codes girouette - priorité supérieure à MiseAJourEnCours pour s'afficher par-dessus -->
      <Fragment Name="MaintEquipementsGirouetteInfo"/>

      <!-- Redémarrage/Arrêt -->
      <Fragment Name="MiseAJourEnCours"/>
      <Fragment Name="DiversMiseHorsTension"/>
      <Fragment Name="DiversRedemarrageEnCours"/>

      <!-- Probleme rencontré -->
      <Fragment Name="DiversProblemeRencontre"/>

      <!-- Fonction non implémentée -->
      <Fragment Name="DiversNonImplemente"/>

      <!-- Initialisation ou Mise en service, puis écran de Démarrage masquant l'init des autres modules (d'où la priorité si importante) -->
      <Fragment Name="InitSaisieCodeErrone"/>
      <Fragment Name="InitSaisieCode"/>
      <Fragment Name="InitDemandeRecommencer"/>
      <Fragment Name="InitProblemeConducteur"/>
      <Fragment Name="InitSaisieNumParcInconnu"/>
      <Fragment Name="InitSaisieNumParc"/>
      <Fragment Name="InitConfigCapteursLocDR"/>
      <Fragment Name="InitConfigCapteursLocSaisieVrefOdo"/>
      <Fragment Name="InitConfigCapteursLocOdo"/>
      <Fragment Name="InitConfigCapteursLoc"/>
      <Fragment Name="InitPolarite"/>
      <Fragment Name="InitSelectionCE"/>
      <Fragment Name="InitErreurDonnees"/>
      <Fragment Name="InitDemandeDonnees"/>
      <Fragment Name="InitDemandeHeure"/>
      <Fragment Name="InitProgression"/>

      <!-- Phonie -->
      <Fragment Name="PhonieAppelEntrant"/>
      <Fragment Name="PhonieConfirmeDmdAppel"/>

      <!-- Messageries -->
      <Fragment Name="MsgCondAucunMsg"/>
      <Fragment Name="MsgCondConsultationDetaillee"/>
      <Fragment Name="MsgCondActivation"/>
      <Fragment Name="MsgCondConsultation"/>

      <!-- Information voyageurs -->
      <Fragment Name="MsgIvvConsultationVide"/>
      <Fragment Name="MsgIvvConsultationDetail"/>
      <Fragment Name="MsgIvvConsultation"/>
      <Fragment Name="MsgIvvDiffusion"/>
      <Fragment Name="MsgIvvChoixMnemo"/>
      <Fragment Name="MsgIvvChoixType"/>
      <Fragment Name="CorrespIvvConsultationVide"/>
      <Fragment Name="CorrespIvvConsultation"/>

      <!-- Signalements -->
      <Fragment Name="SigReponseNegative"/>
      <Fragment Name="SigReponsePositive"/>
      <Fragment Name="SigAttenteReponse"/>
      <Fragment Name="SigChoixEtEnvoi"/>
      <Fragment Name="SigAccueil"/>

      <!-- Maintenance - MdP -->
      <Fragment Name="MaintSaisieCodeErrone"/>
      <Fragment Name="MaintSaisieCode"/>

      <!-- Maintenance - Mise à jour -->
      <Fragment Name="MaintMiseAJourLivraisonTestConfirmRedemarrage"/>
      <Fragment Name="MaintMiseAJourDesactivationLivraisonTest"/>
      <Fragment Name="MaintMiseAJourSaisieLivraisonTest"/>
      <Fragment Name="MaintMiseAJourEchecSynchroFtp"/>
      <Fragment Name="MaintMiseAJourEchecSynchroUsb"/>
      <Fragment Name="MaintMiseAJourResultatSynchro"/>
      <Fragment Name="MaintMiseAJourSynchroEnCours"/>
      <Fragment Name="MaintMiseAJourSynchroFtp"/>
      <Fragment Name="MaintMiseAJourSynchroUsb"/>

      <!-- Maintenance - Mise au point -->
      <Fragment Name="MaintMiseAuPointPrioriteFeuxSelectionApproche"/>
      <Fragment Name="MaintMiseAuPointPrioriteFeuxSaisie"/>
      <Fragment Name="MaintMiseAuPointPrioriteFeux"/>
      <Fragment Name="MaintMiseAuPointEnregistrementRejeuEchec"/>
      <Fragment Name="MaintMiseAuPointEnregistrementRejeu"/>
      <Fragment Name="MaintMiseAuPointDechargementEchec"/>
      <Fragment Name="MaintMiseAuPointDechargementEnCours"/>
      <Fragment Name="MaintMiseAuPointDechargementTracesRapport"/>
      <Fragment Name="MaintMiseAuPointValidationArretRedemarrage"/>
      <Fragment Name="MaintMiseAuPointArretRedemarrage"/>

      <!-- Maintenance - Localisation -->
      <Fragment Name="MaintLocalisationGyrometre"/>
      <Fragment Name="MaintLocalisationOdometre"/>
      <Fragment Name="MaintLocalisationGPS"/>

      <!-- Maintenance - Test Communication -->
      <Fragment Name="MaintTestCommunicationVolumeTransfertDonneesDetail"/>
      <Fragment Name="MaintTestCommunicationListeVolumeTransfertDonnees"/>
      <Fragment Name="MaintTestCommunicationEtatEthernet"/>
      <Fragment Name="MaintTestCommunicationProbleme"/>
      <Fragment Name="MaintTestCommunicationEmissionEcho"/>
      <Fragment Name="MaintTestCommunicationResultatConnexionFTP"/>
      <Fragment Name="MaintTestCommunicationTestEncours"/>
      <Fragment Name="MaintTestCommunicationPhonieGsmModificationNum"/>
      <Fragment Name="MaintTestCommunicationPhonieGsm"/>
      <Fragment Name="MaintTestCommunicationTestMediaParametres"/>
      <Fragment Name="MaintTestCommunicationTestMediaCommun"/>

      <!-- Maintenance - Equipements -->
      <Fragment Name="MaintEquipementsJournalAlarmes"/>
      <Fragment Name="MaintEquipementsTestTFT"/>
      <Fragment Name="MaintEquipementsTestBlueChips"/>
      <Fragment Name="MaintEquipementsTestSivExterne"/>
      <Fragment Name="MaintEquipementsInhibitionIvv"/>
      <Fragment Name="MaintEquipementsBillettique"/>
      <Fragment Name="MaintEquipementsVideoSurveillance"/>
      <Fragment Name="MaintEquipementsGirouetteSaisieCode"/>
      <Fragment Name="MaintEquipementsGirouette"/>
      <Fragment Name="MaintEquipementsBLProbleme"/>
      <Fragment Name="MaintEquipementsBLEnCours"/>
      <Fragment Name="MaintEquipementsBL"/>
      <Fragment Name="MaintEquipementsTestsUsineLS"/>
      <Fragment Name="MaintEquipementsBusFms"/>
      <Fragment Name="MaintEquipementsComptagePassagersGlobal"/>
      <Fragment Name="MaintEquipementsComptagePassagersCellules"/>
      <Fragment Name="MaintEquipementsLecteurEtiq"/>
      <Fragment Name="MaintEquipementsNonPresent"/>

      <!-- Maintenance - Consultation de la configuration -->
      <Fragment Name="MaintConsultationConfElementsVersionnes"/>
      <Fragment Name="MaintConsultationConfVersionsUtilisees"/>
      <Fragment Name="MaintConsultationConfCaracVehicule"/>
      <Fragment Name="MaintConsultationConfOccupationDisque"/>

      <!-- Maintenance - Audio SCAPIN -->
      <Fragment Name="MaintAudioScapinTestsEnCours"/>
      <Fragment Name="MaintAudioScapinTests"/>

      <!-- Maintenance - Reglage Gains Audio -->
      <Fragment Name="MaintReglageGainsAudioCAVAttenteMesure"/>
      <Fragment Name="MaintReglageGainsAudioCAVMesureSr"/>
      <Fragment Name="MaintReglageGainsAudioCAVSaisieSr"/>
      <Fragment Name="MaintReglageGainsAudioCAVParametresDetail"/>
      <Fragment Name="MaintReglageGainsAudioCAVParametres"/>
      <Fragment Name="MaintReglageGainsAudioTestsEnCours"/>
      <Fragment Name="MaintReglageGainsAudioTests"/>
      <Fragment Name="MaintReglageGainsAudioSaisie"/>
      <Fragment Name="MaintReglageGainsAudioVolumesSortie"/>
      <Fragment Name="MaintReglageGainsAudioEquilibrageEntreesSyntheseSonore"/>
      <Fragment Name="MaintReglageGainsAudioSensibilitesEntrees"/>

      <!-- Maintenance - Mise en Service -->
      <Fragment Name="MaintMiseEnServiceConfigCapteursLoc"/>
      <Fragment Name="MaintMiseEnServiceNumParcInconnu"/>
      <Fragment Name="MaintMiseEnServiceNumParcAucuneCaract"/>
      <Fragment Name="MaintMiseEnServiceNumParcCaracteristiques"/>
      <Fragment Name="MaintMiseEnServiceSaisieNumParc"/>
      <Fragment Name="MaintMiseEnServiceNumParc"/>
      <Fragment Name="MaintMiseEnServiceDemontageCalcFin"/>
      <Fragment Name="MaintMiseEnServiceDemontageCalcEchec"/>
      <Fragment Name="MaintMiseEnServiceDemontageCalcAttenteFin"/>
      <Fragment Name="MaintMiseEnServiceDemontageCalcAttenteUsb"/>
      <Fragment Name="MaintMiseEnServiceDemontageCalc"/>
      <Fragment Name="MaintMiseEnServicePolarite"/>
      <Fragment Name="MaintMiseEnServiceMiseAHeure"/>

      <!-- Maintenance - Tests Guides -->
      <Fragment Name="MaintTestsGuidesRapport"/>
      <Fragment Name="MaintTestsGuidesSaisieInfo"/>
      <Fragment Name="MaintTestsGuidesEtat"/>

      <!-- Maintenance - Sous Menu -->
      <Fragment Name="MaintSousMenuMiseEnService"/>
      <Fragment Name="MaintSousMenuReglageGainsAudio"/>
      <Fragment Name="MaintSousMenuAudioScapin"/>
      <Fragment Name="MaintSousMenuConsultationConf"/>
      <Fragment Name="MaintSousMenuEquipements"/>
      <Fragment Name="MaintSousMenuTestCommunication"/>
      <Fragment Name="MaintSousMenuTestCommunicationReduit"/>
      <Fragment Name="MaintSousMenuLocalisation"/>
      <Fragment Name="MaintSousMenuMiseAuPoint"/>
      <Fragment Name="MaintSousMenuMiseAJour"/>

      <!-- Maintenance - Menu -->
      <Fragment Name="MaintMenuHorsVoitureVLTL"/>
      <Fragment Name="MaintMenuVCVLParcours"/>

      <!-- Réglages conducteur -->
      <Fragment Name="ReglagesConducteurPhonie"/>
      <Fragment Name="ReglagesConducteurPupitre"/>
      <Fragment Name="ReglagesConducteurMenu"/>

      <!-- GsRv - Divers lots prioritaires -->
      <Fragment Name="GsRvDefautElementVersionne"/>
      <Fragment Name="GsRvServiceDejaEnCours"/>
      <Fragment Name="GsRvAvanceRetardErreur"/>

      <!-- Pds - Priorité supérieure à GsRv -->
      <Fragment Name="PdsRefusee"/>
      <Fragment Name="PdsLiaisonPCKo"/>
      <Fragment Name="PdsConfirmation"/>

      <!-- Releve/Remplacement -->
      <Fragment Name="ReleveErreur"/>
      <Fragment Name="ReleveErrHabilitation"/>
      <Fragment Name="ReleveErrInconnu"/>
      <Fragment Name="ReleveErrMotDePasse"/>
      <Fragment Name="ReleveSaisieMotPasse"/>
      <Fragment Name="ReleveSaisieMatricule"/>
      <Fragment Name="ReleveInviteIdentificationLiaisonBillOk"/>
      <Fragment Name="ReleveInviteIdentificationLiaisonBillKo"/>
      <Fragment Name="ReleveInviteDesidentificationLiaisonBillOk"/>
      <Fragment Name="ReleveInviteDesidentificationLiaisonBillKo"/>

      <!-- Regul -->
      <Fragment Name="GsRvConsultationManoeuvreRegulationDetail"/>
      <Fragment Name="GsRvConsultationManoeuvreRegulation"/>

      <!-- Alarme -->
      <Fragment Name="AlarmeSignalisation"/>
      <Fragment Name="AlarmeListeVide"/>
      <Fragment Name="GsRvConsultationAlarmes"/>

      <!-- Releve/Remplacement via Menu -->
      <Fragment Name="ReleveMenuDesidentificationLiaisonBillOk"/>
      <Fragment Name="ReleveMenuDesidentificationLiaisonBillKo"/>

      <!-- Consigne concernant les croisements -->
      <Fragment Name="SuiviCroisement"/>

      <!-- Evenements de course -->
      <Fragment Name="SuiviEvenementCourseReleve"/>
      <Fragment Name="SuiviEvenementCourseCorrespRegul"/>
      <Fragment Name="SuiviEvenementPresentationDeviation"/>
      <Fragment Name="SuiviEvenementSuppressionDeviation"/>
      <Fragment Name="SuiviEvenementCourseReleveDeviee"/>
      <Fragment Name="SuiviEvenementCourseChangementService"/>
      <Fragment Name="SuiviEvenementCourseRegulationListe"/>

      <!-- GsRv - Comptage Passagers -->
      <Simultaneous>
         <Fragment Name="GsRvSaisieComptagePassagersMontees"/>
         <Fragment Name="GsRvSaisieComptagePassagersDescentes"/>
      </Simultaneous>

      <!-- GsRv - Fin de service -->
      <Fragment Name="GsRvFinService"/>

      <!-- GsRv - Interruption de parcours -->
      <Fragment Name="GsRvInterruptionParcoursErreur"/>
      <Fragment Name="GsRvInterruptionParcours"/>

      <!-- GsRv - Choix de la course courante -->
      <Fragment Name="GsRvSelectionCourseErreur"/>
      <Fragment Name="GsRvSelectionCourse"/>

      <!-- GsRv - Gestion de service -->
      <Fragment Name="GsRvMenuGestionService"/>

      <!-- GsRv - Consultation Encadrants -->
      <Fragment Name="GsRvConsultationEncadrantsComPc"/>
      <Fragment Name="GsRvConsultationEncadrantsErreur"/>
      <Fragment Name="GsRvConsultationEncadrants"/>

      <!-- GsRv - Consultation Connexions -->
      <Fragment Name="GsRvConsultationConnexions"/>

      <!-- GsRv - Consultation Relèves -->
      <Fragment Name="GsRvConsultationProchaineReleve"/>

      <!-- GsRv - Consultation Correspondance régulée -->
      <Fragment Name="GsRvConsultationCorrespondanceRegulee"/>
      <Fragment Name="GsRvConsultationCorrespondanceReguleeAucune"/>

      <!-- GsRv - Consultation Déviations -->
      <Fragment Name="GsRvConsultationDeviationsAucune"/>
      <Fragment Name="GsRvConsultationDeviationsDetail"/>
      <Fragment Name="GsRvConsultationDeviations"/>

      <!-- GsRv - Consultations -->
      <Fragment Name="GsRvConsultationVCErreur"/>
      <Fragment Name="GsRvConsultationCourseCourante"/>
      <Fragment Name="GsRvConsultationVCDetail"/>
      <Fragment Name="GsRvConsultationVC"/>

      <!-- GsRv - Menu-->
      <Fragment Name="GsRvMenuInformationVoyageurs"/>
      <Fragment Name="GsRvMenuConsultService"/>
      <Fragment Name="GsRvMenuMessagerie"/>
      <Fragment Name="GsRvMenuConducteur"/>
      <Fragment Name="GsRvMenuConducteurHorsVoiture"/>

      <!-- Suivi -->
      <Fragment Name="SuiviAttenteAcqGsFde"/>
      <Fragment Name="SuiviAttenteReleve"/>

      <!-- GsRv : Suivi en cours de réalisation -->
      <Fragment Name="GsRvInfosParcoursDetail"/>

      <Simultaneous>
         <Priority>
            <Fragment Name="GsRvDSOEnRetard"/>
            <Fragment Name="GsRvDSODepartImmediat"/>
            <Fragment Name="GsRvDSOEnAvance"/>
            <Fragment Name="GsRvAvanceRetard"/>
            <Fragment Name="GsRvAvanceRetardBgEncadrants"/>
            <Fragment Name="GsRvAvanceRetardBgEncadrantsInconnu"/>
            <Fragment Name="GsRvAvanceRetardVide"/>
         </Priority>

         <Priority>
            <Fragment Name="GsRvCartographie" PreBuilt="1"/>
            <Fragment Name="GsRvSynoptique" PreBuilt="1"/>
         </Priority>

         <Fragment Name="GsRvInfosParcoursCourse" PreBuilt="1"/>
         <!-- GsRv - Comptage Passagers -->
         <Fragment Name="GsRvInfosComptagePassagersUp" PreBuilt="1"/>
         <Fragment Name="GsRvInfosComptagePassagersUpDown" PreBuilt="1"/>
      </Simultaneous>

      <!-- Pds -->
      <Fragment Name="PdsEcranAccueilVehiculeNonSae"/>
      <Fragment Name="PdsAttenteReponsePC"/>
      <Fragment Name="PdsAttenteValidation"/>
      <Fragment Name="PdsSaisieParcours" PreBuilt="1"/>
      <Fragment Name="PdsSaisieService" PreBuilt="1"/>
      <Fragment Name="PdsChoixParcours" PreBuilt="1"/>
      <Fragment Name="PdsChoixLigne" PreBuilt="1"/>

      <!-- Agent -->
      <Fragment Name="AgentErrHabilitation"/>
      <Fragment Name="AgentErrInconnu"/>
      <Fragment Name="AgentErrMotDePasse"/>
      <Fragment Name="AgentSaisieMotPasse" PreBuilt="1"/>
      <Fragment Name="AgentSaisieMatricule" PreBuilt="1"/>

      <!-- Divers - Probleme affiché sur l'écran d'accueil -->
      <Fragment Name="DiversProblemeAccueil"/>

      <!-- Pds - Accueil -->
      <Fragment Name="PdsEcranAccueilBillettiqueServiceEnCours" PreBuilt="1"/>
      <Fragment Name="PdsEcranAccueil" PreBuilt="1"/>

      <Fragment Name="LotTestMultilingue"/>
      <!-- Navineo non connecté -->
      <Fragment Name="NavineoDeconnecte"/>
      <Fragment Name="NavineoArret"/>

<!--=================================================================================
      Anciens lots
==================================================================================-->
   <!--Lot Name="MaintPeripheriques" /-->
   </Priority>
</Dynamic>`;

const xmlDataTranslated__ = `<?xml version="1.0" encoding="utf-8"?>
<Dynamic version="10.11">
    <Simultaneous>
      <Fragment Name="ZhHeure"/>
      <Priority>
         <Fragment Name="ZhGsRvDSO"/>
         <Fragment Name="ZhGsRvAvanceRetardEncadrants"/>
         <Fragment Name="ZhGsRvAvanceRetard"/>
      </Priority>


      <Priority>
         <Fragment Name="ZrInitMaintenance"/>
         <Fragment Name="ZrMaintenance"/>
      </Priority>

      <Fragment Name="PhonieAppelUrgentAttCom"/>
   </Simultaneous>
   <Priority>
      <!-- Redémarrage/Arrêt -->
      <Fragment Name="MiseAJourEnCours"/>
      <Fragment Name="DiversMiseHorsTension"/>

      <Simultaneous>
        <Fragment Name="test"/>

         <Priority>
            <Fragment Name="GsRvCartographie" PreBuilt="1"/>
            <Fragment Name="GsRvSynoptique" PreBuilt="1"/>
         </Priority>

         <!-- GsRv - Comptage Passagers -->
         <Fragment Name="GsRvInfosComptagePassagersUp" PreBuilt="1"/>
         <Fragment Name="GsRvInfosComptagePassagersUpDown" PreBuilt="1"/>
      </Simultaneous>

      <!-- Navineo non connecté -->
      <Fragment Name="NavineoDeconnecte"/>
      <Fragment Name="NavineoArret"/>
   </Priority>
</Dynamic>`;

const xmlDataTranslated1 = `<?xml version="1.0" encoding="utf-8"?>
<Dynamic version="10.11">
    <Simultaneous>
      <Fragment Name="ZhHeure"/>
      <Priority>
         <Fragment Name="ZhGsRvDSO"/>
         <Fragment Name="ZhGsRvAvanceRetardEncadrants"/>
         <Fragment Name="ZhGsRvAvanceRetard"/>
      </Priority>

      <Priority>
         <Fragment Name="ZrInitMaintenance"/>
         <Fragment Name="ZrMaintenance"/>
      </Priority>

      <Fragment Name="PhonieAppelUrgentAttCom"/>
   </Simultaneous>
   <Priority>
      <!-- Redémarrage/Arrêt -->
      <Fragment Name="MiseAJourEnCours"/>
      <Fragment Name="DiversMiseHorsTension"/>

      <Simultaneous>
        <Fragment Name="test"/>

         <Priority>
            <Fragment Name="A" PreBuilt="1"/>
            <Fragment Name="B" PreBuilt="1"/>
         </Priority>
         <Priority>
            <Fragment Name="GsRvCartographie" PreBuilt="1"/>
            <Fragment Name="GsRvSynoptique" PreBuilt="1"/>
         </Priority>

         <!-- GsRv - Comptage Passagers -->
         <Fragment Name="GsRvInfosComptagePassagersUp" PreBuilt="1"/>
         <Fragment Name="GsRvInfosComptagePassagersUpDown" PreBuilt="1"/>
      </Simultaneous>

      <!-- Navineo non connecté -->
      <Fragment Name="NavineoDeconnecte"/>
      <Fragment Name="NavineoArret"/>
   </Priority>
</Dynamic>`;
const xmlDataTranslated_Double_simu = `<?xml version="1.0" encoding="utf-8"?>
<Dynamic version="10.11">
   <Priority>
      <!-- Redémarrage/Arrêt -->
      <Fragment Name="A"/>
      <Fragment Name="B"/>

      <Simultaneous>
        <Fragment Name="C"/>

         <Priority>
            <Fragment Name="D" PreBuilt="1"/>
            <Fragment Name="E" PreBuilt="1"/>
         </Priority>
         <Priority>
            <Fragment Name="F" PreBuilt="1"/>
            <Fragment Name="G" PreBuilt="1"/>
            <Fragment Name="G1" PreBuilt="1"/>
         </Priority>

         <!-- GsRv - Comptage Passagers -->
         <Fragment Name="H" PreBuilt="1"/>
         <Fragment Name="I" PreBuilt="1"/>
      </Simultaneous>
      <Simultaneous>
        <Fragment Name="Z"/>
        <Fragment Name="W"/>
      </Simultaneous>


      <!-- Navineo non connecté -->
      <Fragment Name="J"/>
      <Fragment Name="K"/>
   </Priority>
</Dynamic>`;
const xmlDataTranslated98 = `<?xml version="1.0" encoding="utf-8"?>
<Dynamic version="10.11">
  <Simultaneous>
    <Fragment Name="Z"/>
    <Fragment Name="W"/>
  </Simultaneous>
   <Priority>
      <!-- Redémarrage/Arrêt -->
      <Fragment Name="A"/>
      <Fragment Name="B"/>

      <Simultaneous>
        <Fragment Name="C"/>

         <Priority>
            <Fragment Name="D" PreBuilt="1"/>
            <Fragment Name="E" PreBuilt="1"/>
         </Priority>
         <Priority>
            <Fragment Name="F" PreBuilt="1"/>
            <Fragment Name="G" PreBuilt="1"/>
            <Fragment Name="G1" PreBuilt="1"/>
         </Priority>

         <!-- GsRv - Comptage Passagers -->
         <Fragment Name="H" PreBuilt="1"/>
         <Fragment Name="I" PreBuilt="1"/>
      </Simultaneous>

      <!-- Navineo non connecté -->
      <Fragment Name="J"/>
      <Fragment Name="K"/>
   </Priority>
</Dynamic>`;
const xmlDataTranslated00 = `<?xml version="1.0" encoding="utf-8"?>
<Dynamic version="10.11">
  <Simultaneous>
    <Fragment Name="Z"/>
    <Fragment Name="W"/>
  </Simultaneous>
</Dynamic>`;

module.exports.rulesCfg = rulesCfg;
module.exports.xmlDataTranslated = xmlDataTranslated;
