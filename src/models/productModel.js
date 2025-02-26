const db = require("../config/database");
const CurrencyScraper = require("./currencyScraper");
const { validateId, validateObject } = require("../utils/validatorUtils");

class Product {
  static async getAll(limit = 100, offset = 0) {
    try {
      const [rows] = await db.execute(
        `
        SELECT
          p.id,
          p.name,
          p.description,
          p.divisa_id,
          ROUND(p.price, 2) AS price,
          ROUND(p.price/d.valor, 2) AS precio_en_dolares,
          ROUND(d.valor, 2) AS divisa_valor,
          p.stock
        FROM productos p
        JOIN divisas d ON p.divisa_id = d.id
        LIMIT ? OFFSET ?;
        `,
        [limit, offset]
      );
      console.log("Retrieved all products");
      return rows;
    } catch (error) {
      console.error(`Error retrieving all products: ${error.message}`);
      throw error;
    }
  }

  static async getById(id) {
    try {
      validateId(id);

      const [rows] = await db.execute("SELECT * FROM productos WHERE id = ?", [
        id,
      ]);

      if (rows.length === 0) {
        console.log(`No product found with id: ${id}`);
        return null;
      }

      console.log(`Retrieved product with id: ${id}`);
      return rows[0];
    } catch (error) {
      console.error(`Error retrieving product with id ${id}: ${error.message}`);
      throw error;
    }
  }

  static async create(product) {
    try {
      validateObject(product);

      const conn = await db.getConnection();
      await conn.beginTransaction();

      const [result] = await conn.execute("INSERT INTO productos SET ?", [
        product,
      ]);

      // Perform additional operations within the transaction if needed

      await conn.commit();
      console.log(`Created new product with id: ${result.insertId}`);
      return result.insertId;
    } catch (error) {
      if (conn) {
        await conn.rollback();
      }
      console.error(`Error creating product: ${error.message}`);
      throw error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  static async update(id, product) {
    try {
      validateId(id);
      validateObject(product);

      const [result] = await db.execute("UPDATE productos SET ? WHERE id = ?", [
        product,
        id,
      ]);

      if (result.affectedRows === 0) {
        console.log(`No product found with id: ${id} for update`);
        return 0;
      }

      console.log(`Updated product with id: ${id}`);
      return result.affectedRows;
    } catch (error) {
      console.error(`Error updating product with id ${id}: ${error.message}`);
      throw error;
    }
  }

  static async delete(id) {
    try {
      validateId(id);

      const [result] = await db.execute("DELETE FROM productos WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        console.log(`No product found with id: ${id} for deletion`);
        return 0;
      }

      console.log(`Deleted product with id: ${id}`);
      return result.affectedRows;
    } catch (error) {
      console.error(`Error deleting product with id ${id}: ${error.message}`);
      throw error;
    }
  }

  static async updateDollarValue() {
    try {
      await CurrencyScraper.scrapeDollarValue();
      console.log("Valor del dólar actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el valor del dólar:", error.message);
      throw error;
    }
  }
}

module.exports = Product;
