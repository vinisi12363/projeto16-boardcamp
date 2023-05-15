export default function  queryBuilder(tableName, params) {
    
    let query = `SELECT * FROM ${tableName}`
     
    if(tableName === 'customers' && params > 0 || params !== undefined){
        query = `SELECT * FROM customers where id = ${params}`
     }
      
    else if(tableName === 'customers'){

        query = `SELECT  id, name, phone , cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday  FROM  customers`;
    
    }
    else if (tableName === 'games')
        query = `SELECT * FROM games`
    
    return query

}