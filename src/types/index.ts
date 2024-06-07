export interface IProduct {
        id:number;
        name: string;
        price: number;
        description: string;
        image: string;
        categoryId: number;
        stock: number;
        category?: string;
}

export interface ICategory {
    name: string;
}

export interface IValidateLogin {
    email: string;
    password: string
}

export interface IValidateError {
    email?: string;
    password?: string
}

export interface IValidateRegister {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
}

export interface IRegisterError {
    email?: string;
    password?: string
    name?: string;
    address?: string;
    phone?: string;
}

export interface IUserSession {
    token: string
    userData: {
        id:number;
        email: string;
        password: string;
        name: string;
        address: string;
        phone: string;
        role: string;
        order: []
    }
}

export interface IOrder {
   id:number;
   status: string;
   date: Date;
   products: IProduct[]
}