// const Logger = require('./Logger')
const Database = require('better-sqlite3')
// const { logFileName } = require('./config')

// const logger = new Logger(logFileName)

class Archiver {
    constructor(databaseName) {
        this.db = new Database(databaseName, { verbose: console.log })
        this.stmt = null
    }

    select(query, params = [], all = false) {
        try {
            this.stmt = this.db.prepare(query)
    
            if (!all) return this.stmt.get(...params)
            return this.stmt.all(...params)
        } catch (error) {
            // logger.log({ author: 'Archiver', action: error.message })
        }
    }

    insert(query, params) {
        try {
            this.stmt = this.db.prepare(query)
            this.stmt.run(params)

            return this
        } catch (error) {
            // logger.log({ author: 'Archiver', action: error.message })
        }
    }

    update(query, params) {
        try {
            // Modify query to reflect updated_at timestamp
            // query = query.replace(' WHERE', ', updated_at = ? WHERE')
            // params = [...params.slice(0, params.length - 1), Date.now(), params[params.length - 1]]

            this.stmt = this.db.prepare(query)
            this.stmt.run(...params)

            return this
        } catch (error) {
            // logger.log({ author: 'Archiver', action: error.message })
        }
    }

    delete(query, params) {
        try {
            this.stmt = this.db.prepare(query)
            this.stmt.run(...params)

            return this
        } catch (error) {
            // logger.log({ author: 'Archiver', action: error.message })
        }
    }

    execute(query) {
        try {
            this.db.exec(query)

            return this
        } catch (error) {
            // logger.log({ author: 'Archiver', action: error.message })
        }
    }

    close() {
        this.db.close()
    }
}

module.exports = Archiver
