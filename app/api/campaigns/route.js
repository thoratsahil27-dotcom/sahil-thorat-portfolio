import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let sheetUrl = searchParams.get('url');

  if (!sheetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Auto-convert sharing URL to CSV export URL
  if (sheetUrl.includes('docs.google.com/spreadsheets') && !sheetUrl.includes('export?format=csv')) {
    sheetUrl = sheetUrl.split('/edit')[0].split('/pub')[0] + '/export?format=csv';
  }

  try {
    const res = await fetch(sheetUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cache-Control': 'no-cache',
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Google returned ${res.status}` }, { status: 502 });
    }

    const csvText = await res.text();

    // If Google returned HTML (login page or disclaimer), return error
    if (csvText.trim().startsWith('<')) {
      return NextResponse.json({ error: 'Google returned HTML instead of CSV. Please publish the sheet.' }, { status: 502 });
    }

    return new NextResponse(csvText, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
