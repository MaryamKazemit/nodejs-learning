export default "test string"

// if used export before functions no need for the end export obj
// export function add(a,b){
//     return a+b;
// }

// export function subTrack(a,b){
//     return a-b;
// }

function add(a,b){
    return a+b;
}

function subTrack(a,b){
    return a-b;
}

export{
    add,
    subTrack
}