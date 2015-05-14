# app for https://angularclass.com
---
## TOC
* [Dependencies](#dependencies)
* [Getting Started](#getting-started)
* [Developing](#developing)
    * [Tasks](#tasks)  
    * [Commit format](#commit-format)
* Testing
* Deployment


## Dependencies 
This is a MEAN stack app using ES6. `Babel` is the transpilers in use, and right now, the fromt end
uses a combo of `Gulp` and `Webpack`. the backend is still using `JSPM` but should and will be changes to use
`Weboack` as well.

The fron end uses a component approach similar to React, just take a look through it and you'll see.
The backend use a `SOA` similar to the front end. Again, take a look. Because the backend is still using
`JSPM` we have a mix of `require` and `import` statments. Just `require` node_modules and `import` your files.

Here's a list of things you need.

* `node` version >= `.12` (use `nvm` to manage versions)
* mongo
* `npm` globals
	* `karma`
	* `karma-cli`
	* `webpack`
	* `gulp`
	* `bower`
	* `jspm`
	

## Getting started
* `fork` this baby
* `clone` your fork
* make sure you have above [dependencies](#dependencies)
* `npm i`
* `bower i`
* `jspm i`

All that will install all the needed dependencies for you.

## Developing
After you have installed everything, you can start building things. 
**Note**
because the backend uses `JSPM`, all paths in `import` on the backend are relative to the `server` folder but all paths in `require` work as usual, relative the the current file. This is changing soon. The fron end is using `webpack` so all paths are relative to the current file.

* checkout a new branch in this format
    * [featureNmae/yourName]
    * example `git checkout -b blogListAnimations/scott`
    
* open a new terminal window and run `mongod` to start mongo.
* open a new terminal window and run `gulp`. Check out the [list of tasks](#tasks) you can run.
* run test `npm test`
* after you make your changes and tests pass, commit them using the [following format](#commit-format)
* Pull from `remote/dev`
* push to your `fork/branch` and open a PR againts `remote/dev`
* wait for CodeShip (CI) runs your test
* if tests pass, assign PR to @Hendrixer
* Watch for comments on code sugestions / changes
* Make any changes and update PR

### Tasks
All tasks are ran by `Gulp`

* `nodemon`
    * starts the node server 
* `serve`
    * will serve the front end through `browser-sync` wich has live reloading 
    * it will proxy the node server on port `3000` to port `9000`
* `webpack`
    * will run our client code through webpack wich will
        * turn ES6 to ES5
        * bundle all js files
        * create `app/bundle.js`
* `secrets`
    * this is for CI and deployment
    * because you can't conditionally use `import` like `require`
    * During dev, you should have the `server/config/sercrets.js` file with all secrets, but when we deploy that file is not checked in, and because the server will always `import` it, it breaks. This tasks makes a blank file.
* `watch`
    * this tasks watches client side code and calles `webpack` again and reloads the browser 
* `default`
    * runs `nodemon, webpack, serve, watch`

### Commit format
```
[changeType](module/component): small description
<!-- blank line -->
longer description (closes:fixes: breaking changes)
```
List of `changeTypes`
* **feature** - new feature
* **fix** - bug fix (typo, test, etc)
* **chore** - refactoring, changing files around, etc
* **spec** - adding test
* **docs** - updaing or creating docs

Here is an example of a commit message for a new feature
```
feature(admin): add ability for admins to invite authors

closes #23
Breaking changes: Changed author.name to author.first_name and author.last_name
```

Here is an example for a commit message for a bug fix
```
fix(blog): fix typo
```

## Testing
Testing is done with mocha on both back and front. All test are written in ES6.
The front end uses Karma and webpack, the back uses JSPM. 

To run all test - `npm test`.
To run frontend test `karma start`
To run backend run `node server/test.js` - we use `mocha` pragmatically because of `JSPM`. This is chagning to webpack.

## Deployment
This is not solid yet. Right now, we're deployed on `Heroku`. Using the integration with github, heroku will deploy when it sees a `push` to the master branch. We might automate this with our CI `Codeship` instead. Stay tuned. 
	



