export interface Category {
    id: string;
    name: string;
    description: string;
    isPublished: boolean;
    subCategories: string[]
    createdAt?: string;
    createdBy?: string;
}