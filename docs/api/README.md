
# Notify
  <a name="module_Notify..Notify"></a>

### Notify~Notify
**Kind**: inner class of <code>[Notify](#module_Notify)</code>  
**Friend**: BaseNotification  

* [~Notify](#module_Notify..Notify)
    * [.configure(config)](#module_Notify..Notify.configure)
    * [.setMailAccounts(accounts)](#module_Notify..Notify.setMailAccounts) ⇒
    * [.getMailConfirmNotification()](#module_Notify..Notify.getMailConfirmNotification) ⇒ <code>MailConfirmationNotification</code>

<a name="module_Notify..Notify.configure"></a>

#### Notify.configure(config)
Настройка модуля(логгера)

**Kind**: static method of <code>[Notify](#module_Notify..Notify)</code>  

| Param | Description |
| --- | --- |
| config | конфиг типа nconf |

<a name="module_Notify..Notify.setMailAccounts"></a>

#### Notify.setMailAccounts(accounts) ⇒
Передача почтовых аккаунтов, с которых будут слаться уведомления

**Kind**: static method of <code>[Notify](#module_Notify..Notify)</code>  
**Returns**: void  

| Param | Description |
| --- | --- |
| accounts | аккаунты для связки |

**Example**  
```js
let accounts = {
		mailConfirm: { // название нотификации
		mail: 'auth@istudentapp.ru', // какой адрес используем
			password: "quetbxdfpzhtsnid", // какой пароль к ящику
			htmlTemp: "/Users/anton/GitHub/Notify/templates/MailConfirm.html" // путь к шаблону письма
		},
		restorePassword: {
			mail: "auth@istudentapp.ru",
			password: "quetbxdfpzhtsnid"
		}
	};
Notify.setMailAccounts(accounts);
```
<a name="module_Notify..Notify.getMailConfirmNotification"></a>

#### Notify.getMailConfirmNotification() ⇒ <code>MailConfirmationNotification</code>
Получение класса для создания нотификации для подтверждения почты

**Kind**: static method of <code>[Notify](#module_Notify..Notify)</code>  
**Throws**:

- <code>ValidationError</code> , code = 500, Модуль Notify не был настроен(Notify.configure and Notify.setMailAccounts)

<a name="module_Notify..BaseNotification"></a>

### Notify~BaseNotification
Класс для представления нотификации по почте. Здесь определены
сеттеры/геттеры для нотификации, а также отправка в общем случае(без рендеринга сообщения)

**Kind**: inner class of <code>[Notify](#module_Notify)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subject | <code>String</code> | тема письма |
| cc | <code>Array.&lt;String&gt;</code> | массив адрессов в открытой копии |
| bcc | <code>Array.&lt;String&gt;</code> | массив адрессов в закрытой копии |
| type | <code>String</code> | тип нотификации(mailConfirm и тд) |
| html | <code>String</code> | html-содержимое письма |
| text | <code>Sting</code> | raw-содержимое пиьсма |
| attachment |  | массив прикрепленных докумнетов(не реализовано) |


* [~BaseNotification](#module_Notify..BaseNotification)
    * _instance_
        * [.setCc(addresses)](#module_Notify..BaseNotification+setCc)
        * [.setBcc(addresses)](#module_Notify..BaseNotification+setBcc)
        * [.setHtml(html)](#module_Notify..BaseNotification+setHtml)
        * [.setText(text)](#module_Notify..BaseNotification+setText)
        * [.setSubject(subject)](#module_Notify..BaseNotification+setSubject)
        * [.getType()](#module_Notify..BaseNotification+getType) ⇒ <code>String</code>
        * [.getHtml()](#module_Notify..BaseNotification+getHtml) ⇒ <code>String</code>
        * [.getText()](#module_Notify..BaseNotification+getText) ⇒ <code>String</code>
        * [.getSubject()](#module_Notify..BaseNotification+getSubject) ⇒ <code>String</code>
        * [.getCc()](#module_Notify..BaseNotification+getCc) ⇒ <code>Array.&lt;String&gt;</code>
        * [.getBcc()](#module_Notify..BaseNotification+getBcc) ⇒ <code>Array.&lt;String&gt;</code>
    * _static_
        * [.BaseNotification](#module_Notify..BaseNotification.BaseNotification)
            * [new BaseNotification()](#new_module_Notify..BaseNotification.BaseNotification_new)

<a name="module_Notify..BaseNotification+setCc"></a>

#### baseNotification.setCc(addresses)
Установка адресов в копию

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addresses | <code>Array.&lt;String&gt;</code> | адреса |

<a name="module_Notify..BaseNotification+setBcc"></a>

#### baseNotification.setBcc(addresses)
Установка адресов в скрытую копию

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addresses | <code>Array.&lt;String&gt;</code> | адреса |

<a name="module_Notify..BaseNotification+setHtml"></a>

#### baseNotification.setHtml(html)
Установка html-содержимого для письма

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>String</code> | html-содержимое |

<a name="module_Notify..BaseNotification+setText"></a>

#### baseNotification.setText(text)
Установка raw-содержимого для письма

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | raw-содержимое |

<a name="module_Notify..BaseNotification+setSubject"></a>

#### baseNotification.setSubject(subject)
Установка темы для письма

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>String</code> | subject-содержимое |

<a name="module_Notify..BaseNotification+getType"></a>

#### baseNotification.getType() ⇒ <code>String</code>
Получение типа

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
**Returns**: <code>String</code> - type  
<a name="module_Notify..BaseNotification+getHtml"></a>

#### baseNotification.getHtml() ⇒ <code>String</code>
Получение html-содержимого

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
**Returns**: <code>String</code> - html  
<a name="module_Notify..BaseNotification+getText"></a>

#### baseNotification.getText() ⇒ <code>String</code>
Получение raw-текста

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
**Returns**: <code>String</code> - text  
<a name="module_Notify..BaseNotification+getSubject"></a>

#### baseNotification.getSubject() ⇒ <code>String</code>
Получение темы

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
**Returns**: <code>String</code> - topic  
<a name="module_Notify..BaseNotification+getCc"></a>

#### baseNotification.getCc() ⇒ <code>Array.&lt;String&gt;</code>
Получение копии

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
**Returns**: <code>Array.&lt;String&gt;</code> - сс  
<a name="module_Notify..BaseNotification+getBcc"></a>

#### baseNotification.getBcc() ⇒ <code>Array.&lt;String&gt;</code>
Получение скрытой копии

**Kind**: instance method of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
**Returns**: <code>Array.&lt;String&gt;</code> - bсс  
<a name="module_Notify..BaseNotification.BaseNotification"></a>

#### BaseNotification.BaseNotification
**Kind**: static class of <code>[BaseNotification](#module_Notify..BaseNotification)</code>  
<a name="new_module_Notify..BaseNotification.BaseNotification_new"></a>

##### new BaseNotification()
Конструктор, создает новую нотификацию

<a name="module_Notify..MailConfirmationNotification"></a>

### Notify~MailConfirmationNotification ⇐ <code>BaseNotification</code>
Класс, представляющий нотификацию, отправляемую на почту, для подтверждения почты. Наследуется от Base

**Kind**: inner class of <code>[Notify](#module_Notify)</code>  
**Extends:** <code>BaseNotification</code>  

* [~MailConfirmationNotification](#module_Notify..MailConfirmationNotification) ⇐ <code>BaseNotification</code>
    * _instance_
        * [.sendToMany(users)](#module_Notify..MailConfirmationNotification+sendToMany) ⇒ <code>void</code>
        * [.sendToOne(user)](#module_Notify..MailConfirmationNotification+sendToOne) ⇒ <code>void</code>
    * _static_
        * [.MailConfirmationNotification](#module_Notify..MailConfirmationNotification.MailConfirmationNotification)
            * [new MailConfirmationNotification(link)](#new_module_Notify..MailConfirmationNotification.MailConfirmationNotification_new)

<a name="module_Notify..MailConfirmationNotification+sendToMany"></a>

#### mailConfirmationNotification.sendToMany(users) ⇒ <code>void</code>
Отправка уведомления нескольким пользователям

**Kind**: instance method of <code>[MailConfirmationNotification](#module_Notify..MailConfirmationNotification)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| users | <code>Array.&lt;String&gt;</code> | массив адресов для отправки |

<a name="module_Notify..MailConfirmationNotification+sendToOne"></a>

#### mailConfirmationNotification.sendToOne(user) ⇒ <code>void</code>
Отправка уведомления одному пользователю

**Kind**: instance method of <code>[MailConfirmationNotification](#module_Notify..MailConfirmationNotification)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | адрес для отправки |

<a name="module_Notify..MailConfirmationNotification.MailConfirmationNotification"></a>

#### MailConfirmationNotification.MailConfirmationNotification
**Kind**: static class of <code>[MailConfirmationNotification](#module_Notify..MailConfirmationNotification)</code>  
**Access:** public  
<a name="new_module_Notify..MailConfirmationNotification.MailConfirmationNotification_new"></a>

##### new MailConfirmationNotification(link)
Конструктор для MailConfirmationNotification


| Param | Description |
| --- | --- |
| link | ссылка для подтверждения почты(уже с вставленной почтой и ключом) Формат - host + /auth/confirmMail?mail=%s&key=%s |

