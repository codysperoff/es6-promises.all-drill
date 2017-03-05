let promiseCounter = 0;

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const asyncPromiseMaker = () => {
    promiseCounter++;
    const promiseName = `promise${promiseCounter}`;
    console.log(`${promiseName}: started`);
    const result = randomInteger(1, 100);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`promise${promiseName}: doing async work, returning ${result}`);
            resolve(result);
        }, randomInteger(100, 2000));
        //randomInteger(100,2000) says that this promise will work anywhere between 100 and 2000 milliseconds.

        //***********Question 2: Does the setTimeout always need something after it***********
        //***********telling it how much time it has?***********
    });
}

function synchronousWork() {
    console.log(`synchronous working going`);
}

const concurrentPromises = [];
for (let i = 1; i <= 10; i++) {
    concurrentPromises.push(asyncPromiseMaker());
    //asyncPromiseMaker returns the resolve value, which in this case is return.
}
//***********Question 1: where does "i" get incremented? how does the for loop know***********
//***********to run through the different promiseNames?***********

Promise
    .all(concurrentPromises)
    .then(results => {
        console.log('Concurrent async calls completed');
        const reduced = results.reduce((a, b) => a + b);
        //reduced changes the results so that insteaad of being in a list, they are all added up.
        console.log(`Sum of results is ${reduced}`);
    })
    .catch(err => console.error(err))


synchronousWork();
