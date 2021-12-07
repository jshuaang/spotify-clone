import { getToken } from "next-auth/jwt";
import { NextResponse} from "next/server";

export async function middleware(req) {
    console.log(req)
    const token = await getToken({req, secret:process.env.JWT_SECRET});

    console.log(token);

    const {pathname} = req.nextUrl;

    console.log(pathname);

    if(pathname.includes("/api/auth") || token){
        return NextResponse.next();
    }

    if(!token && pathname !== "/login"){
        return NextResponse.redirect("/login");
    }
}