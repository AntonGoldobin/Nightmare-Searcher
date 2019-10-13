const Nightmare = require('nightmare');
const cheerio = require('cheerio');


let pagesData = []
const generalUrl = 'https://youthstore.ru/'
const startThemeUrl = 'c/men/clothes/sweatshirts'



const nightmare = Nightmare({ show: true });
nightmare
  .goto(generalUrl + startThemeUrl)
  .wait(500)
  .evaluate(function () {
    return document.documentElement.outerHTML;
  })
  .end()
  .then(function (responce) {
    let getData = html => {
      const $ = cheerio.load(html, { decodeEntities: false })


      //find all items and get title, info and price
      $("#items-holder li").each((i, elem) => {
        pagesData.push({
          title: $(elem).find('.title').text(),
          img: generalUrl + $(elem).find('.image img').attr('src'),
          price: $(elem).find('.price').text(),
          url: generalUrl + $(elem).find('a').attr('href')
        })

      });
    }
    getData(responce)
  })
  .then(function () {
    console.log(pagesData)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });