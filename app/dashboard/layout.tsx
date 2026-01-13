import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex gap-5'>
        <aside className="w-60 h-screen text-slate-800">
            <div className="bg-blue-800 px-10 p-4 h-30 text-3xl flex items-end text-white rounded">
                <h1>
                    DKB Scuba
                </h1>
            </div>
            <nav className="px-5 py-5">
                <Link href="/dashboard">
                    <li className="hover:bg-slate-200 p-2 mb-2 rounded">
                        예약현황
                    </li>
                </Link>
                <Link href="/dashboard/settings">
                    <li className="p-2 rounded hover:bg-slate-200 cursor-pointer">
                        예약하기
                    </li>
                </Link>
                <Link href="/dashboard/profiles">
                    <li className="p-2 rounded hover:bg-slate-200 cursor-pointer">
                        정보
                    </li>
                </Link>
            </nav>
        </aside>
        <div>{children}</div>
    </div>
  );
}
