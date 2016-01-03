/**
 * Binding state to 1 branch of Baobab
 * @param {Object} cursor Meteor cursor. For example, Users.find()
 * @param {Object} state the branch of Baobab
 */
export default function cursorListener(cursor, state) {
  state.set([]);

  cursor.observe({
    addedAt(doc) {
      state.push(doc);
    },
    removedAt(doc, index) {
      state.select(index).unset();
    },
    changedAt(doc, oldDoc, index) {
      state.select(index).set(doc);
    }
  });
}
