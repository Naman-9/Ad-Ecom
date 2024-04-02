import { CartItem, Order, Product, ShippingInfo, User } from "./types"

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

export type ProductResponse = {
    id: string;
    product: Product;
    
}

export type NewProductResponse = {
    id: string;
    formData: FormData;
    
}

export type UpdateProductResponse = {
    userId: string;
    productId: string;
    formData: FormData;
}

export type DeleteProductResponse = {
    userId: string;
    productId: string;
}


export type NewOrderRequest = {
    orderItems: CartItem[];  // not sended OrderItem bcoz mongo will add id as well
    shippingInfo: ShippingInfo; 
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    userId: string;

}
export type UpdateOrderRequest = {
    userId: string,
    orderId: string,

}


export type AllOrdersResponse = {
    success: boolean;
    orders: Product[];
}

export type OrderDetailsResponse = {
    success: boolean;
    orders: Order;
}

