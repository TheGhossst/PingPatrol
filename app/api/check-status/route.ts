import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    const startTime = Date.now()
    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD request to minimize data transfer
      cache: 'no-store',
    })
    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: response.ok ? 'Up' : 'Down',
      responseTime,
      statusCode: response.status,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      status: 'Down',
      responseTime: 0,
      error: 'Could not reach the website',
      timestamp: new Date().toISOString()
    }, { status: 200 }) // Still return 200 as this is an expected condition
  }
}
