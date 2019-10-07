## About
Five Nations Map Editor is an external tool that is made to design and construct maps that can be loaded in Five Nations.

## Install
Clone the project to a folder of your choice through SSH
```
git clone git@github.com:vbence86/fivenations-mapeditor.git
```
or through HTTPS
```
git clone https://github.com/vbence86/fivenations-mapeditor.git
```

Install the project dependencies
```
cd fivenations-mapeditor
```
```
npm install
```

## Start Map Editor
Fire up the local dev server.
```
npm run dev
```
The mapeditor will be automatically opened in a new tab in your default browser. If not, try to manually open a browser and navigate to ```http://localhost:9000```

## Adding entity to Entities Tab
Open `src/js/helpers/consts.js` and augment the list above with the id of the desired entity.
```js
export const ENTITIES = {
  [ENTITY_TAB_FEDERATION]: [
    'hurricane',
    'orca',
    'hailstorm',
    'stgeorge',
    'avenger',
    'avenger2',
    ...
```

## Adding effect to Effects Tab
Open `src/js/components/elements/EffectsTab.js` and augment the list above with the id of the desired entity.
```js
const effects = {
  [EFFECT_TAB_MISC]: [
    'destructivefield',
    'blackhole',
    'nebulafog1',
    'nebulafog2',
    'nebulafog3',
    'nebulafog4',
    ...
```

## Adding space object to Space Objects Tab
Open `src/js/components/elements/SpaceObjectsList.js` and augment the list above with the id of the desired entity.
```js
const spaceObjects = [
  'bg_asteroidfields_normal1',
  'bg_asteroidfields_normal2',
  'bg_asteroidfields_normal3',
  'bg_asteroidfields_normal4',
  'bg_asteroidfields_normal5',
  'bg_asteroidfields_normal6',
  'bg_asteroidfields_normal7',
  'bg_asteroidfields_normal8',
  'bg_asteroidfields_normal9',
  'bg_asteroidfields_normal10',
  ...
```
