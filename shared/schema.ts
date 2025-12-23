import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // jewelry, dresses, bags
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt"),
  inStock: integer("in_stock").notNull().default(0),
  artisanStory: text("artisan_story"),
  materials: text("materials"),
  dimensions: text("dimensions"),
  careInstructions: text("care_instructions"),
  featured: integer("featured").notNull().default(0), // 0 or 1 for boolean
  createdAt: timestamp("created_at").defaultNow()
});

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow()
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  subscribedAt: true
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Cart item type for frontend
export interface CartItem {
  product: Product;
  quantity: number;
}
