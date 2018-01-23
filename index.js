const Command = require('command'), fs = require('fs'), path = require('path');
const identified = require('./identified.js');
var chaise = false, log = '\r\n' + 'Start log', identfied = 'none';
const dir = path.join(__dirname, '..', '..', '..', 'logs');
var playerId = ['','','','',''], clas = ['','','','',''], name = ['','','','','']
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
module.exports = function FlyMore(dispatch) {
	loot_file = path.join(dir, 'log-ABNORMAL-' + Date.now() + '.log');
	const command = Command(dispatch);
	const chatHandler = event => {
		const message = event.message.replace(/(<([^>]+)>)/ig, '');
		switch (message) {
			case '!savelog':
				write(loot_file, log);
				log = '\r\n' + 'Start log';
				return false;
			case '!marker':
				log = log + '\r\n' + '[MARKER!!!]';
				return false;
		}
	}
	var abnormal
	dispatch.hook('C_WHISPER', 1, chatHandler);
	dispatch.hook('C_CHAT', 1, chatHandler);
	dispatch.hook('S_PARTY_MEMBER_LIST', 6, event => {
		party = {
			raid: event.raid,
		};
		if (party.raid == false) {
			pm = event.members.length
			//console.log('%j', 'Thats what are you looking for: ' + event.members[0].name);
			for (i = 0; i < pm; i++) {
				playerId[i] = event.members[i].playerId;
				clas[i] = event.members[i].class;
				name[i] = event.members[i].name;
			}
		};
	});
	dispatch.hook('S_PARTY_MEMBER_ABNORMAL_ADD', 3, event => {
		abnormal = {
			playerId: event.playerId,
			id: event.id
		};
		var time = new Date();
		var timeStr = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);
		for (i = 0; i < pm; i++) {
			if (abnormal.playerId === playerId[i]) {
				playerName = name[i];
				playerClass = clas[i];
				break;
			}
		}
		//if (playerClass == 0) {playerClass = 0}//'Warrior' ???
		//if (playerClass == 1) {playerClass = 1}//'Knight' ???
		if (playerClass == 2) {playerClass = 'Slayer'}//'Убийца''Slayer'
		//if (playerClass == 3) {playerClass = 3}//'Berserk' ???
		//if (playerClass == 4) { playerClass = 4 }
		//if (playerClass == 5) { playerClass = 5}//'Archer' ???
		//if (playerClass == 6) {playerClass = 6 }
		//if (playerClass == 7) { playerClass = 7 }//'Mystic' ???
		if (playerClass == 8) {playerClass = 'Reaper'}//'Жнец''Reaper'
		if (playerClass == 9) {playerClass = 'Engineer'}//'Инженер''Engineer'
		//if (playerClass == 10) { playerClass = 10}//'Crusher' ???
		if (playerClass == 11) { playerClass = 'Shinobi'}//'Шиноби''Shinobi'
		if (playerClass == 12) { playerClass = 'Valkyrie'}//'Валькирия''Valkyrie'
		identfied = 'none';
		z = Identified.unknown.length;
		for (i = 0; i < z; i++) {
			if (abnormal.id == Identified.unknown[i]) { identfied = 'unknown'; break;
			} else if (abnormal.id == Identified.Debuff[i]) { identfied = 'Debaff'; break;}
		}
		if (identfied == 'none') {
			log = log + '\r\n' + "[" + timeStr + "]" + ' Name: ' + playerName + ' Class: ' + playerClass + ' \
PlayerID: ' + abnormal.playerId + ' ID: ' + abnormal.id;
		} else {
			//log = log + '\r\n' + "[" + timeStr + "]" + ' Name: ' + playerName + ' Class: ' + playerClass + ' \
//PlayerID: ' + abnormal.playerId + ' ID: ' + abnormal.id + ' Identified: ' + identfied;
			}
	});
	function write(file, data) { fs.appendFileSync(file, data) }
}
