import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Parkinson's Test
        </Link>
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </nav>
    </header>
  )
}

