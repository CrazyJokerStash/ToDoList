const db = require('sqlite')

module.exports = {
	getAll() {
		return db.all("SELECT * FROM todos")
	},
	get(uid) {
		return db.get("SELECT * FROM todos WHERE userId = ?", uid)
	},
	create(userId, message, status, createdAt, updatedAt, completedAt) {
		return db.run("INSERT INTO todos (userId, message, status, createdAt, updatedAt, completedAt) VALUES (?, ?, ?, ?, ?, ?)", userId, message, status, createdAt, updatedAt, completedAt)
	},
	updateComplete(status, id, updatedAt, completedAt) {
		return db.run("UPDATE todos SET status = ?, updatedAt = ?, completedAt = ? WHERE ROWID = ?", status, updatedAt, completedAt, id)
	},
	updateOther(status, id, updatedAt) {
		return db.run("UPDATE todos SET status = ?, updatedAt = ? WHERE ROWID = ?", status, updatedAt, id)
	},
	delete(id) {
		return db.run("DELETE FROM todos WHERE ROWID = ?", id)
	}
}