const fs = require('fs');
const superAgent = require('superagent');

// build a promise to read files name with no callbacks
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write that file');
      resolve('success');
    });
  });
};

// call back inside callback(call back hell(nested))
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
// superAgent to consume promises
//   superAgent.get(`https://dog.ceo/api/breeds/${data}/image/random`);

// .end((err, res) => {
//     if (err) return console.log(err.message);
//   console.log(res.body.message);
//   fs.writeFile('dog-img.txt', res.body.message, err => {
//     if (err) return console.log(err.message);
//     console.log('random dog image is saved in the file ');
//   })
// });

// fix it by using promises we can chain them instead of nesting
// .then((res) => {
//   if (err) return console.log(err.message);
//   console.log(res.body.message);
//   fs.writeFile('dog-img.txt', res.body.message, (err) => {
//     if (err) return console.log(err.message);
//     console.log('random dog image is saved in the file ');
//   }).catch((err) => {
//     console.log(err.message);
//   });
// });
// });

// here we have a flat structure of chained promises
// readFilePro(`${__dirname}/dog.txt`)
//   .then((result) => {
//     console.log(`Breed: ${result}`);
//     return superAgent.get(`https://dog.ceo/api/breed/${result}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// use async/await that are much better than promises
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    // run multiple promises at the same time
    // in this case we save the value not resolve it
    const res1Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    // const res = await superAgent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    // console.log(res.body.message);
    // await writeFilePro('dog-img.txt', res.body.message);
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('random dog image saved to file!');
  } catch (err) {
    console.log(err);
    // here the throw is added and marked it as rejected
    throw err;
  }
  return '2: ready';
};
// both will run while getDogPic is running in back to not block
// console.log('1:will get dog pics');
// getDogPic();

// in this way it says promise pending async returns promise automatically
// const x = getDogPic();
// console.log(x);

// show the return value wont return error on catch and is always returned as successful unless we throw an error to it!
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3:done getting dog pics');
//   })
//   .catch(() => {
//     console.log('error');
//   });

// another pattern to do so in async await that is iife
// declare the func in first () and call it right away
(async () => {
  try {
    console.log('1:will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3:done getting dog pics');
  } catch (err) {
    console.log('error');
  }
})();

// console.log('3:done getting dog pics');

// run multiple promises at the same time
