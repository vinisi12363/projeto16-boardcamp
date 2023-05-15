import { db } from "../config/connectdbConfig.js"
import queryBuilder from './Utils/queryBuilder.service.js'
import dayjs from "dayjs"


async function searchRentals(params){
      const   { customerId,
      gameId,
      order,
      offset,
      limit,
      desc,
      status,
      startDate} = params

      try{db.query(`SELECT 
            rentals.id,
            rentals."customerId",
            rentals."gameId",
            TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
            rentals."daysRented",
            TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
            rentals."originalPrice",
            rentals."delayFee",
            JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game
          FROM 
            rentals
          INNER JOIN 
            customers ON rentals."customerId" = customers.id
          INNER JOIN 
            games ON rentals."gameId" = games.id
        `) }catch (err){
          res.status(500).send(err.message)
        }
}


export async function getRentals(req, res) {
  
    try {
      const { customerId, gameId, order, offset, limit, desc, status, startDate } = req?.query;
      const rentals = await searchRentals({
        customerId,
        gameId,
        order,
        offset,
        limit,
        desc,
        status,
        startDate,
      });
      res.status(200).send(rentals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

export async function insertRentals(req, res) {
    try {
     
      const { customerId, gameId, daysRented } = req.body;
      if(daysRented <= 0 ) return res.status(400).send("format error"); 
      
      let customerData = await db.query(`SELECT id, name FROM customers WHERE id = ${customerId}`);
      if (!customerData.rows.length) return res.status(400).send("Customer not found");
  
      let gameData = await db.query(`SELECT id, name, "pricePerDay", "stockTotal" FROM games WHERE id = $1`, [gameId]);
      if (!gameData.rows.length) return res.status(400).send("Game not found");
      console.log("gamedata: ", gameData)
      const rentDate = dayjs().format('YYYY-MM-DD');
      let returnDate = null;
      let originalPrice = gameData.rows[0].pricePerDay * daysRented;
      let delayFee = null;
     
      if(gameData.rows[0].stockTotal > 0){
        const result = await db.query({
          text: 'INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          values: [
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
          ],
        })
        try{
          await db.query(`UPDATE games SET "stockTotal" = "stockTotal" - 1 WHERE id = $1`, [gameId])
        } catch (err) {
          console.error("Error inserting new rental", err);
          throw err;
        }
      

        if (!result.rows.length) return res.status(500).send("Error inserting new rental")
        return res.status(200).send(result.rows[0])
     
      }else if(gameData.rows[0].stockTotal <= 0) {
          return res.status(400).send("erro jogo indisponivel")
      }
    

     
    } catch (err) {
      console.error("Error inserting new rental", err);
      throw err;
    }
  }
  
export async function calculateRentals(id, returnDate, delayFee) {
        try{
          const result = await client.query(
            'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3 RETURNING *',
            [returnDate, delayFee, id]
          )
          return result.rows[0]
        } catch (err) {
          res.status(500).send(err.message)
        }
}


export async function deleteRentalsById(req, res) {
    const {id} =req.params;
    try {
      await db.query (`DELETE FROM rentals WHERE id=$1`, [id])
    }catch(err){res.status(500).send(err.message)}
}

