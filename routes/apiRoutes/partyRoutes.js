const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// GET all parties
router.get("/parties", (req, res) => {
	const sql = `SELECT * FROM parties`;
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: rows,
		});
	});
});

// Update a candidates party
router.put("/candidate/:id", (req, res) => {
	const errors = inputCheck(req.body, "party_id");

	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `UPDATE candidates SET party_id = ?
                WHERE id = ?`;
	const params = [req.body.party_id, req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
		} else if (!result.affectedRows) {
			res.json({
				message: "Candidate not found",
			});
		} else {
			res.json({
				message: "success",
				data: req.body,
				changes: result.affectedRows,
			});
		}
	});
});

// Get party by id
router.get("/party/:id", (req, res) => {
	const sql = `SELECT * FROM parties WHERE id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, row) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: row,
		});
	});
});

// Delete a party
router.delete("/party/:id", (req, res) => {
	const sql = `DELETE FROM parties WHERE id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, results) => {
		if (err) {
			res.status(400).json({ error: err.message });
		} else if (!results.affectedRows) {
			res.json({
				message: "Party not found",
			});
		} else {
			res.json({
				message: "deleted",
				changes: results.affectedRows,
				id: req.params.id,
			});
		}
	});
});

module.exports = router;
