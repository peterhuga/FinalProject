import * as SQLite from "expo-sqlite";


const database = SQLite.openDatabase("profile.db");

export function dbInit() {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS User (
                  id INTEGER PRIMARY KEY NOT NULL,
                  name TEXT, 
                  gender TEXT,
                  height INTEGER,
                  weight INTEGER
                )
                `,
          [],
          (tx, rsltSet) => {
            resolve(rsltSet);
          },
          (tx, err) => {
            reject(err);
          }
        );
      },
      (err) => {
        reject(err);
      },
      () => {
        console.log("Tx success.");
      }
    );
  });
}
export function dbGetProfile() {
    return new Promise((resolve, reject) => {
      database.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT id, name, gender, height, weight FROM User`,
            [],
            (tx, rsltSet) => {
              resolve(rsltSet);
            },
            (tx, err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        },
        () => {
          console.log("Add Tx success.");
        }
      );
    });
  }
  export function dbAddProfile(name, gender, height, weight) {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO Profile (name, gender, height, weight)
             VALUES(?,?,?,?)
            `,
          [name, gender, height, weight],
          (tx, rsltSet) => {
            resolve(rsltSet);
          },
          (tx, err) => {
            reject(err);
          }
        );
      },
      (err) => {
        reject(err);
      },
      () => {
        console.log("Tx success.");
      }
    );
  });
}
