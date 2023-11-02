import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    if (req.method === 'GET') {
        console.log(req.method, req.url);
    }
    // if (req.method === 'POST') {
    //     const data = await req.json()
    //     console.log(req.method, req.url, {data});        
    // }

}
    

export const config = {
    matcher: '/api/:path*',    
}