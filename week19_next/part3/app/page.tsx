import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="text-lq w-screen h-screen flex justify-center items-center">
      Todo application
      <br />
      <Link href='/signup' className="bg-gray-400 border-2 rounded-2xl p-4">Signup</Link>
      <Link href='/signin' className="bg-amber-950 border-2 rounded-2xl p-4 ml-2">Signin</Link>
    </div>
  );
}
