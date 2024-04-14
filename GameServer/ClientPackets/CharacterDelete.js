const serverPackets = require('./../ServerPackets/serverPackets');
const ClientPacket = require("./ClientPacket");
const database = require('./../../Database');
const players = require('./../Models/Players');

class CharacterDelete {
	constructor(packet, client) {
    this._client = client;
		this._data = new ClientPacket(packet);
		this._data.readC()
      .readD();

		this._init();
	}

  get characterSlot () {
		return this._data.getData()[1];
	}

	async _init() {
    const player = players.getPlayerByClient(this._client);
    const characters = await database.getCharactersByLogin(player.login);
    const character = characters[this.characterSlot];

    await database.deleteCharacterByObjectId(character.objectId);
    
    this._client.sendPacket(new serverPackets.CharacterDeleteOk());
    this._client.sendPacket(new serverPackets.CharacterSelectInfo(player.login, await database.getCharactersByLogin(player.login))); // fix?
	}
}

module.exports = CharacterDelete;