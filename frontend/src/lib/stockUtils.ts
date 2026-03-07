// Stock management utilities for Asian Basket

export interface ProductStock {
    productId: string;
    quantity: number;
    lastUpdated: string;
}

// Default stock levels for products (simulated inventory)
const DEFAULT_STOCK_LEVELS: Record<string, number> = {
    // Rice Bowls
    'rb1': 15,
    'rb2': 12,
    'rb3': 8,
    'rb4': 3, // Low stock!
    // Korean Fried Chicken
    'kfc1': 20,
    'kfc2': 4, // Low stock!
    'kfc3': 18,
    // Korean Tacos
    'kt1': 25,
    'kt2': 22,
    'kt3': 2, // Low stock!
    'kt4': 15,
    // Appetizers
    'app1': 10,
    'app2': 3, // Low stock!
    'app3': 12,
    // Kids Friendly
    'kf1': 30,
    'kf2': 8,
    'kf3': 5,
    'kf4': 4, // Low stock!
    // Desserts
    'des1': 20,
    'des2': 15,
    'des3': 3, // Low stock!
    'des4': 12,
    'des5': 8,
    'des6': 10,
    'des7': 6,
    'des8': 4, // Low stock!
    'des9': 25,
    'des10': 18,
    'des11': 14,
    'des12': 2, // Low stock!
    'des13': 10,
    'des14': 22,
    'des16': 9,
    'des17': 5,
    'des18': 11,
    'des19': 7,
    'des20': 13,
    // Beverages
    'bev1': 50,
    'bev2': 30,
    'bev3': 100,
};

const STOCK_KEY = 'asian_basket_stock';
const LOW_STOCK_THRESHOLD = 5;
const ADMIN_EMAIL = 'support@asianbasket.ie';

/**
 * Get current stock levels from localStorage or use defaults
 */
export function getStockLevels(): Record<string, number> {
    const saved = localStorage.getItem(STOCK_KEY);
    if (saved) {
        try {
            return { ...DEFAULT_STOCK_LEVELS, ...JSON.parse(saved) };
        } catch {
            return DEFAULT_STOCK_LEVELS;
        }
    }
    return DEFAULT_STOCK_LEVELS;
}

/**
 * Save stock levels to localStorage
 */
export function saveStockLevels(stock: Record<string, number>): void {
    localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
}

/**
 * Get stock quantity for a specific product
 */
export function getProductStock(productId: string): number {
    const stock = getStockLevels();
    return stock[productId] ?? 0;
}

/**
 * Check if product is low on stock
 */
export function isLowStock(productId: string): boolean {
    const quantity = getProductStock(productId);
    return quantity > 0 && quantity <= LOW_STOCK_THRESHOLD;
}

/**
 * Check if product is out of stock
 */
export function isOutOfStock(productId: string): boolean {
    return getProductStock(productId) <= 0;
}

/**
 * Get all low stock products
 */
export function getLowStockProducts(): { productId: string; quantity: number }[] {
    const stock = getStockLevels();
    return Object.entries(stock)
        .filter(([_, qty]) => qty > 0 && qty <= LOW_STOCK_THRESHOLD)
        .map(([productId, quantity]) => ({ productId, quantity }));
}

/**
 * Get stock status message for a product
 */
export function getStockStatusMessage(productId: string): string | null {
    const quantity = getProductStock(productId);

    if (quantity <= 0) {
        return 'Out of Stock';
    }

    if (quantity <= LOW_STOCK_THRESHOLD) {
        return `Only ${quantity} left!`;
    }

    return null;
}

/**
 * Decrease stock when order is placed
 */
export function decreaseStock(items: { id: string; quantity: number }[]): void {
    const stock = getStockLevels();

    items.forEach(item => {
        if (stock[item.id] !== undefined) {
            stock[item.id] = Math.max(0, stock[item.id] - item.quantity);
        }
    });

    saveStockLevels(stock);

    // Check for low stock alerts
    const lowStockItems = getLowStockProducts();
    if (lowStockItems.length > 0) {
        triggerLowStockAlert(lowStockItems);
    }
}

/**
 * Trigger low stock alert (logs to console - would send email in production)
 */
export function triggerLowStockAlert(
    lowStockItems: { productId: string; quantity: number }[]
): void {
    console.log(`[STOCK ALERT] Low stock notification for ${ADMIN_EMAIL}:`);
    console.log('Products with low stock:');
    lowStockItems.forEach(item => {
        console.log(`  - Product ${item.productId}: ${item.quantity} units remaining`);
    });

    // Store alert in localStorage for admin dashboard (future feature)
    const alertKey = 'asian_basket_stock_alerts';
    const existingAlerts = JSON.parse(localStorage.getItem(alertKey) || '[]');
    existingAlerts.push({
        timestamp: new Date().toISOString(),
        items: lowStockItems,
        emailSent: false // Would be true in production
    });
    localStorage.setItem(alertKey, JSON.stringify(existingAlerts.slice(-50))); // Keep last 50 alerts
}

/**
 * Reset stock to default levels (for testing/demo)
 */
export function resetStock(): void {
    localStorage.removeItem(STOCK_KEY);
}
