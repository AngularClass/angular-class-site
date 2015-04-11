import {Author} from 'api/author/author';
import {config} from 'config/index';


export default function(){
  Author.remove({}, function(err){
    let newAuthor = {
      first_name: 'scott',
      last_name: 'moss',
      email: 'scott@angularclass.com',
      password: 'ballin35$$',
      bio: 'Scott likes to ...',
      handles: {
        twitter: '@scotups'
      },

      role: 'admin'
    };

    newAuthor = new Author(newAuthor);

    newAuthor.save(function(){
      console.log('---  Done seeding');
    });
  });
}
