import {controller} from './controller';
import {CheckAdmin, Gatekeeper, CheckPassword} from '../../auth/gatekeeper';

var express = require('express');
var multipart = require('connect-multiparty');
var authorRouter = express.Router();

authorRouter.route('/')
  .get(CheckAdmin(), controller.getAll)
  .post(CheckAdmin(), controller.createOne);

authorRouter.route('/:author')
  .get(Gatekeeper(), controller.getOne)
  .put(Gatekeeper(), controller.editOne)
  .delete(Gatekeeper(), controller.removeOne);

authorRouter
  .post('/login', CheckPassword, controller.login);

authorRouter
  .post('/upload', controller.upload);

export {authorRouter};
