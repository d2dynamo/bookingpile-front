import Button from '@/components/Button';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-black">Boka ett rum</h1>
      <Button text="Boka" onClick={() => console.log('Boka')} />
    </main>
  );
}
