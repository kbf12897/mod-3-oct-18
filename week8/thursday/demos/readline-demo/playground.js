const wait = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            // console.log("print this");
            resolve()
        }, 2000);
    });

}

// wait()
//     .then(num1 => {
//         console.log(num1)
//         return wait()
//     })
//     .then(num2 => console.log(num2));

async function waiting() {

    const num1 = await wait();
    // console.log(num1);
    const num2 = await wait();
    // console.log(num2);
    return num1 + num2;
}

// (async function() {
//     const result = await waiting();
//     console.log(result);
// })();

// waiting().then(result => console.log(result));

(async function() {
    await wait();
    console.log("hello");
})();
