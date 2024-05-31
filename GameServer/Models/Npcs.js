const Npc = require('./Npc');
const npcsData = require('./../data/npc.json');
const database = require('./../../Database');

class Npcs {
  constructor() {
    this._npcs = [];
  }

  getSpawnedNpcs() {
    return this._npcs;
  }

  getNpcByObjectId(objectId) {
    const npc = this._npcs.find(npc => npc.objectId === objectId);

    return npc;
  }

  spawn() {
    npcsData.forEach(async npcData => {
      const npc = new Npc();

      npc.update(npcData);

      // fix
      npc.objectId = await database.getNextObjectId();
      npc.x = -71061;
      npc.y = 257191;
      npc.z = -3115;

      this._npcs.push(npc);
    });
  }
}

module.exports = new Npcs();