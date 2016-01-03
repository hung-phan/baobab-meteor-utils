import Tracker from 'tracker';

/**
 * Binding state to 1 branch of Baobab
 * @param {Function} getter A function that will be called each time the
 * in Tracker.Autorun
 * @param {Object} state the branch of Baobab
 */
export default function autorunBinding(getter, state) {
  if (typeof getter !== 'function') {
    throw new Error('getter must be a function');
  }

  Tracker.autorun(() => {
    state.set(getter());
  });
}
