import { assert } from 'chai';
import sinon from 'sinon';
import Baobab from 'baobab';
import cursorListener from './../src/cursor-listener';

describe('cursor-listener.js spec', () => {
  let cursor;
  let branch;

  beforeEach(() => {
    cursor = { observe: sinon.spy() };
    branch = new Baobab({
      list: []
    });

    cursorListener(cursor, branch.select('list'));
  });

  context('# cursorListener()', () => {
    it('should be a function', () => {
      assert.isFunction(cursorListener);
    });

    it('should throw exception when given the wrong arguments', () => {
      assert.throw(() => {
        cursorListener(true, branch);
      });

      assert.throw(() => {
        cursorListener(cursor, true);
      });
    });

    it('should initial app state path with an empty object', () => {
      assert.deepEqual(branch.select('list').get(), []);
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

        const expected = [item1, item2];

        assert.deepEqual(branch.select('list').get(), expected);
      });

      it('should remove an item from the list when removedAt been called', () => {
        const item1 = { _id: 'id1', value: 'hello world' };
        const item2 = { _id: 'id2', value: 'hello world 2' };
        const { removedAt } = params;

        const seedData = [item1, item2];
        branch.select('list').set(seedData);

        removedAt(item1, 0);

        const expected = [item2];

        assert.deepEqual(branch.select('list').get(), expected);
      });

      it('should update an item from the list when changedAt been called', () => {
        const item1 = { _id: 'id1', value: 'hello world' };
        const item2 = { _id: 'id2', value: 'hello world 2' };
        const { changedAt } = params;

        const seedData = [item1, item2];
        branch.select('list').set(seedData);

        changedAt({ value: 'halo' }, item1, 0);

        const expected = [{ value: 'halo' }, item2];

        assert.deepEqual(branch.select('list').get(), expected);
      });
    });
  });
});
