import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const breed = searchParams.get('breed');
  
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch images for ${breed}` },
        { status: 500 }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch images for ${breed}` },
      { status: 500 }
    );
  }
}






