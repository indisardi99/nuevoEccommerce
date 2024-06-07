import { IProduct } from "@/types"
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getProducts() {
    try{
            const res = await fetch (`${apiUrl}/products`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                next:{revalidate: 3600}
            })
            const products: IProduct[] = await res.json()
            return products
    }catch (error:any) {
        console.log(error)
            throw new Error(error)
    }
} 

export async function getProductById(id: string) { 
    try{
        const products = await getProducts()
        const product = products.find((product)=> product.id.toString() === id)
        if(!product) throw new Error (`product non found`)
            return product
    }catch (error:any) {
            throw new Error(error)
    }
} 
