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
  const {
    customerId,
    gameId,
    daysRented
  } = req.body

  try{

    const customerData = await db.query(`SELECT id, name FROM customers WHERE id = ${customerId}`)
    if(!customerData) return res.status(400)
    const gameData = await db.query(`SELECT id, name FROM games WHERE id = ${gameId}`)
    if(!gameData) return res.status(400)
    try {
      const result = await client.query({
        text: 'INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        values: [
          rentalData.customerId,
          rentalData.gameId,
          rentalData.rentDate,
          rentalData.daysRented,
          rentalData.returnDate,
          rentalData.originalPrice,
          rentalData.delayFee,
        ],
      });
  
      return result.rows[0];
    } catch (err) {
      console.error("Error inserting new game", err);
      throw err;
    } 
  
  
  
  }catch(err){}
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

