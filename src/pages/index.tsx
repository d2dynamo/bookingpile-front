import LinkButton from '@/components/LinkButton';

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-stretch bg-gray-200 dark:bg-slate-800 min-h-screen max-h-screen">
      <h1 className="self-start text-7xl text-black dark:text-gray-100 m-10">
        Boka ett rum
      </h1>
      <LinkButton path="/rooms" name="Boka" className="mb-8 mx-10" />
    </main>
  );
}
