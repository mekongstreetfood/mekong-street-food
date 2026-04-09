import { NextResponse } from "next/server";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (
    !apiKey ||
    !placeId ||
    apiKey === "COLLE_TA_CLE_ICI" ||
    placeId === "COLLE_TON_PLACE_ID_ICI"
  ) {
    return NextResponse.json({ reviews: null, configured: false });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=fr&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ reviews: null, configured: true, error: "fetch_failed" });
    }

    const data = await res.json();
    const reviews: GoogleReview[] = (data.result?.reviews ?? [])
      .filter((r: GoogleReview) => r.rating >= 4)
      .slice(0, 6);

    return NextResponse.json({
      reviews,
      rating: data.result?.rating,
      total: data.result?.user_ratings_total,
      configured: true,
    });
  } catch {
    return NextResponse.json({ reviews: null, configured: true, error: "exception" });
  }
}
