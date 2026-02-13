import { mysqlTable, serial, text, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  avatar: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})
