// Delivery fee calculation utilities for Asian Basket

export interface CartItemWithMeta {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
    weight?: number; // weight in kg per unit
    isFrozen?: boolean;
}

export interface DeliveryBreakdown {
    baseFee: number;
    riceAttaOnlyFee: number;
    heavyAttaFee: number;
    outsideDublinFee: number;
    overweightFee: number;
    total: number;
    hasFrozenItems: boolean;
    isOutsideDublin: boolean;
    totalWeight: number;
    messages: string[];
}

// Dublin postal codes/areas
const DUBLIN_AREAS = [
    'dublin', 'dublin 1', 'dublin 2', 'dublin 3', 'dublin 4', 'dublin 5',
    'dublin 6', 'dublin 7', 'dublin 8', 'dublin 9', 'dublin 10', 'dublin 11',
    'dublin 12', 'dublin 13', 'dublin 14', 'dublin 15', 'dublin 16', 'dublin 17',
    'dublin 18', 'dublin 20', 'dublin 22', 'dublin 24',
    'd01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10',
    'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd20', 'd22', 'd24'
];

// Categories that are considered frozen
const FROZEN_CATEGORIES = [
    'frozen meat', 'frozen seafood', 'frozen', 'frozen foods', 'frozen essentials'
];

// Categories for rice and atta
const RICE_ATTA_CATEGORIES = [
    'rice', 'atta', 'flour', 'rice & atta', 'grains'
];

// Default weights by category (in kg)
const CATEGORY_WEIGHTS: Record<string, number> = {
    'rice': 5,
    'atta': 10,
    'rice & atta': 5,
    'grains': 2,
    'frozen meat': 1,
    'frozen seafood': 0.5,
    'vegetables': 0.5,
    'fruits': 0.5,
    'spices': 0.2,
    'default': 0.5
};

/**
 * Check if delivery address is outside Dublin
 */
export function isOutsideDublin(city: string, zipCode?: string): boolean {
    const normalizedCity = city.toLowerCase().trim();
    const normalizedZip = zipCode?.toLowerCase().trim() || '';

    // Check if city or zip contains any Dublin identifier
    const isInDublin = DUBLIN_AREAS.some(area =>
        normalizedCity.includes(area) || normalizedZip.startsWith(area.replace('dublin ', 'd'))
    );

    return !isInDublin;
}

/**
 * Check if item is frozen based on category or name
 */
export function isItemFrozen(item: CartItemWithMeta): boolean {
    if (item.isFrozen !== undefined) return item.isFrozen;

    const category = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();

    return FROZEN_CATEGORIES.some(fc => category.includes(fc) || name.includes('frozen'));
}

/**
 * Check if item is rice or atta
 */
export function isRiceOrAtta(item: CartItemWithMeta): boolean {
    const category = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();

    return RICE_ATTA_CATEGORIES.some(ra =>
        category.includes(ra) || name.includes('rice') || name.includes('atta') || name.includes('flour')
    );
}

/**
 * Check if item is 20kg atta
 */
export function is20kgAtta(item: CartItemWithMeta): boolean {
    const name = (item.name || '').toLowerCase();
    return (name.includes('atta') || name.includes('flour')) && name.includes('20kg');
}

/**
 * Get item weight in kg
 */
export function getItemWeight(item: CartItemWithMeta): number {
    if (item.weight !== undefined) return item.weight;

    const category = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();

    // Special handling for items with weight in name
    const weightMatch = name.match(/(\d+)\s*kg/i);
    if (weightMatch) {
        return parseInt(weightMatch[1], 10);
    }

    // Use category-based weight
    for (const [cat, weight] of Object.entries(CATEGORY_WEIGHTS)) {
        if (category.includes(cat)) {
            return weight;
        }
    }

    return CATEGORY_WEIGHTS.default;
}

/**
 * Calculate total weight of cart
 */
export function calculateTotalWeight(items: CartItemWithMeta[]): number {
    return items.reduce((total, item) => {
        return total + (getItemWeight(item) * item.quantity);
    }, 0);
}

/**
 * Check if order contains only rice and/or atta
 */
export function isRiceOrAttaOnlyOrder(items: CartItemWithMeta[]): boolean {
    if (items.length === 0) return false;
    return items.every(item => isRiceOrAtta(item));
}

/**
 * Check if cart has frozen items
 */
export function hasFrozenItems(items: CartItemWithMeta[]): boolean {
    return items.some(item => isItemFrozen(item));
}

/**
 * Count 20kg atta packs in cart
 */
export function count20kgAttaPacks(items: CartItemWithMeta[]): number {
    return items.reduce((count, item) => {
        if (is20kgAtta(item)) {
            return count + item.quantity;
        }
        return count;
    }, 0);
}

/**
 * Main delivery fee calculation function
 */
export function calculateDeliveryFee(
    items: CartItemWithMeta[],
    city: string,
    zipCode?: string,
    subtotal: number = 0
): DeliveryBreakdown {
    const messages: string[] = [];
    const outsideDublin = isOutsideDublin(city, zipCode);
    const frozen = hasFrozenItems(items);
    const totalWeight = calculateTotalWeight(items);
    const riceAttaOnly = isRiceOrAttaOnlyOrder(items);
    const attaPacks20kg = count20kgAttaPacks(items);

    let baseFee = 0;
    let riceAttaOnlyFee = 0;
    let heavyAttaFee = 0;
    let outsideDublinFee = 0;
    let overweightFee = 0;

    // Base delivery fee: Free for orders on and above €39.99 (Dublin), else €5.99
    if (!outsideDublin) {
        if (subtotal >= 39.99) {
            baseFee = 0;
            messages.push('Free delivery for orders €39.99 and above');
        } else {
            baseFee = 5.99;
        }
    }

    // Rice & Atta only orders: €3 delivery
    if (riceAttaOnly) {
        riceAttaOnlyFee = 3;
        baseFee = 0; // Override base fee
        messages.push('€3 delivery fee for rice/atta only orders');
    }

    // 20kg Atta handling fee: €1 per pack
    if (attaPacks20kg > 0) {
        heavyAttaFee = attaPacks20kg * 1;
        messages.push(`€${heavyAttaFee.toFixed(2)} handling fee for ${attaPacks20kg} x 20kg atta pack(s)`);
    }

    // Outside Dublin: €6.99 delivery
    if (outsideDublin) {
        outsideDublinFee = 6.99;
        baseFee = 0; // Override base fee
        messages.push('€6.99 delivery charge for outside Dublin');
    }

    // Weight over 28kg: +€6.99 for extra packaging
    if (totalWeight > 28) {
        overweightFee = 6.99;
        messages.push(`€6.99 extra packaging fee (order weight: ${totalWeight.toFixed(1)}kg exceeds 28kg limit)`);
    }

    const total = baseFee + riceAttaOnlyFee + heavyAttaFee + outsideDublinFee + overweightFee;

    return {
        baseFee,
        riceAttaOnlyFee,
        heavyAttaFee,
        outsideDublinFee,
        overweightFee,
        total,
        hasFrozenItems: frozen,
        isOutsideDublin: outsideDublin,
        totalWeight,
        messages
    };
}
