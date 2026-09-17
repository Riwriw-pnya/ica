import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ image: null, description: null }, { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
      next: { revalidate: 86400 }, // Cache selama 24 jam
    });

    if (!res.ok) {
      return NextResponse.json({ image: null, description: null });
    }

    const html = await res.text();

    // 1. Ambil Open Graph Image (<meta property="og:image" content="...">)
    const ogImageMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

    let imageUrl = ogImageMatch ? ogImageMatch[1] : null;

    if (!imageUrl) {
      const imgMatch = html.match(/<img[^>]*src=["']([^"']+)["']/i);
      imageUrl = imgMatch ? imgMatch[1] : null;
    }

    if (imageUrl && !imageUrl.startsWith("http")) {
      const parsedUrl = new URL(targetUrl);
      imageUrl = new URL(imageUrl, parsedUrl.origin).href;
    }

    // 2. Ambil Open Graph Description (<meta property="og:description" content="...">)
    const ogDescMatch =
      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i) ||
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);

    const autoDescription = ogDescMatch ? ogDescMatch[1] : null;

    return NextResponse.json({ image: imageUrl, description: autoDescription });
  } catch (error) {
    return NextResponse.json({ image: null, description: null });
  }
}