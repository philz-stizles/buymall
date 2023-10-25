export interface Category {
    id: string;
    name: string;
    description: string;
    subCategories: string[]
    createdAt?: string;
    createdBy?: string;
}