import _ from 'lodash';

export default function requireSubvertHelper(fakeRequire, fakeDeps, module) {
  _.each(fakeDeps, (value, key) => fakeRequire.subvert(key, value));
  return fakeRequire.require(module);
}
