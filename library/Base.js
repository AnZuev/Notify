'use strict';
const ValidationError = require("@anzuev/studcloud.errors");
const logger = require("../libs/logger").getLogger();
const Notify = require("../index");

/**
 * @classdesc Класс для представления нотификации по почте. Здесь определены
 * сеттеры/геттеры для нотификации, а также отправка в общем случае(без рендеринга сообщения)
 * @class BaseNotification
 * @property subject {String} - тема письма
 * @property cc {String[]} - массив адрессов в открытой копии
 * @property bcc {String[]} - массив адрессов в закрытой копии
 * @property type {String} - тип нотификации(mailConfirm и тд)
 * @property html {String} - html-содержимое письма
 * @property text {Sting} - raw-содержимое пиьсма
 * @property attachment - массив прикрепленных докумнетов(не реализовано)
 */
class BaseNotification{
	/**
	 * Конструктор, создает новую нотификацию
	 * @returns {void}
	 */
	constructor(){
		this.subject = null;
		this.cc = null;
		this.bcc = null;
		this.type = null;
		this.html = null;
		this.text = null;
		this.attachments = null;
	}

}

/**
 * Отправка нотификации одному пользователю
 * @instance
 * @param user {String} - адрес для отправки
 */
BaseNotification.prototype.sendToOne = function*(user){
	yield* Notify.sendMailNotification(this, [user]);
};

/**
 * Отправка нотификации нескольким адресатам
 * @instance
 * @param users {String[]} - массив адресов для отправки
 */
BaseNotification.prototype.sendToMany = function*(users){
	yield* Notify.sendMailNotification(this, users);
};

/**
 * Установка адресов в копию
 * @param addresses {String[]} - адреса
 *
 */
BaseNotification.prototype.setCc = function(addresses){
	let res = [];
	addresses.forEach(function(element){
		res.push(element.replace(/\s+/g, ''));
	});
	this.cc = res.join(',');
};

/**
 * Установка адресов в скрытую копию
 * @param addresses {String[]} - адреса
 *
 */
BaseNotification.prototype.setBcc = function(addresses){
	let res = [];
	addresses.forEach(function(element){
		res.push(element.replace(/\s+/g, ''));
	});
	this.bcc = res.join(',');
};


/**
 * Установка html-содержимого для письма
 * @param html {String} - html-содержимое
 *
 */
BaseNotification.prototype.setHtml = function(html){
	this.html = html;
};

/**
 * Установка raw-содержимого для письма
 * @param text {String} - raw-содержимое
 *
 */
BaseNotification.prototype.setText = function(text){
	this.text = text;
};

/**
 * Установка темы для письма
 * @param subject {String} - subject-содержимое
 *
 */
BaseNotification.prototype.setSubject = function(subject){
	this.subject = subject;
};

/**
 * Получение типа
 * @returns type {String}
 */
BaseNotification.prototype.getType = function(){
	return this.type;
};

/**
 * Получение html-содержимого
 * @returns html {String}
 */
BaseNotification.prototype.getHtml = function(){
	return this.html;
};

/**
 * Получение raw-текста
 * @returns text {String}
 */
BaseNotification.prototype.getText = function(){
	return this.text;
};

/**
 * Получение темы
 * @returns topic {String}
 */
BaseNotification.prototype.getSubject = function(){
	return this.subject;
};

/**
 * Получение копии
 * @returns сс {String[]}
 */
BaseNotification.prototype.getCc = function(){
	return this.cc;
};

/**
 * Получение скрытой копии
 * @returns bсс {String[]}
 */
BaseNotification.prototype.getBcc = function(){
	return this.bcc;
};


module.exports = BaseNotification;