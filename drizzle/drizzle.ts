import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';

if (!process.env.DATABASE_URL) {
    throw new Error('The DATABASE_URL environment variable is required');
}

const connection = mysql.createConnection({
    uri: process.env.DATABASE_URL,
});

export const db = drizzle(connection);
export type Database = typeof db;
