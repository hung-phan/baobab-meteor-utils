/**
 * Binding state to 1 branch of Baobab
 * @param {Object} cursor Meteor cursor. For example, Users.find()
 * @param {Object} state the branch of Baobab
 */
export default function cursorObjectListener(cursor, state) {
  state.set({});

  cursor.observe({
    addedAt(data) {
      state.set(data._id, data);
    },
    removedAt({ _id }) {
      state.unset(_id);
    },
    changedAt(data) {
      state.set(data._id, data);
    }
  });
}
