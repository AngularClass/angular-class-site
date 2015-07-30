import _ from 'lodash';

const props = {
  restrict: 'E',
  scope: {},
  replace: true
};

class Component {
  constructor(ops = {}) {
    if (ops.controller) {
      ops.bindToController = true;

      if (!ops.controllerAs) {
        ops.controllerAs = 'vm'
      }
    }

    _.extend(this, props, ops);
  }
};

export {Component};
