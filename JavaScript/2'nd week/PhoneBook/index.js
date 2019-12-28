// // Телефонная книга
// var phoneBook = {};

// /**
//  * @param {String} command
//  * @returns {*} - результат зависит от команды
//  */
// module.exports = function (command) {
//     if(command.startsWith('ADD')){
//         var name = command.split(' ').slice(1)[0];
//         var phones = command.split(' ').slice(1)[1];
//         phones = phones.split(',');
//         if(!phoneBook.hasOwnProperty(name)){
//         phoneBook[name]={}
//     }
//         for (var i=0; i<phones.length;i++){
//             phoneBook[name][phones[i]]=1;
//         }
//         return phoneBook;
//     }
//     if(command.startsWith('REMOVE_PHONE')){
//         var phone = command.split(' ').slice(1)[0];
//         var names = Object.keys(phoneBook);
//         for(var i=0;i<names.length;i++){
//             if (phoneBook[names[i]].hasOwnProperty(phone)){
//                 delete phoneBook[names[i]][phone];
//                 return true;
//             }
//         }
//         return false;
//     }
//     if(command.startsWith('SHOW')){
//         var result=[];
//         var names = Object.keys(phoneBook);
//         for(var i=0;i<names.length;i++){
//             var phones = (Object.keys(phoneBook[names[i]])).join(', ');
//             if (phones){
//                 result.push(names[i]+': '+phones);
//             }
//         }
//         result.sort(function (a, b) {
//             return a.toLowerCase().localeCompare(b.toLowerCase());
//         });
//         return result;
//     }
// };
var phoneBook = {}

const PhoneBooks = new PhoneBook()

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    return operationSelection(command)
}

function operationSelection(query) {
    const commands = query.split('; ')

    for (let command of commands) {
        const data = command.split(' ')

        if (data[0] == 'ADD') {
            PhoneBooks.add(data[1], data[2])
        } else if (data[0] == 'REMOVE_PHONE') {
            return PhoneBooks.remove(data[1])
        } else if (data[0] == 'SHOW') {
            return PhoneBooks.show()
        } else {
            return undefined
        }
    }
}

/**
 * оболочка для работы с телефонной книгой
 */
function PhoneBook() {
    const self = this

    /**
     * добавление контакта || номеров телефона существующему контакту
     * @param {String} username
     * @param {String} data
     */
    self.add = function(username, data) {
        if (phoneBook.hasOwnProperty(username)) {
            const newPhones = data.split(',')

            newPhones.forEach(phone => {
                if (!phoneBook[username].split(',').includes(phone)) {
                    phoneBook[username] += `,${phone}`
                }
            })
        } else {
            phoneBook[username] = data
        }
    }

    /**
     * вывод контактов
     */
    self.show = function() {
        const contacts = []

        for (let contact in phoneBook) {
            contacts.push(`${contact}: ${phoneBook[contact].split(',').join(', ')}`)
        }

        return contacts.sort()
    }

    /**
     * удаление номера телефона
     * @param {String} value номер телефона
     */
    self.remove = function(value) {
        for (let phone in phoneBook) {
            if (phoneBook[phone].split(',').includes(value)) {
                let phones = phoneBook[phone].split(',')
                phones.splice(phones.indexOf(value), 1)
                phoneBook[phone] = phones.join(',')

                // удаляем ключ, если номера телефонов отсутствуют
                if (phoneBook[phone] == '') {
                    delete phoneBook[phone]
                }

                return true
            }
        }
        return false
    }
}
