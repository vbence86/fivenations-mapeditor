# Five Nations [![Build Status](https://travis-ci.org/vbence86/fivenations.svg?branch=master)](https://travis-ci.org/vbence86/fivenations) [![Build Status](https://semaphoreci.com/api/v1/vbence86/fivenations/branches/master/badge.svg)](https://semaphoreci.com/vbence86/fivenations) [![Coverage Status](https://coveralls.io/repos/github/vbence86/fivenations/badge.svg?branch=master)](https://coveralls.io/github/vbence86/fivenations?branch=master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/935f2ebf03654b0a9537d4cc7c4bcd1f)](https://www.codacy.com/app/vbence86/fivenations?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=vbence86/fivenations&amp;utm_campaign=Badge_Grade) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Gitter](https://img.shields.io/gitter/room/fivenations/Lobby.svg?maxAge=2592000)](https://gitter.im/fivenations/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

![ezgif com-gif-maker 1](https://user-images.githubusercontent.com/6104164/32551083-9db99ed6-c48f-11e7-979f-e43a11a52f40.gif)

## About the game
Five Nations is a sci-fi strategy game that takes place in the far future and follows the events of a galactic battle between five distinct species. The gameplay utilizes traditional real-time strategy elements with introducing modern features.

## Five Nations on Social Media
[![alt text][1.1]][1] [![alt text][2.1]][2] [![alt text][3.1]][3]

[1.1]: http://i.picresize.com/images/2017/11/08/SxV2s.png (twitter icon with padding)
[2.1]: http://www.ifes.org/sites/all/themes/ifes/images/facebook-icon.png (facebook icon with padding)
[3.1]: http://i.picresize.com/images/2017/11/08/dXjsQ.png (facebook icon with padding)

[1]: http://www.twitter.com/vbence86
[2]: http://www.facebook.com/fivenationsthegame
[3]: http://www.instagram.com/fivenationsthegame

## Five Nations at Conferences
[![alt text][4.1]][4] [![alt text][5.1]][5] 

[4.1]: https://pbs.twimg.com/media/DSpGPrbW4AAIXGu.jpg

[5.1]: https://www.berlinbalticnordic.net/wp-content/uploads/2017/12/WhiteNightsPrague.jpg

[4]: https://gamedev.ee/
[5]: https://wnconf.com/en

## About the project
Five Nations is an open source HTML5 game that uses cutting-edge  technologies such as ES2015+, Babel, Webpack etc. The project is built on top of Phaser Community Edition and employs P2 physics engine. We employ modern CI flow with Jenkins, TravisCI and Docker. 

## Contributing
Since this is an open source project all form of contribution and feedback are welcomed. We are hiring!

0. Join us on **Gitter** https://gitter.im/fivenations/Lobby (so that we could answer any of your technical questions)
1. Fork the project
2. Pick up an Issue with `good first issue` or `help wanted` label
3. Create a branch named `feature/{issue-number}`
4. Apply your changes against this branch (when commiting a change, apply the `#{issue-number}` as prefix to your commit message. `git commit -m"#300 Update functionality of ..."`)
   
5. Create a Pull Request to the upstream `master`
6. Set back and have a beer :)

#### Install
```bash
git clone url://to.your.fork
yarn
```

#### Run Development Server
```
yarn run dev
```
#### Game 
Once the preloading process is ready, you'll see a blank screen with the GUI activated. In order to populate the game scene with entities you'll have to use the console to execute API commands that are expose to the global scope. 

##### Add new entity to the game stage
``` 
addEntity(entityName: string, playerId: number, ?(x: number), ?(y: number)); 
// example
addEntity('hurricane', 1, 150, 180);
```
Available entity Ids:
`hurricane`, `orca`, `hailstorm`, `avenger`, `avenger2`, etc. 
(for all entity ids check `/src/assets/data/units/` subfolder)
