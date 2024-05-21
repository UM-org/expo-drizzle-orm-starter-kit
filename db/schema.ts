import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const players = sqliteTable('players', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    last_name: text('last_name', { length: 256 }),
    first_name: text('first_name', { length: 256 }),
    created_at: text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updated_at: text("updated_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export const gifts = sqliteTable('gifts', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }),
    initial_qty: integer('initial_qty', { mode: 'number' }).default(0),
    actual_qty: integer('actual_qty', { mode: 'number' }).default(0),
    created_at: text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updated_at: text("updated_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type SelectPlayer = typeof players.$inferSelect
export type InsertPlayer = typeof players.$inferInsert
export type SelectGift = typeof gifts.$inferSelect
export type InsertGift = typeof gifts.$inferInsert