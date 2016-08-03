'use strict';

let BaseNotification = require('./Base');
let Util = require("util");
let path = require("path");
let fs = require('mz/fs');
let ValidationError = require("@anzuev/studcloud.errors").ValidationError;
let Notify = require("../index");


/**
 * @classdesc Класс, представляющий нотификацию, отправляемую на почту, для подтверждения почты. Наследуется от Base
 * @class MailConfirmationNotification
 * @extends BaseNotification
 */
class MailConfirmationNotification extends BaseNotification{
	/**
	 * Конструктор для MailConfirmationNotification
	 * @param link - ссылка для подтверждения почты(уже с вставленной почтой и ключом) Формат - host + /auth/confirmMail?mail=%s&key=%s
	 * @public
	 * @return {void}
	 */
	constructor(link){
		super();
		if(!link){
			throw new ValidationError(400, "No link has been passed to MailConfirmationNotification constructor");
		}
		this.link = link;
	}

	/**
	 * @private
	 * @throws {Error} - не найден файл с шаблонов html
	 * @returns {void}
	 */
	*render(){
		super.setText("Для подтверждения почты перейдите по ссылке " + this.link);
		super.setSubject("Подтверждение почты");
		super.type = "mailConfirm";
		let html = yield fs.readFile(Notify.accounts[super.getType()].htmlTemp, "UTF-8");
		html = Util.format(html, this.link);
		super.setHtml(html);
	}

	/**
	 * Отправка уведомления нескольким пользователям
	 * @param users {String[]} - массив адресов для отправки
	 * @public
	 * @returns {void}
	 */
	*sendToMany(users){
		yield* this.render();
		yield* super.sendToMany(users);
	}
	/**
	 * Отправка уведомления одному пользователю
	 * @param user {String} - адрес для отправки
	 * @public
	 * @returns {void}
	 */
	*sendToOne(user){
		yield* this.render();
		yield* super.sendToOne(user);
	}
}



module.exports = MailConfirmationNotification;