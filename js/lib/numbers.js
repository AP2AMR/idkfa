/* jslint node: true */
'use strict';

//
//	Numbers
//

var nt	= require('number-theory');
var pi	= require('pi-number');
var _	= require('underscore');

var N =
{
	"pi": function(length, decimal)
	{
		var p = [];
		if (decimal === 1) p = pi(length + 1, false).split('').map(Number); // Returns: 1, 4, 1, 5, 9, 2, 6, 5, 3, 5..
		else {p = pi(length, true); p = (p.slice(0, 1) + p.slice(2)).split('').map(Number);} // Returns: 3, 1, 4, 1, 5, 9, 2, 6, 5, 3..
		return p;
	},

	"prime": function(length)
	{
		var p = [];
		for (var i = 0, j = 0; j < length; i ++) if (nt.isPrime(i)) {p.push(i); j ++;}
		return p;
	},

	"phi": function(length)
	{
		var p = [];
		for (var i = 0; i < length; i ++) p.push(nt.eulerPhi(i));
		return p;
	},

	"fib": function (length)
	{
		var f = [0, 1];
		for (var i = f.length; i < length; i ++) f[i] = f[i - 2] + f[i - 1];
		return f;
	},

	"stream": function(char, length)
	{
		var s = [];
		for (var i = 0; i < length; i ++) s.push(char);
		return s;
	},

	"integer": function(length)
	{
		var n = [];
		for (var i = 0; i < length; i ++) n.push(i);
		return n;
	},

	"map": function (a, b, op, mod)
	{
		if (a.length !== b.length) return;

		mod = _.isNumber(mod) ? mod : 0;

		var calc =
		{
			"s": function (a, b, mod)
			{
				var s = [];
				for (var i = 0, ii = a.length; i < ii; i ++) s.push((a[i] + b[i]) + mod);
				return s;
			},

			"d": function (a, b, mod)
			{
				var d = [];
				for (var i = 0, ii = a.length; i < ii; i ++) d.push((a[i] - b[i]) + mod);
				return d;
			},

			"p": function (a, b, mod)
			{
				var p = [];
				for (var i = 0, ii = a.length; i < ii; i ++) p.push((a[i] * b[i]) + mod);
				return p;
			},

			"m": function (a, b, mod)
			{
				var m = [];
				for (var i = 0, ii = a.length; i < ii; i ++) m.push((a[i] % b[i]) + mod);
				return m;
			}
		};

		return calc[op](a, b, mod);
	},

	"weave": function (a, b, mod)
	{
		var w = [];
		for (var i = 0, ii = a.length; i < ii; i ++) {w.push(a[i]); w.push(b[i]);}
		return w;
	},

	"frequency": function (chars)
	{
		var f = {};
		for (var i = 0, ii = chars.length; i < ii; i ++) {var c = (_.isString(chars[i])) ? chars[i].toUpperCase() : chars[i]; f[c] = f[c] ? f[c] + 1 : 1;}
		return f;
	},

	"ioc": function (data)
	{
		// Clone data so original gets passed on unchanged.
		var clone = data.slice(0);

		// Filter word delimiter.
		clone = _.without(clone, '-');

		var charlen = clone.length;
		var frequency = this.frequency(clone);

		// Calculate denominator.
		_.each(frequency, function (a, b, c) {c[b] = c[b] * (c[b] - 1);});
		var baz = (_.values(frequency));
		for (var k = 0, sum = 0; k < baz.length; k ++) sum += baz[k];

		// Calculate and return Ioc.
		return sum / (charlen * (charlen - 1) / 29);
	}
};

module.exports = N;