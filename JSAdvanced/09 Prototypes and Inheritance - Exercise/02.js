String.prototype.ensureStart = function (str){
    if(this.indexOf(str) === -1)
    {
       return str+this;
    }
  return this+'';
}

String.prototype.ensureEnd =function(str){
    if(this.indexOf(str) === -1)
    {
       return this+str;
    }
  return this+"";
}

String.prototype.isEmpty = function(){
    if(this.length ==0){
        return true;
    }
    return false;
}

String.format = function(formatted, ...params){
    
    for (var i = 0; i < params.length; i++) {
        formatted = formatted.replace(/{(\d+)}/gi, params[i]);
    }
    return formatted;
}

console.log(String.format('jumps {0} {1}','dog'));
