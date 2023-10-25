import { Category } from "./category";

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageSrc?: string;
    images?: string[];
    category?: Category;
    createdAt?: string;
    createdBy?: string;
}