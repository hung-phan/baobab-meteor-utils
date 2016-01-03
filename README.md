# Utils for integrating [BaoBab](https://github.com/Yomguithereal/baobab) with Meteor

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
