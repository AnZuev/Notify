"use strict";
/**
 * @module Notify
 */
const ValidationError = require("@anzuev/studcloud.errors"),
	Util = require('util');
const NodeMailer = require('nodemailer');
const SmtpTransport = require('nodemailer-smtp-transport');
const P = require('bluebird');
let logger;

/**
 *
 * @class Notify
 * @friend BaseNotification
 */
class Notify{}


/**
 * Настройка модуля(логгера)
 * @param config - конфиг типа nconf
 *
 */
Notify.configure = function(config){
	Notify._config = config;
	require('./libs/logger').configure(config);
	logger = require("./libs/logger").getLogger();
	logger.info("Notify has been successfully configured and started");
};

/**
 * Передача почтовых аккаунтов, с которых будут слаться уведомления
 * @param accounts - аккаунты для связки
 * @example
 *  let accounts = {
 *		mailConfirm: { // название нотификации
 *		mail: 'auth@istudentapp.ru', // какой адрес используем
 *			password: "quetbxdfpzhtsnid", // какой пароль к ящику
 *			htmlTemp: "/Users/anton/GitHub/Notify/templates/MailConfirm.html" // путь к шаблону письма
 * 		},
 *		restorePassword: {
 *			mail: "auth@istudentapp.ru",
 *			password: "quetbxdfpzhtsnid"
 * 		}
 * 	};
 * Notify.setMailAccounts(accounts);
 * @return void
 */
Notify.setMailAccounts = function(accounts){
	Notify.accounts = accounts;
};


/**
 * Отправка нотификации notification пользователям users
 * @param notification - нотификация типа Base и дочерних
 * @param users - массив почтовых адресов для отправки
 * @private
 * @throws {ValidationError}, code = 500, Для данного типа не определен в accounts mail и password
 */
Notify.sendMailNotification = function*(notification, users){
	let from = Notify.accounts[notification.getType()].mail;
	let password = Notify.accounts[notification.getType()].password;
	if(!from || !password){
		let err = new ValidationError(500, Util.format("No mail or password specified for type %s", notification.getType()));
		logger.error(err);
		throw err;
	}

	let options = {
		debug: true,
		host: 'smtp.yandex.ru',
		port: 465,
		secure: true,
		auth: {
			user: from,
			pass: password
		},
		tls: {rejectUnauthorized: false}
	};
	let transport = NodeMailer.createTransport(SmtpTransport(options));
	var mail = P.promisifyAll(transport);
	//TODO uncomment when publish
	for(let i = 0; i < users.length; i++){
		try{
			let res = yield mail.sendMail({
				from: from,
				to: users[i],
				html: notification.getHtml(),
				text: notification.getText(),
				subject: notification.getSubject(),
				cc: notification.getCc(),
				bcc: notification.getBcc()
			});
			logger.info(res);
		}catch(err){
			logger.error(err);
		}
	}
};

/**
 * Получение класса для создания нотификации для подтверждения почты
 * @throws {ValidationError}, code = 500, Модуль Notify не был настроен(Notify.configure and Notify.setMailAccounts)
 * @returns {MailConfirmationNotification}
 */
Notify.getMailConfirmNotification = function(){
	if(!Notify.accounts){
		throw new ValidationError(500, "Can't get notification, module Notify hasn't been configured");
	}else{
		return require("./library/MailConfirmation");
	}
};


module.exports = Notify;


