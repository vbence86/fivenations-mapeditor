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

## Add entity to Entities Tab
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

## Add effect to Effects Tab
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

## Add space object to Space Objects Tab
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

## Flag Space Object to allow overlapping
`src/js/components/windows/EntitiesWindow.js:54`
```js
const canBePlacedOnTopOfObstacles = [
  'asteroidswarm1',
  'asteroidswarm2',
  'asteroidswarm3',
  'asteroidswarm4',
  'asteroidswarm5',
  ...

```

## Bring Mapeditor up-to-date with Five Nations
- Checkout #fivenations project from https://github.com/vbence86/fivenations.
- Make sure you've got the latest version of the desired branch pulled down
- Switch to `mapeditor` branch
- Merge the desired branch into `mapeditor` branch
```bash
git merge milestone/luckylabor
```
- Push the merged variance to the remote repository
```bash
git push
```
- Go to your mapeditor project folder and update the project
```bash
git pull
npm i
```
- Restart the dev server
```bash
npm run dev
```
