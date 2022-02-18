const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

//TOP LEVEL CODE

function findProduct(products, productId) {
  console.log(products.length);
  for (let i = 0; i < products.length; i++) {
    console.log(products[i].id);
    if (products[i].id == productId) {
      return i;
    }
  }
  return -1;
}

//reading data before starting server

const fileData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const templateMain = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const productData = JSON.parse(fileData);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname + ' param: ' + query.id);

  if (pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHTML = productData.map((el) => replaceTemplate(templateCard, el)).join('');
    const mainOutput = templateMain.replace('{%PRODUCT_CARD%}', cardsHTML);
    res.end(mainOutput);
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    //const currProduct = productData[query.id];
    const currProductIndex = findProduct(productData, query.id);
    const currProduct = productData[currProductIndex];

    if (currProductIndex === -1) {
      res.end('404 PAGE NOT FOUND');
    } else {
      const productOutput = replaceTemplate(templateProduct, currProduct);

      res.end(productOutput);
    }
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(fileData);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('404 Page not found');
  }
});

server.listen(80, '127.0.0.1', () => {
  console.log('Server Started on port 127.0.0.1:80');
});
