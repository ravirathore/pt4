
const cheerio = require('cheerio');
const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const ffeed = require('feed').Feed;
const express = require('express')
const RSSHub = require('rsshub');

var fs = require('fs');
const app = express()
const PORT = process.env.PORT || 5000;
//const port = 3000
var xx2;
var xx3;
var xx4;
RSSHub.init({
  // config
});
function xy2(temp1, temp2, temp3, temp31) {
 
  let temp4 = '/' + temp1 + '/' + temp2 + '/' + temp3 + '/' + temp31;
  let temp4_123 = '/' + temp1 + '/' + temp2 + '/' + temp3 
  const feed2 = new ffeed({
    title: temp4_123,
    description: 'PT',
    author: 'pt',
    link: 'pt',
    pubDate: 'pt',
  });
  console.log(temp4);
  RSSHub.request(temp4)
    .then((data) => {
      //for it in data.item{
        console.log("data", data);
        for(let i=0; i< data.item.length ; i++){
        feed2.addItem({
          title: data.item[i].title,
          author: data.item[i].author,
          link: data.item[i].link,
          description: data.item[i].description,

          pubdate: data.item[i].pubDate
        });
        var rssdoc = feed2.rss2();
        xx3 = rssdoc;

      }
     // console.log("temp4", xx3);
     // xx3 = data.item;
    })
    .catch((e) => {
      console.log(e);
    });
  //  return xx3;
}

function xy3(temp1, temp2, temp3) {
 
  let temp4 = '/' + temp1 + '/' + temp2 + '/' + temp3;
  const feed2 = new ffeed({
    title: temp4,
    description: 'PT',
    author: 'pt',
    link: 'pt',
    pubDate: 'pt',
  });
  console.log(temp4);
  RSSHub.request(temp4)
    .then((data) => {
      //for it in data.item{
        for(let i=0; i< data.item.length ; i++){
        feed2.addItem({
          title: data.item[i].title,
          author: data.item[i].author,
          link: data.item[i].link,
          description: data.item[i].description,

          pubdate: data.item[i].pubDate
        });
        var rssdoc = feed2.rss2();
        xx4 = rssdoc;

      }
      console.log("temp4", xx3);
     // xx3 = data.item;
    })
    .catch((e) => {
      console.log(e);
    });
  //  return xx3;
}
app.get('/', (req, res) => {
  console.log("hello");
  xy();
  //res.send('Hello World!')
  res.send(xx2)

})
app.get('/users/:a/:b/:c/:d', async (req, res) => {
  await xy2(req.params.a, req.params.b, req.params.c, req.params.d);
  //res.send('Hello World!')
  res.send(xx3)

})
app.get('/users/:a/:b/:c', async (req, res) => {
  await xy3(req.params.a, req.params.b, req.params.c);
  //res.send('Hello World!')
  res.send(xx4)

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
var dirPath = __dirname + "/rssfeed.xml";
async function xy() {
  console.log("hello2");
  const url = 'http://engold.ptinews.com/';
  console.log("hell03");
  const response = await fetch(url);
  console.log("hello4");
  const body = await response.text();

  //create new feed
  const feed = new ffeed({
    title: 'PT',
    description: 'PT',
    id: 'pt',
    link: 'pt',
    image: 'pt',
  });




  let $ = cheerio.load(body);

  let title = $('title');
  console.log(title.text());
  //let xy1 = $('a[class=catLatestHeadli]').();
  $('a[class=catLatestHeadli]').each((_, e) => {

    let row = $(e).text();

    console.log(`${row}`);
    console.log(row);
    date = new Date()

    feed.addItem({
      title: row,
      id: row,
      link: row,
      description: row,
      content: row,
      date: date
    });

  });
  var rssdoc = feed.rss2();
  xx2 = rssdoc;
  fs.writeFile(dirPath, rssdoc, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  //   res.render('index');

  //console.log(xy1);
}

//xy();