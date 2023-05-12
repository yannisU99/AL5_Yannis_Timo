/* 
- Erlaubt die Kommunikation mit einer Datenbank via SQL und JavaScript zu Schulungszwecken.
- Muss auf der Web Page eingebunden werden, wo das Formular ist. 
- Sie müssen nicht im Detail verstehen, wie der Code funktioniert. 
Es reicht, wenn Sie wissen wie benutzen => siehe Demo https://jsfiddle.net/r_hatz/ya61n7xr/
*/

const databaseClient = {
  data: {
    url: "https://ict-290.herokuapp.com/sql",
    group: "teacher", // ändern Sie die Gruppe
    pw: "02bd77f9", // ändern Sie das Passwort
  },

  executeSqlQuery: async (sql) => {
    databaseClient.data.sql = sql;
    try {
      const response = await fetch(databaseClient.data.url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(databaseClient.data),
      });
      const result = await response.json();
      if (result.error) {
        throw result.error;
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  selectAll: async (tableName) => {
    const sql = `SELECT * FROM ${tableName}`;
    const data = await databaseClient.executeSqlQuery(sql);
    return data[1];
  },

  insertInto: async (tableName, fields, values) => {
    const sql = `INSERT INTO ${tableName} (${fields.join(
      ","
    )}) VALUES ('${values.join("','")}')`;
    return await databaseClient.executeSqlQuery(sql);
  },
};
