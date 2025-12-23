import { type Product, type InsertProduct, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Newsletter
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.products = new Map();
    this.newsletters = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with the actual products from user's collection
    const initialProducts: Product[] = [
      // JEWELRY
      {
        id: randomUUID(),
        name: "Afghan MultiColor Choker Necklace",
        description: "Traditional Afghan choker necklace featuring intricate silver work with vibrant blue, pink, and green gemstone accents. Each piece tells a story of generations-old craftsmanship passed down through families.",
        price: "45.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista Afghan Choker Necklace_1755023346017.jpg",
        imageAlt: "Traditional Afghan choker necklace with colorful gemstone accents",
        inStock: 5,
        artisanStory: "Crafted by Fatima, a skilled artisan from Kabul who learned this traditional technique from her grandmother.",
        materials: "925 Sterling Silver, Natural Gemstones",
        dimensions: "Choker length: 16 inches adjustable",
        careInstructions: "Clean with soft cloth, avoid moisture",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Silver Coin Necklace",
        description: "Stunning traditional silver coin necklace with intricate engraved patterns and cascading fringe details. A masterpiece of Afghan jewelry craftsmanship.",
        price: "55.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista Afghan Coin Necklace_1755023218301.webp",
        imageAlt: "Traditional Afghan silver coin necklace with fringe details",
        inStock: 4,
        artisanStory: "Hand-engraved by master artisans in Herat using techniques passed down for generations.",
        materials: "925 Sterling Silver, Traditional Engraving",
        dimensions: "Necklace length: 18 inches, Coin diameter: 2 inches",
        careInstructions: "Store in dry place, clean with silver cloth",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Multicolor Crescent Necklace",
        description: "Magnificent traditional crescent necklace with intricate metalwork, colorful gemstones, and cascading chain fringe. A statement piece of Afghan heritage jewelry.",
        price: "45.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista Afghan Crescent Necklace_1755023511275.webp",
        imageAlt: "Traditional Afghan crescent necklace with gemstones and chain fringe",
        inStock: 3,
        artisanStory: "Created by skilled metalworkers in Kandahar, each piece requires weeks of detailed handwork.",
        materials: "Silver Alloy, Natural Gemstones, Traditional Chains",
        dimensions: "Crescent width: 8 inches, Total drop: 12 inches",
        careInstructions: "Handle with care, store flat, clean gently",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Green Choker and Earring Set",
        description: "Beautiful traditional jewelry set in emerald green with matching earrings and choker. Features intricate metalwork with green enamel accents and dangling details.",
        price: "70.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista Afghan Green set_1755023511280.jpg",
        imageAlt: "Afghan green jewelry set with matching earrings and choker",
        inStock: 4,
        artisanStory: "Handcrafted by women artisans in Balkh province, specializing in traditional enamel work.",
        materials: "Silver Alloy, Green Enamel, Traditional Metalwork",
        dimensions: "Choker: 16 inches, Earrings: 4 inches drop",
        careInstructions: "Avoid water, clean with dry cloth only",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Firoza Full Set",
        description: "Elaborate Afghan jewelry set featuring natural turquoise stones, traditional silver work, and ornate chain designs. A complete bridal set with headpiece, necklace, and arm pieces.",
        price: "100.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista afghan jewlery set firoza_1755023511281.jpg",
        imageAlt: "Complete Afghan turquoise jewelry set with headpiece and necklace",
        inStock: 2,
        artisanStory: "This elaborate set represents months of work by master jewelers with over 30 years of experience.",
        materials: "925 Sterling Silver, Natural Afghan Turquoise, Traditional Chains",
        dimensions: "Necklace: 20 inches, Headpiece: adjustable",
        careInstructions: "Store in dry place, clean with silver cloth",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Traditional Multicolor Necklace",
        description: "Stunning traditional Afghan necklace featuring cascading multicolored gemstones and intricate metalwork. This elegant piece showcases the timeless beauty of Afghan jewelry craftsmanship.",
        price: "100.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista multicolored necklace_1755032917521.webp",
        imageAlt: "Elegant multicolored Afghan necklace with cascading gemstones and gold metalwork on jewelry bust",
        inStock: 4,
        artisanStory: "Handcrafted by skilled artisans specializing in traditional Afghan jewelry design.",
        materials: "Gold-plated Metal, Pink Enamel, Traditional Beadwork",
        dimensions: "Adjustable sizing available",
        careInstructions: "Store in dry place, clean with soft cloth",
        featured: 0,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Traditional Multicolor Necklace Gold",
        description: "Elaborate traditional Afghan chest piece featuring vibrant multicolored beadwork, gold metalwork, and intricate chain details. This stunning statement piece showcases the rich artistry of Afghan jewelry traditions.",
        price: "100.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista Multicolored jewlery_1755032904942.webp",
        imageAlt: "Elaborate multicolored Afghan chest piece with gold chains, colorful beadwork, and traditional patterns",
        inStock: 6,
        artisanStory: "Created by a collective of women artisans, each bead is carefully selected and placed by hand.",
        materials: "Traditional Beads, Metalwork, Natural Dyes",
        dimensions: "Full chest coverage, adjustable straps",
        careInstructions: "Handle delicately, avoid moisture",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Pink Afghan Jewelry Set",
        description: "Stunning pink and gold jewelry set featuring intricate traditional Afghan patterns with beautiful dangling elements. This elegant set includes matching earrings and choker with exquisite beadwork and metalwork.",
        price: "165.00",
        category: "jewelry",
        imageUrl: "/assets/Khaista pink jewlery_1755032498608.webp",
        imageAlt: "Beautiful pink Afghan jewelry set with gold accents and traditional patterns",
        inStock: 7,
        artisanStory: "Handcrafted by skilled women artisans specializing in traditional Afghan jewelry, each piece showcases generations of metalworking expertise.",
        materials: "Gold-tone Metal, Pink Enamel, Traditional Beadwork, Intricate Chains",
        dimensions: "Choker: adjustable 14-18 inches, Earrings: 4 inches drop",
        careInstructions: "Store separately to avoid tangling, clean gently with soft cloth",
        featured: 1,
        createdAt: new Date()
      },

      // BAGS
      {
        id: randomUUID(),
        name: "Afghan Tote Bag",
        description: "Colorful traditional Afghan tote bag with vibrant embroidered patterns. Features yellow base with multicolored floral and geometric designs, perfect for daily use.",
        price: "45.00",
        category: "bags",
        imageUrl: "/assets/Khaista Afghan tote bag_1755023655517.jpg",
        imageAlt: "Colorful Afghan tote bag with embroidered patterns",
        inStock: 8,
        artisanStory: "Handwoven by artisans in rural villages, each bag supports local communities.",
        materials: "Cotton Canvas, Wool Embroidery, Natural Dyes",
        dimensions: "14 inches x 12 inches x 4 inches",
        careInstructions: "Spot clean only, air dry",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Vintage Pashtun Bag",
        description: "Authentic vintage-style Pashtun bag with intricate embroidered patterns and colorful tassels. Features traditional geometric designs in vibrant colors with blue pom-pom trim.",
        price: "35.00",
        category: "bags",
        imageUrl: "/assets/Khaista Afghan vintage pashtun bag_1755023655519.webp",
        imageAlt: "Vintage Pashtun bag with embroidered patterns and colorful tassels",
        inStock: 6,
        artisanStory: "Handwoven by artisans in tribal regions, preserving ancient weaving traditions.",
        materials: "Handwoven Cotton, Wool Embroidery, Traditional Tassels",
        dimensions: "8 inches x 6 inches",
        careInstructions: "Spot clean only, air dry, handle tassels gently",
        featured: 1,
        createdAt: new Date()
      },

      // CLOTHING
      {
        id: randomUUID(),
        name: "Silver and Blue Kochi Dress",
        description: "Elegant traditional Afghan Kochi dress in royal blue with intricate silver embroidery and mirror work. Complete with matching dupatta and traditional silhouette.",
        price: "150.00",
        category: "clothing",
        imageUrl: "/assets/Khaista blue and silver kochi dress_1755023655520.jpg",
        imageAlt: "Blue traditional Afghan Kochi dress with silver embroidery",
        inStock: 3,
        artisanStory: "Hand-embroidered by skilled artisans in Mazar-i-Sharif, this dress takes over 100 hours to complete.",
        materials: "Premium Cotton, Silver Thread Embroidery, Mirror Work",
        dimensions: "Available in sizes S-XL",
        careInstructions: "Dry clean only, iron on low heat",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Green and Pink Kochi Dress",
        description: "Stunning traditional dress featuring the classic green and red color combination with gold thread embroidery. Includes matching headscarf and traditional Afghan styling.",
        price: "150.00",
        category: "clothing",
        imageUrl: "/assets/Khaista Green and Red Kochi Dress_1755023707392.jpg",
        imageAlt: "Green and red traditional Afghan Kochi dress with gold embroidery",
        inStock: 2,
        artisanStory: "Created by a women's cooperative in Herat, preserving centuries-old embroidery techniques.",
        materials: "Silk Blend, Gold Thread, Hand-sewn Details",
        dimensions: "Available in sizes S-XL",
        careInstructions: "Professional dry clean recommended",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Multicolored Wedding Kochi Dress",
        description: "Exquisite traditional Afghan dress in rich teal with elaborate gold and silver embroidery. Features traditional Kochi styling with full skirt and detailed bodice work.",
        price: "350.00",
        category: "clothing",
        imageUrl: "/assets/Khaista Kochi Dress_1755023707394.webp",
        imageAlt: "Traditional Afghan Kochi dress with elaborate embroidery",
        inStock: 2,
        artisanStory: "Masterpiece created by award-winning artisans, representing the pinnacle of Afghan textile art.",
        materials: "Premium Silk, Gold/Silver Thread, Traditional Embroidery",
        dimensions: "Available in sizes S-XL",
        careInstructions: "Professional dry clean only, store flat",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Orange Kochi Dress",
        description: "Vibrant orange traditional Afghan dress with intricate embroidered medallions and traditional Afghan silhouette. Perfect for special occasions and cultural celebrations.",
        price: "150.00",
        category: "clothing",
        imageUrl: "/assets/Khaista orange kochi dress_1755023867408.jpg",
        imageAlt: "Orange traditional Afghan dress with embroidered medallions",
        inStock: 4,
        artisanStory: "Handcrafted by artisans specializing in traditional Afghan formal wear.",
        materials: "Cotton Blend, Embroidered Details, Traditional Styling",
        dimensions: "Available in sizes S-XL",
        careInstructions: "Gentle machine wash, air dry",
        featured: 0,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Pink and Gold Kochi Dress",
        description: "Elegant pink traditional Afghan dress with gold embroidery and decorative elements. Features the classic Kochi style with rich pink fabric and metallic accents.",
        price: "200.00",
        category: "clothing",
        imageUrl: "/assets/Khaista pink and gold kochi dress_1755023867413.jpg",
        imageAlt: "Pink and gold traditional Afghan Kochi dress",
        inStock: 3,
        artisanStory: "Created by master seamstresses known for their expertise in traditional Afghan formal wear.",
        materials: "Silk Cotton Blend, Gold Thread, Decorative Elements",
        dimensions: "Available in sizes S-XL",
        careInstructions: "Dry clean recommended, iron with care",
        featured: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Red and Blue Dress",
        description: "Traditional Afghan dress in rich red and blue with white embroidered patterns. Features authentic regional styling with geometric embroidery motifs.",
        price: "150.00",
        category: "clothing",
        imageUrl: "/assets/Khaista red and blue dress_1755023867413.jpg",
        imageAlt: "Red and blue traditional Afghan dress with white embroidery",
        inStock: 5,
        artisanStory: "Handmade by artisans preserving traditional regional dress styles of Afghanistan.",
        materials: "Cotton, White Thread Embroidery, Traditional Patterns",
        dimensions: "Available in sizes S-XL",
        careInstructions: "Gentle hand wash, air dry",
        featured: 0,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Men Kochi Vest",
        description: "Traditional Afghan men's vest with intricate gold embroidery on cream base. Features classic Afghan craftsmanship with decorative elements and traditional styling.",
        price: "75.00",
        category: "clothing",
        imageUrl: "/assets/Khaista men's afghan vest_1755023707395.jpg",
        imageAlt: "Traditional Afghan men's vest with gold embroidery",
        inStock: 6,
        artisanStory: "Crafted by skilled tailors specializing in traditional Afghan menswear.",
        materials: "Cotton Blend, Gold Thread Embroidery",
        dimensions: "Available in sizes M-XXL",
        careInstructions: "Dry clean preferred, store hung",
        featured: 0,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Afghan Bead Handbag",
        description: "Exquisite handcrafted Afghan clutch bag featuring intricate multicolored embroidery with geometric patterns. Perfect for special occasions and formal events.",
        price: "45.00",
        category: "bags",
        imageUrl: "/assets/Traditional Afghan bags_1755024555983.jpg",
        imageAlt: "Traditional Afghan clutch with colorful embroidery",
        inStock: 6,
        artisanStory: "Handcrafted by skilled artisans using traditional Afghan embroidery techniques passed down through generations.",
        materials: "Premium Fabric, Multi-colored Thread Embroidery, Gold Accents",
        dimensions: "10 x 6 inches",
        careInstructions: "Dry clean only, store in dust bag",
        featured: 0,
        createdAt: new Date()
      }
    ];

    initialProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured === 1);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      id,
      name: insertProduct.name,
      description: insertProduct.description,
      price: insertProduct.price,
      category: insertProduct.category,
      imageUrl: insertProduct.imageUrl,
      imageAlt: insertProduct.imageAlt || null,
      inStock: insertProduct.inStock || 0,
      artisanStory: insertProduct.artisanStory || null,
      materials: insertProduct.materials || null,
      dimensions: insertProduct.dimensions || null,
      careInstructions: insertProduct.careInstructions || null,
      featured: insertProduct.featured || 0,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribedAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
}

export const storage = new MemStorage();
