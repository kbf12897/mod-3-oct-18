const wait = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("print this");
            resolve(5)
        }, 2000);
    });

}

wait()
    .then(num1 => {
        console.log(num1)
        return wait()
    })
    .then(num2 => console.log(num2));