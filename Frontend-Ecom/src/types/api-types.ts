import { Product, User } from "./types"

export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    };
}

export type MessageResponse = {
    success: boolean;
    message: string;
}

export type UserResponse = {
    success: boolean;
    user: User;
}

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
}

export type categoriesResponse = {
    success: boolean;
    categories: string[];
}

export type searchProductsResponse = AllProductsResponse & {
    totalPage: number;
}

export interface SearchQueryRequest {
    search?: string;
    price?: number;
    category?: string;
    sort?: string;
    page?: number;
  }

export type NewProductResponse = {
    id: string;
    formData: FormData;
    
}