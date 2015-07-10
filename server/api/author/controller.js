import {Author} from './author';
import {sign} from '../../auth/gatekeeper';
import {log} from '../../components/logger';
import {config} from '../../config/index';


var _ = require('lodash');
var path = require('path');
var cloudinary = require('cloudinary');
var tag = 'api/author/routes';

cloudinary.config({
  cloud_name: 'angularclass',
  api_key: config.secrets.cloudinary.key,
  api_secret: config.secrets.cloudinary.secret
});

var controller = {

  getAll: function(req, res, next) {
    Author.find()
    .lean()
    .exec(function(err, authors) {
      if (err) {
        return next(err);
      }
      res.json(authors);
    });
  },

  getOne: function(req, res, next) {
    res.json(req.author);
  },

  createOne: function(req, res, next) {
    var newAuthor = req.body;
    Author.make(newAuthor)
      .then(res.json.bind(res))
      .catch(next.bind(next));
  },

  editOne: function(req, res, next) {
    _.extend(req.author, req.body);

    req.author.save(function(err, saved) {
      if (err) {
        return next(err);
      }

      req.json(saved);
    });
  },

  removeOne: function(req, res, next) {
    res.send({name: 'yo'});
  },

  login: function({author: { _id, role }}, res, next) {
    var token = sign({ _id: _id, role: role });
    res.json({ token: token });
  },

  upload: function(req, res, next) {
    let file = req.files.file;
    let location = path.join(process.cwd(), file.path);

    cloudinary.uploader.upload(location, ({error=false, url=null})=>{

      if (error) {
        next(new Error(error.message))
        return;
      }

      res.status(201).send({ url: url });
    });
  }
};

export {controller};
