'use strict';

let log4js = require('log4js');
let isConfigured;

exports.configure = function(config){
	log4js.configure({
		appenders: [
			{ type: 'file', filename: config.get("logs:Notify:path") || './logs/Notify.log', category: config.get("logs:Notify:label") ||'Notify' },
			{ type: 'console' }
		]
	});
	isConfigured = true;
};

exports.getLogger = function(){
	if(!isConfigured){
		throw new Error('Notify logger has not been configured');
	}else{
		return log4js.getLogger('Notify');
	}
};