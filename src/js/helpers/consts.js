export const THEME = 'kenney';
export default {
  THEME,
};

export const CATEGORY_SPACE_OBJECTS = 'spaceObjects';
export const CATEGORY_ENTITIES = 'entities';
export const CATEGORY_EFFECTS = 'effects';
export const CATEGORY_PLAYER_START_LOCATION = 'playerStarLocations';
export const CATEGORY_LOCATION = 'locations';

export const PLAYERS_COUNT = 8;

export const ENTITY_TAB_FEDERATION = 'Fed';
export const ENTITY_TAB_ATHRAEL = 'Ath';
export const ENTITY_TAB_SYLON = 'Syl';
export const ENTITY_TAB_THORUN = 'Tho';
export const ENTITY_TAB_ZHOGARN = 'Zho';
export const ENTITY_TAB_MISC = 'Misc';

export const EFFECT_TAB_MISC = 'Misc';

export const EVENT_ON_SELECTOR_SELECT = 'onSelectorSelect';
export const EVENT_ON_SELECTOR_RESET = 'onSelectorReset';
export const EVENT_ENTITY_SELECTION_CANCELED = 'onEntitySelectionCancelled';
export const EVENT_SPACE_OBJECT_SELECTED = 'onSpaceObjectSelected';
export const EVENT_SPACE_OBJECT_SELECTION_CANCELED =
  'onSpaceObjectSelectionCancelled';

export const EVENT_EFFECT_SELECTED = 'onEffectSelected';
export const EVENT_EFFECT_SELECTION_CANCELED = 'onEffectSelectionCancelled';

export const EVENT_LOCATION_SELECTED = 'onLocationSelected';
export const EVENT_LOCATION_SELECTION_CANCELED = 'onLocationSelectionCancelled';

export const PLAYER_MANAGER_COLORS = [
  '0x08A2EA',
  '0x10B308',
  '0xF28209',
  '0xBA10D9',
  '0xD40F0F',
  '0xF8F8F9',
  '0xE5C410',
  '0x65615D',
];

