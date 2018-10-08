const db = require('sqlite')

module.exports = {
	getUser(uid) {
		return db.get("SELECT userName from users WHERE userName = ?", uid)
	},
	createUser(uid) {
		return db.run("INSERT INTO users (userName) VALUES (?)", uid)
	}
}