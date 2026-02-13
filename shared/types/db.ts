import type { users } from '@nuxthub/db/schema'

export type User = typeof users.$inferSelect