export const ENTITIES = {
  [ENTITY_TAB_FEDERATION]: [
    'hurricane',
    'orca',
    'hailstorm',
    'stgeorge',
    'avenger',
    'avenger2',
    'icarus',
    'engineershuttle',
    'kutuzov',
    'pasteur',
    'dresda',
    'crow',
    'teller',
    'galileo',
    'commandcenter',
    'miningstation',
    'civilianbase',
    'solarstation',
    'shipfactory',
    'dockyard',
    'merchantport',
    'researchcenter',
    'astrometricstation',
    'helium3-reactor',
    'medical-station',
    'fleetheadquarters',
    'deepspacelab',
    'defensesatellite',
    'defenseplatform',
    'fusionreactor',
    'eirainstitute',
    'keikosentrypod',
    'piratebase',
    'eiraresearchstation',
    'bifrostbridge',
    'jumpgate',
    'trinity',
    'khan',
    'piratevessel',
    'bencobler-trinity',
    'bencobler-hailstorm',
    'bencobler-avenger2',
    'sterlingbuckner',
    'victorkomarov',
    'salamonzamor',
    'antonvargas',
    'piratesolarstation',
    'piratesupplysilo',
    'piratestation',
    'piratedefensivesatellite',
    'piratehurricane',
    'pirateorca',
    'piratepiratevessel',
    'piratecargo',
    'cormoran',
    'pinguy',
  ],
  [ENTITY_TAB_ATHRAEL]: [
    'intruder',
    'warpglider',
    'flanker',
    'mothership',
    'invader',
    'explorer',
    'drone',
    'gathering',
    'clairvoyant',
    'lancet',
    'theocrat',
    'lifevessel',
    'rector',
    'rectordeployed',
    'martyrprobe',
    'cryon',
    'centralpyramid',
    'masstransmitter',
    'biosphere',
    'powercore',
    'polaronsphere',
    'obelisk',
    'theocratsseat',
    'synodum',
    'sanctuary',
    'dome',
    'conservatory',
    'martyrium',
    'craftmill',
    'monumentofwill',
    'basilica',
    'shieldgenerator',
    'psyhicdome',
  ],
  [ENTITY_TAB_SYLON]: [
    'spear',
    'twinblade',
    'gloom',
    'eclipse',
    'shade',
    'plasmaraid',
    'hauler',
    'labor',
    'installator',
    'absorber',
    'assimilator',
    'mask',
    'caldron',
    'leechmine',
    'arson',
    'arsondeployed',
    'installationprime',
    'refinery',
    'supportcenter',
    'manufacture',
    'advancedmanufacture',
    'manufactureprime',
    'defensiveserver',
    'offensiveserver',
    'array',
    'conflux',
    'quantumcore',
    'aegis',
    'wormholegenerator',
    'repairstation',
    'supportcomplex',
    'stellarreactor',
    'syluscore',
  ],
  [ENTITY_TAB_THORUN]: [
    'predator',
    'predatordeployed',
    'maraduer',
    'devastator',
    'grinder',
    'vindicator',
    'flagship',
    'harvester',
    'extractor',
    'welder',
    'hunter',
    'corsair',
    'havoc',
    'breaker',
    'vanguard',
    'probe',
    'capitol',
    'materialsilo',
    'habitat',
    'powerplant',
    'energystorage',
    'flagshipyard',
    'hall',
    'guild',
    'forum',
    'skycourt',
    'anvil',
    'consulate',
    'senate',
    'guardstation',
    'provincialbeacon',
    'ioncannon',
    'forge',
  ],
  [ENTITY_TAB_ZHOGARN]: [
    'spawn',
    'guard',
    'venator',
    'mind',
    'overseer',
    'swarmmother',
    'spikeworm',
    'queen',
    'ovum',
    'mindovum',
    'ovumreincarnate',
    'reincarnate',
    'worker',
    'rictus',
    'mite',
    'ruptor',
    'elasmoruptor',
    'decay',
    'alpha',
    'cropbed',
    'nutrientcolony',
    'metabolist',
    'chimneyplant',
    'agaric',
    'pond',
    'mindfungus',
    'clathruscolony',
    'symbioticorgan',
    'evulatory',
    'swarmmembrane',
    'chrysodendron',
    'decaychamber',
    'warren',
    'fonia',
    'seed',
    'helia',
    'birthingpool',
    'behemoth',
    'cradlestone',
  ],
  [ENTITY_TAB_MISC]: [
    'asteroidsilicon1',
    'asteroidsilicon2',
    'asteroidsiliconsmall1',
    'asteroidsiliconsmall2',
    'asteroidtitanium1',
    'asteroidtitanium2',
    'asteroidtitaniumsmall1',
    'asteroidtitaniumsmall2',
    'asteroiduranium1',
    'asteroiduranium2',
    'asteroiduraniumsmall1',
    'asteroiduraniumsmall2',
    'asteroid1',
    'asteroid2',
    'asteroid3',
    'asteroid4',
    'asteroidbig1',
    'asteroidbig2',
    'asteroidgigantic1',
    'asteroidgigantic2',
    'asteroidgigantic3',
    'asteroidgigantic4',
    'asteroidgigantic5',
    'asteroidgigantic6',
    'asteroidgigantic7',
    'asteroidgigantic8',
    'asteroidgigantic9',
    'asteroidgigantic10',
    'asteroidice1',
    'asteroidice2',
    'asteroidicesmall1',
    'asteroidicesmall2',
    'asteroidmagma1',
    'asteroidmagma2',
    'asteroidmagma3',
    'asteroidmagma4',
    'asteroidsmall1',
    'asteroidsmall2',
    'asteroidsmall3',
    'asteroidsmall4',
    'asteroidswarm1',
    'asteroidswarm2',
    'asteroidswarm3',
    'asteroidswarm4',
    'asteroidswarm5',
    'asteroidswarm6',
    'asteroidswarm7',
    'asteroidswarm8',
    'obj_asteroids_ice1',
    'obj_asteroids_ice2',
    'obj_asteroids_ice3',
    'obj_asteroids_ice4',
    'obj_asteroids_ice5',
    'obj_asteroids_ice6',
    'obj_asteroids_ice7',
    'obj_asteroids_ice8',
    'obj_asteroids_ice9',
    'obj_asteroids_ice10',
    'obj_asteroids_ice11',
    'obj_asteroids_ice12',
    'obj_asteroids_ice13',
    'obj_asteroids_ice14',
    'obj_asteroids_ice15',
    'obj_asteroids_ice16',
    'obj_asteroids_ice17',
    'obj_asteroids_ice18',
    'obj_asteroids_ice19',
    'obj_asteroids_ice20',
    'obj_asteroids_normal1',
    'obj_asteroids_normal2',
    'obj_asteroids_normal3',
    'obj_asteroids_normal4',
    'obj_asteroids_normal5',
    'obj_asteroids_normal6',
    'obj_asteroids_normal7',
    'obj_asteroids_normal8',
    'obj_asteroids_normal9',
    'obj_asteroids_normal10',
    'obj_asteroids_normal11',
    'obj_asteroids_normal12',
    'obj_asteroids_normal13',
    'obj_asteroids_normal14',
    'obj_asteroids_normal15',
    'obj_asteroids_normal16',
    'obj_asteroids_normal17',
    'obj_asteroids_normal18',
    'obj_asteroids_normal19',
    'obj_asteroids_normal20',
    'obj_asteroids_normal21',
    'obj_asteroids_normal22',
    'obj_asteroids_vulcanic1',
    'obj_asteroids_vulcanic2',
    'obj_asteroids_vulcanic3',
    'obj_asteroids_vulcanic4',
    'obj_asteroids_vulcanic5',
    'obj_asteroids_vulcanic6',
    'obj_asteroids_vulcanic7',
    'obj_asteroids_vulcanic8',
    'obj_asteroids_vulcanic9',
    'obj_asteroids_vulcanic10',
    'obj_asteroids_vulcanic11',
    'obj_asteroids_vulcanic12',
    'obj_asteroids_vulcanic13',
    'obj_asteroids_vulcanic14',
    'obj_asteroids_vulcanic15',
    'obj_asteroids_vulcanic16',
    'obj_asteroids_vulcanic17',
    'obj_asteroids_vulcanic18',
    'obj_asteroids_vulcanic19',
    'obj_asteroids_vulcanic20',
    'obj_asteroids_vulcanic21',
    'obj_chokypuff1',
    'obj_chokypuff2',
    'obj_chokypuff3',
    'obj_chokypuff4',
    'obj_chokypuff5',
    'obj_chokypuff6',
    'obj_chokypuff7',
    'obj_chokypuff8',
    'obj_chokypuff9',
    'obj_chokypuff10',
    'obj_chokypuff11',
    'obj_chokypuff12',
    'obj_chokypuff13',
    'obj_chokypuff14',
    'obj_chokypuff15',
    'obj_chokypuff16',
    'obj_chokypuff17',
    'obj_izlar_extremophytes1',
    'obj_izlar_extremophytes2',
    'obj_izlar_extremophytes3',
    'obj_izlar_extremophytes4',
    'obj_izlar_extremophytes5',
    'obj_izlar_extremophytes6',
    'obj_izlar_extremophytes7',
    'obj_izlar_extremophytes8',
    'obj_izlar_izlaroflora1',
    'obj_izlar_izlaroflora2',
    'obj_izlar_izlaroflora3',
    'obj_izlar_izlaroflora4',
    'obj_izlar_izlaroflora5',
    'obj_izlar_izlaroflora6',
    'obj_izlar_izlaroflora7',
    'obj_izlar_izlaroflora8',
    'obj_izlar_izlaroflora9',
    'obj_izlar_izlaroflora10',
    'obj_izlar_izlaroflora11',
    'obj_izlar_jellytree1',
    'obj_izlar_jellytree2',
    'obj_izlar_jellytree3',
    'obj_lonsdaleites1',
    'obj_lonsdaleites2',
    'obj_lonsdaleites3',
    'obj_lonsdaleites4',
    'obj_lonsdaleites5',
    'obj_lonsdaleites6',
    'obj_lonsdaleites7',
    'obj_lonsdaleites8',
    'obj_sylonwalls1',
    'obj_sylonwalls2',
    'obj_sylonwalls3',
    'obj_frozen_cloud1',
    'obj_frozen_cloud2',
    'obj_frozen_cloud3',
    'obj_frozen_cloud4',
    'obj_frozen_cloud5',
    'obj_frozen_cloud6',
    'obj_frozen_cloud7',
    'obj_frozen_cloud8',
    'obj_frozen_cloud9',
    'obj_frozen_cloud10',
    'obj_frozen_cloud11',
    'obj_frozen_cloud12',
    'obj_frozen_cloud13',
    'obj_frozen_cloud14',
    'obj_frozen_cloud15',
    'obj_frozen_cloud16',
    'obj_frozen_cloud17',
    'obj_frozen_cloud18',
    'obj_frozen_cloud19',
    'obj_frozen_cloud20',
    'obj_frozen_cloud21',
    'obj_frozen_cloud22',
    'obj_frozen_cloud23',
    'obj_frozen_cloud24',
    'obj_fed_wall1',
    'obj_fed_wall2',
    'obj_fed_wall3',
    'obj_fed_wall4',
    'obj_fed_wall5',
    'obj_fed_wall6',
    'obj_fed_wall7',
    'obj_fed_wall8',
    'obj_fed_wall9',
    'obj_fed_wall10',
    'obj_fed_wall11',
    'obj_fed_wall12',
    'obj_fed_wall13',
    'obj_fed_wall14',
    'obj_fed_wall15',
    'obj_fed_wall16',
    'obj_fed_wall17',
    'wrecksilicon1',
    'wrecksilicon2',
    'wrecksilicon3',
    'wrecktitanium1',
    'wrecktitanium2',
    'wrecktitanium3',
    'wrecktitanium4',
    'wrecktitanium5',
    'wrecktitanium6',
    'wrecktitanium7',
    'blocker',
    'plasmoid',
  ],
};
