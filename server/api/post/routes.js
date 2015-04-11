import {controller} from 'api/post/controller';

var express = require('express');

var postRouter = express.Router();


postRouter.param('post', controller.mountId);

postRouter.route('/')
  .get(controller.getAll)
  .post(controller.createOne);

postRouter.route('/:post')
  .get(controller.getOne)
  .put(controller.editOne)
  .delete(controller.removeOne);

export {postRouter};
