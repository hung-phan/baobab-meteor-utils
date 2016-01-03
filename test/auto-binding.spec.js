import { assert } from 'chai';
import sinon from 'sinon';
import Baobab from 'baobab';
import requireSubvert from 'require-subvert';
import requireSubvertHelper from './helpers/require-subvert-helper';

describe('auto-binding.js spec', () => {
  const fakeRequire = requireSubvert(__dirname);
  let Tracker;
  let autorunBinding;
  let getterStub;
  let branch;

  beforeEach(() => {
    Tracker = { autorun: sinon.spy() };
    getterStub = sinon.stub();
    getterStub.onCall(0).returns({ data: 'new value' });

    branch = new Baobab({
      list: []
    });

    autorunBinding = requireSubvertHelper(fakeRequire, {
      tracker: Tracker
    }, './../src/autorun-binding').default;

    autorunBinding(() => getterStub(), branch.select('list'));
  });

  afterEach(() => {
    fakeRequire.cleanUp();
  });

  context('# autorunBinding()', () => {
    it('should be a function', () => {
      assert.isFunction(autorunBinding);
    });

    it('should throw exception when given the wrong arguments', () => {
      assert.throw(() => {
        autorunBinding(true, branch);
      });
    });

    context('Tracker.autorun callback', () => {
      let cb;

      beforeEach(() => {
        cb = Tracker.autorun.args[0][0];
        cb();
      });

      it('should call getter', () => {
        assert.ok(getterStub.called);
      });

      it('should set data to listAutorun branch', () => {
        assert.deepEqual(branch.select('list').get(), { data: 'new value' });
      });
    });
  });
});
