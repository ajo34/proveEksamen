import Database from 'better-sqlite3';
const db = new Database('nydalenvgs.db', { verbose: console.log });

export function getUsers() {
    const sql = db.prepare(`SELECT user.name, adress, phone, username, computer, role.name as roleID FROM user INNER JOIN role ON role.id = roleID`)
    const users = sql.all()
    console.log('users', users)
    return users
}

export function getUser(id) {
    console.log(id)
    const sql = db.prepare('SELECT id as userID, name, password FROM user WHERE user.id  = ?');
    const rows = sql.all(id)
    console.log(rows[0])
    return rows[0]
}

export function getUserByName(name) {
    console.log(name)
    const sql = db.prepare('SELECT user.id as userID, user.name, adress, phone, username, computer, password, role.name as roleID FROM user INNER JOIN role ON role.id = roleID WHERE user.name  = ?');
    const rows = sql.all(name)
    console.log(rows[0])
    return rows[0]
}

export function getRoleIDByName(name) {
    const sql = db.prepare('SELECT id FROM role WHERE name  = ?');
    const rows = sql.all(name)
    console.log(rows[0].id)
    return rows[0].id
}


//checks if a user already exists
export function userExists(username) {
    const sql = db.prepare(`SELECT name FROM user WHERE name = ?`)
    const user = sql.get(username)
    return user
}

export function createUser(name, adress, phone, username, computer, password, role) {
    let sql = db.prepare(`INSERT INTO user (name, adress, phone, username, computer, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    let user = sql.run(name, adress, phone, username, computer, password, role)
    
    sql = db.prepare(`
        SELECT user.name, 
        password
        FROM user
        WHERE user.id = ?`)
    
    
    user = sql.all(user.lastInsertRowid)
    console.log('row inserted', user)
    return user[0]
}

function testSQL(){
    
    let sql = db.prepare(`
        SELECT * FROM role`)
    
    
    let user = sql.all()
    console.log('row inserted', user)
    return user
}
testSQL()