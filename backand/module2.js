const co=require('cli-color');

function give(name){
    
    return co.bgBlueBright(`${name}`)
}

module.exports=give;