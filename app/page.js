import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center"> 
        <h1 className="text-4xl font-bold">Welcome to Anestropedia Admin</h1>
        <p className="mt-4 text-lg">Manage your content effectively and efficiently.</p>
        <a
          href="/login"
          className="mt-8 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
