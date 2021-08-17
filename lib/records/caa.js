var validators = require('../validators');

 

function CAA(flag,tag,value) {

        let alltags=["issue","issuewild","iodef","contactemail","contactphone"];
        
        if (typeof(flag) !== 'number')
                throw new TypeError('flag (number) is required');

        if (!alltags.includes(tag))
                throw new TypeError('tag must be one of ["issue","issuewild","iodef","contactemail","contactphone"]'); 

        this.value = value;
        this.flag = flag;
        this.tag = tag;
        this._type = 'CAA';
        
}
module.exports = CAA;


CAA.prototype.valid = function CAA() {
        var self = this, model = {};
        model = {
                flag: validators.UInt8,
                tag: validators.nsText,
                value:validators.nsText2
        };
        return validators.validate(self, model);
};
