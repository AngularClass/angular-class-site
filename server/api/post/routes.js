import {controller} from './controller';
import {CheckAdmin, Gatekeeper} from '../../auth/gatekeeper';

var express = require('express');

var postRouter = express.Router();


postRouter.param('post', controller.mountId);

postRouter.route('/')
  .get(controller.getAll)
  .post(CheckAdmin(), controller.createOne);

postRouter.route('/:post')
  .get(controller.getOne)
  .put(Gatekeeper(), controller.editOne)
  .delete(CheckAdmin(), controller.removeOne);

export {postRouter};
