const fs = require("fs");


//Blocking synchronous way

// const hello = fs.readFileSync('./input.txt', 'utf-8');
// console.log(hello);

// const message = `This input of file was: \n${hello}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./output.txt', message);

// console.log("File Written");

//Non-Blocking Asynchronous way using CallBack Hell

fs.readFile('./inputFile2', 'utf-8', (err, data) => {
    fs.readFile(`./${data}.txt`, 'utf-8', (err, data1) => {
        console.log(data1);
        fs.readFile('./append.txt', 'utf-8', (err,data2) => {
            console.log(data2);

            fs.writeFile('./outputFile2', data1+'\n'+data2, 'utf-8', err => {
                console.log("Final File written!");
            });
        });
    });
});
console.log('reading File');
