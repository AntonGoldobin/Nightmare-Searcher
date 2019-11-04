const Nightmare = require('nightmare');
const cheerio = require('cheerio');


let pagesData = []
const generalUrl = 'https://www.asos.com/'
const startThemeUrl = 'ru/men/tufli-botinki-i-kedy/krossovki/cat/?cid=5775'

const nightmare = Nightmare({ show: true});
nightmare.goto(generalUrl + startThemeUrl)
  .wait(3000)
  .evaluate(function() {
    window.document.body.scrollTop = document.body.scrollHeight;
  })
  .scrollTo(5000, 0)
  .wait('#product-12489036 > a > div > img[data-auto-id="productTileImage"]')
  .evaluate(function () {
    return document.documentElement.outerHTML;
  })
  .end()
  .then(function (responce) {
    let getData = html => {
      const $ = cheerio.load(html, { decodeEntities: false })

      //find all items and get title, info and price
      $("._3-pEc3l article").each((i, elem) => {
        pagesData.push({
          title: $(elem).find('._1Ai1lKq p').text(),
          img: 'https:' + $(elem).find('._3x-5VWa img').attr('src'),
          price: $(elem).find('._3b3kqA8').text(),
          url: generalUrl + $(elem).find('._3x-5VWa').attr('href')
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