# Utils for integrating [BaoBab](https://github.com/Yomguithereal/baobab) with Meteor

[![build status](https://secure.travis-ci.org/hung-phan/baobab-meteor-utils.svg)](http://travis-ci.org/hung-phan/baobab-meteor-utils/)

[![NPM](https://nodei.co/npm/baobab-meteor-utils.png?downloads=true)](https://nodei.co/npm/baobab-meteor-utils/)

## Example

```javascript
const AppState = new Baobab({
  branch: {
    list: []
  }
});

let cursor = AppState.select('branch');
```

```javascript
import Meteor from 'meteor';
import { cursorListener } from 'baobab-meteor-utils';

Meteor.startup(() => {
  cursorListener(window.Users.find(), cursor.select('list'));
});
```

```javascript
import Meteor from 'meteor';
import { autorunBinding } from 'baobab-meteor-utils';

Meteor.startup(() => {
  autorunBinding(() => window.Meteor.user(), cursor);
});
```

To make this work, add `Tracker` dependency to your webpack build

```
  externals: {
    'tracker': 'Tracker'
```
