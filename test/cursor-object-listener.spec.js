import { assert } from 'chai';
import sinon from 'sinon';
import Baobab from 'baobab';
import cursorObjectListener from './../src/cursor-object-listener';

describe('cursor-object-listener.js spec', () => {
  let cursor;
  let branch;

  beforeEach(() => {
    cursor = { observe: sinon.spy() };
    branch = new Baobab({
      object: []
    });

    cursorObjectListener(cursor, branch.select('object'));
  });

  context('# cursorObjectListener()', () => {
    it('should be a function', () => {
      assert.isFunction(cursorObjectListener);
    });

    it('should throw exception when given the wrong arguments', () => {
      assert.throw(() => {
        cursorObjectListener(true, branch);
      });

      assert.throw(() => {
        cursorObjectListener(cursor, true);
      });
    });

    it('should initial app state path with an empty object', () => {
      assert.deepEqual(branch.select('object').get(), {});
    });

    context('cursor.observe callback', () => {
      let params;

      beforeEach(() => {
        params = cursor.observe.args[0][0];
      });

      it(`should be called`, () => {
        assert(cursor.observe.called);
      });

      it(`should have addedAt(), removedAt(), changedAt()`, () => {
        assert.property(params, 'addedAt');
        assert.property(params, 'removedAt');
        assert.property(params, 'changedAt');
      });

      it('should add an item to the list when addedAt been called', () => {
        const item1 = { _id: 'id1', value: 'hello world' };
        const item2 = { _id: 'id2', value: 'hello world 2' };
        const { addedAt } = params;

        addedAt(item1);
        addedAt(item2);

        const expected = { id1: item1, id2: item2 };

        assert.deepEqual(branch.select('object').get(), expected);
      });

      it('should remove an item from the list when removedAt been called', () => {
        const item1 = { _id: 'id1', value: 'hello world' };
        const item2 = { _id: 'id2', value: 'hello world 2' };
        const { removedAt } = params;

        const seedData = { id1: item1, id2: item2 };

        branch.select('object').set(seedData);

        removedAt(item1);

        const expected = { id2: item2 };

        assert.deepEqual(branch.select('object').get(), expected);
      });

      it('should update an item from the list when changedAt been called', () => {
        const item1 = { _id: 'id1', value: 'hello world' };
        const item2 = { _id: 'id2', value: 'hello world 2' };
        const { changedAt } = params;

        const seedData = { id1: item1, id2: item2 };
        branch.select('object').set(seedData);

        changedAt({ _id: 'id1', value: 'halo' }, item1);

        const expected = { id1: { _id: 'id1', value: 'halo' }, id2: item2 };

        assert.deepEqual(branch.select('object').get(), expected);
      });
    });
  });
});
