module.exports =  (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT_COUNTRY%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCT_NEUTRIANTS%}/g, product.nutrients);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
    
    
    if(!product.organic){
        output = output.replace(/{%NOTORGANIC%}/g, 'not-organic');
    }

    return output;
}