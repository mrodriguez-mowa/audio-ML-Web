declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PGHOST: string
            PGUSER: string
            PGDATABASE: string
            PGPASSWORD: string
            PGPORT: number
            PWDCRYPT: string
        }

    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }