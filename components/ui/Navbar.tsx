import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between py-8 px-1">
      <Link href={"/"} className="font-bold text-lg">
        Phone Book
      </Link>
      <p>©️ Alvin Fadli Dwi Mulya</p>
    </nav>
  );
}
