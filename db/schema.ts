import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { Type } from '@sinclair/typebox';

export const players = sqliteTable('players', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    last_name: text('last_name', { length: 256 }),
    first_name: text('first_name', { length: 256 }),
    phone: text('phone', { length: 256 }),
    address: text('address', { length: 256 }),
    gift: text('gift', { length: 256 }),
    answers: text('answers', { mode: 'json' }),
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

export const insertPlayerSchema = createInsertSchema(players, {
    phone: Type.String({ minimum: 8, maximum: 8 }),
    last_name: Type.String(),
    first_name: Type.String(),
});

export const insertGiftSchema = createInsertSchema(gifts, {
    name: Type.String(),
    initial_qty: Type.Number({ minimum: 1 })
});

export type SelectPlayer = typeof players.$inferSelect
export type InsertPlayer = typeof players.$inferInsert
export type SelectGift = typeof gifts.$inferSelect
export type InsertGift = typeof gifts.$inferInsert