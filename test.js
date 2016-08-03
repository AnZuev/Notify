'use strict';

let Q = require('q');
let Notify = require("./index");




var mailBoxes = {
	mailConfirm: {
		mail: 'auth@istudentapp.ru',
		password: "quetbxdfpzhtsnid",
		htmlTemp: "/Users/anton/GitHub/Notify/templates/MailConfirm.html"
	},
	restorePassword: {
		mail: "auth@istudentapp.ru",
		password: "quetbxdfpzhtsnid"
	}

};
Notify.configure(require("./config"));
Notify.setMailAccounts(mailBoxes);

let Notification = require("./library/Base");
let MailNotification = require("./library/mailConfirmation");


let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");


Q.async(function*(){
	yield* not.sendToOne(["anzuev@istudentapp.ru"]);
})().done();



