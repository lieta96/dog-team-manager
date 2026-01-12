import DogsList from "@/app/components/dogsList";
export default async function BreedPage({ params }) {
  const { slug } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/images-by-breed?breed=${slug}`
  );
  const data = await response.json();
  const images = data.status === "success" ? data.message : [];
  return (
    <main className="flex flex-col gap-8 justify-between">
      <h1 className="text-center uppercase"> {slug}</h1>
      {images.length > 0 ? (
        <DogsList images={images} breed={slug} />
      ) : (
        <p className="text-center text-xl">
          Sorry, there was an error.
          <br />
          Please try again later.
        </p>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/breeds`
  );
  const data = await response.json();
  const breeds = data.status === "success" ? Object.keys(data.message) : [];
  return breeds.map((breed) => ({ slug: breed }));
}
