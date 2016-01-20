/* jslint node: true */
'use strict';

//
//	Gematria
//

var _ = require('underscore');

var G =
{

	// Fix me: Child arrays should really be objects for faster lookup.
	"forward": [["ᚠ", "F", 2], ["ᚢ", "U", 3], ["ᚦ", "TH", 5], ["ᚩ", "O", 7], ["ᚱ", "R", 11], ["ᚳ", "C", 13], ["ᚷ", "G", 17], ["ᚹ", "W", 19], ["ᚻ", "H", 23], ["ᚾ", "N", 29], ["ᛁ", "I", 31], ["ᛄ", "J", 37], ["ᛇ", "EO", 41], ["ᛈ", "P", 43], ["ᛉ", "X", 47], ["ᛋ", "S", 53], ["ᛏ", "T", 59], ["ᛒ", "B", 61], ["ᛖ", "E", 67], ["ᛗ", "M", 71], ["ᛚ", "L", 73], ["ᛝ", "(I)NG", 79], ["ᛟ", "OE", 83], ["ᛞ", "D", 89], ["ᚪ", "A", 97], ["ᚫ", "AE", 101], ["ᚣ", "Y", 103], ["ᛡ", "I(A/O)", 107], ["ᛠ", "EA", 109]],

	"reversed": [['ᚠ', 'EA', 109], ['ᚢ', 'I(A/O)', 107], ['ᚦ', 'Y', 103], ['ᚩ', 'AE', 101], ['ᚱ', 'A', 97], ['ᚳ', 'D', 89], ['ᚷ', 'OE', 83], ['ᚹ', '(I)NG', 79], ['ᚻ', 'L', 73], ['ᚾ', 'M', 71], ['ᛁ', 'E', 67], ['ᛄ', 'B', 61], ['ᛇ', 'T', 59], ['ᛈ', 'S', 53], ['ᛉ', 'X', 47], ['ᛋ', 'P', 43], ['ᛏ', 'EO', 41], ['ᛒ', 'J', 37], ['ᛖ', 'I', 31], ['ᛗ', 'N', 29], ['ᛚ', 'H', 23], ['ᛝ', 'W', 19], ['ᛟ', 'G', 17], ['ᛞ', 'C', 13], ['ᚪ', 'R', 11], ['ᚫ', 'O', 7], ['ᚣ', 'TH', 5], ['ᛡ', 'U', 3], ['ᛠ', 'F', 2]],

	"table" : [],

	"reverse": function() {this.table = this.reversed;},

	"reset": function()	{this.table = this.forward;},

	"shift": function(letter, offset, enc)
	{
		// Loop through Gematria.
		for (var i = 0, max = this.table.length; i < max; i ++)
		{
			// If letter is found in Gematria return the latin char at offset.
			if (this.table[i][0].indexOf(letter) === 0)
			{
				// Add index to offset to get the absolut offset.
				offset = offset + i;

				// If offset > table warp around.
				if (offset >= max) offset = offset % max;

				// If offset < 0 warp around.
				else if (offset < 0) {offset = max + (offset % max); if (offset === max) offset = 0;}

				else offset = offset % max;
			}
		}

		if (enc === 0) return this.table[offset][0];
		else if (enc === 2) return this.table[offset][2];
		else return this.table[offset][1];
	},

	"value": function (word, direction)
	{
		if (!_.isNumber(direction)) direction = 0;
		this.table = (direction === 1) ? this.reversed : this.forward;

		var chars = word.split('');

		for (var i = 0, sum = 0, ii = chars.length; i < ii; i ++) sum += this.shift(chars[i], 0, 2);

		return sum;
	}
};

module.exports = G;