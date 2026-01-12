import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch breeds" },
        { status: 500 }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch breeds" },
      { status: 500 }
    );
  }
}
