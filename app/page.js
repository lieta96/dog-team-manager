import Search from "./components/search";
export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/breeds`
  );
  const data = await response.json();
  const breeds = data.status === "success" ? Object.keys(data.message) : [];
  return (
    <>
      <h1 className="text-center">Breeds List</h1>
      {breeds.length > 0 ? (
        <Search breeds={breeds} />
      ) : (
        <p className="text-center text-xl">
          Sorry, there was an error.
          <br />
          Please try again later.
        </p>
      )}
    </>
  );
}
