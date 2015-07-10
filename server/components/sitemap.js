import {Post} from '../api/post/post';

var sm = require('sitemap');
var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');

export default function(req, res, next) {
  Post.find({ state: 'published' })
  .lean()
  .select('url updatedAt')
  .exec((err, posts) =>{
    if (err) {
      return res.sendFile('sitemapCache.xml');
    }

    let urls = [
      { url: '/', changefreq: 'weekly', priority: 0.3 },
      { url: '/blog', changefreq: 'always', priority: 1 },
      { url: '/about', changefreq: 'monthly', priority:0.3 }
    ];

    let mapUrls = function(){
      return _.reduce(posts, function(urls, post){
        let lastMod = moment(post.updatedAt).format('YYYY[-]MM[-]DD');
        urls.push({
          url: '/blog/' + post.url,
          changefreq: 'daily',
          priority: 0.7,
          lastmod: lastMod
        });
        return urls;
      }, urls);
    };

    let sitemap = sm.createSitemap ({
      hostname: 'https://angularclass.com',
      cacheTime: 600000,        // 600 sec - cache purge period
      urls: mapUrls()
    });

    sitemap.toXML(xml => {
      fs.writeFileSync('sitemapCache.xml', xml);
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });
};
