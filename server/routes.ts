import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

// Initialize Stripe with secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_51RvPZtBLYWlN2MSlNg46tNTIirQOn7rDGt1MZ8TLHMJx6gp9jXw5zEmWWdDW3Bufk7Cxb3DnOd9LSu7yZg8gySDU000aVfxRga";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  // Get featured products
  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeToNewsletter(validatedData);
      res.status(201).json({ message: "Successfully subscribed to newsletter", id: newsletter.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  // Stripe payment intent for checkout
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = "usd" } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata: {
          source: 'khaista-boutique'
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Payment intent creation failed:", error);
      res.status(500).json({ error: "Failed to create payment intent: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
