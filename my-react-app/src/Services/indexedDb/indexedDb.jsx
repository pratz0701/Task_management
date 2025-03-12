//indexedDb that manages indexDb without encryption
import { openDB } from 'idb';

const dbName = 'Task_Manager';
const objectStoreKeyName = {
    userProfile:'userProfile',
    taskList:'taskList'
}

const dbPromise = openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(objectStoreKeyName.currentTransactionId)) {
        db.createObjectStore(objectStoreKeyName.currentTransactionId);
      }
      if (!db.objectStoreNames.contains(objectStoreKeyName.userProfile)) {
        db.createObjectStore(
            objectStoreKeyName.userProfile,
          { keyPath: 'userProfile' },
        );
      }
      if (!db.objectStoreNames.contains(objectStoreKeyName.taskList)) {
        db.createObjectStore(
            objectStoreKeyName.taskList,
          { keyPath: 'transactionId' },
        );
      }
      if (!db.objectStoreNames.contains(objectStoreKeyName.auth)) {
        db.createObjectStore(objectStoreKeyName.auth);
      }
      }
     
  });


const IndexDB = (ObjectStoreName = '') =>({
    get:  async function (key){
        const data = await (await dbPromise).get(`${ObjectStoreName}`, key);
        return data;
    },

    set: async function set(key) {
        return (await dbPromise).put(`${ObjectStoreName}`,key);
    },

    getFromIndex : async function getFromIndex(indexName) {
        const data = (await dbPromise).getFromIndex(`${ObjectStoreName}`,indexName);
        return data;
    },

    del: async function del(key) {
        return (await dbPromise).delete(`${ObjectStoreName}`, key);
      },
    clear: async function clear() {
        return (await dbPromise).clear(`${ObjectStoreName}`);
      },
    dbPromise,

});

export default IndexDB;

export  {objectStoreKeyName};