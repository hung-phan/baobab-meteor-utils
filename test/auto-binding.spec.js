import { assert } from 'chai';
import sinon from 'sinon';
import Baobab from 'baobab';
import autorunBinding from './../src/autorun-binding';

describe('auto-binding.js spec', () => {
  let autorunStub;
  let getterStub;
  let branch;

  beforeEach(() => {
    autorunStub = sinon.stub(global.Tracker, 'autorun');
    autorunStub.returns(true);

    getterStub = sinon.stub();
    getterStub.returns({ data: 'new value' });

    branch = new Baobab({
      list: []
    });

    autorunBinding(() => getterStub(), branch.select('list'));
  });

  afterEach(() => {
    autorunStub.restore();
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
        cb = autorunStub.args[0][0];
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
