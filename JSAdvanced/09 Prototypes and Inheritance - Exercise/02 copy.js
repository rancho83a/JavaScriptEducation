(function () {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return this.toString();
    }

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this.toString() + str;
        }
        return this.toString();
    }

    String.prototype.isEmpty = function () {
        return this.toString().length === 0;
    }

    String.prototype.truncate = function(n){
        if(this.toString().length<=n){
            return this.toString();
        }
        if(n<4){
            return '.'.repeat(n);
        }
        index = this.toString().substring(0,n-2).lastIndexOf(' ');
        //index = this.toString().lastIndexOf(' ');
        if(index>=0){
            return this.toString().substring(0,index)+'...';
        }
        return this.toString().substring(0,n-3)+'...';
    }
    
    String.format = function (formatted, ...params) {
        for (let i = 0; i < params.length; i++) {
            formatted = formatted.replace(`{${i}}`, params[i]);
        }
        return formatted;
    }
   
})()
console.log(String.format('jumps {0} {1}', 'dog'));
console.log(String.format('The {0} {1} fox',
'quick', 'brown'));
