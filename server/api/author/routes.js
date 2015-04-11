import {controller} from 'api/author/controller';
import {CheckAdmin, Gatekeeper, CheckPassword} from 'auth/gatekeeper';

var express = require('express');

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

export {authorRouter};
