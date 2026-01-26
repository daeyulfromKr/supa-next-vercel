'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AuthButton from "../components/auth-button";
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav>
      <div className="flex gap-2 text-sm">  
        <Link className={`link ${pathname === '/' ? 'active' : ''} text-red-500 underline`} href="/">
            Home
        </Link>
      </div>  
      <div className="flex gap-2 text-sm">  
        <Link
            className={`link ${pathname === '/admin' ? 'active' : ''} text-red-500 underline`}
            href="/admin"
        >        
            글쓰기
        </Link>
      </div>
      <AuthButton />
    </nav>
  )
}