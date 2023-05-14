export default function  queryBuilder(tableName, params) {
    
    let query = `SELECT * FROM ${tableName}`

    if(tableName === 'customers'){
        query = `SELECT  id, name, phone , cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday  FROM  customers`;
    }


    return query

}