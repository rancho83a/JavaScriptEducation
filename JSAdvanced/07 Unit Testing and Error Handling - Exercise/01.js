function request(obj){
    properties = ['method','uri', 'version', 'message']
    let  props=Object.keys(obj)
    for(let i=0; i<properties.length; i++){
        if(properties[i]!==props[i]){
            throw new Error (getInvalidMsg(properties[i]));
        }
    }

    requests = ['GET', 'POST', 'DELETE', 'CONNECT'];
    if(!requests.includes(obj.method) || !obj.method){
        throw new Error ('Invalid request header: Invalid Method');
    }

    let regex = /^([A-Z.a-z0-9]+|\*+)$/gm;

    if(!obj.uri || !regex.test(obj.uri) ){
     throw new Error ('Invalid request header: Invalid URI');
    }


    versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    if(!versions.includes(obj.version) || !obj.version){
        throw new Error ( 'Invalid request header: Invalid Version');
    }

   regex = /[<>\\&'"]/gm;
   if( regex.test(obj.message) ){
    throw new Error ( 'Invalid request header: Invalid Message');   
   }
    return obj;

    function getInvalidMsg(reason){
        if(reason=='uri'){
        return 'Invalid request header: Invalid URI'
        }
        return 'Invalid request header: Invalid '+reason[0].toUpperCase()+reason.substring(1);
    }
}


console.log(request(
    {
        method: 'GET',
        uri: 'svn.public.catalog',
        version: 'HTTP/1.1',
        message: 'ghj7$$$'
    }
));