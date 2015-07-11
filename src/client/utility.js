/*class Utility {
    static someVar = "bob";
}*/
// This doesn't seem the right way but I couldn't find anything about 
// static properties on ES6 classes (only static methods - didn't feel 
// like making some hacky export function or export class static method shenanigans)
var Utility = {
    CELL_SIZE: 16,
    WORLD_SIZE: 40,
    // TODO: is "parseInt" ES6? maybe import {parseInt} from 'Number'?
    pixelToCell: function (pixelAmount) {
        return parseInt(pixelAmount/Utility.CELL_SIZE);
    }, cellToPixel: function(cellAmount) {
        return parseInt(cellAmount*Utility.CELL_SIZE);
    }  
};

export default Utility;