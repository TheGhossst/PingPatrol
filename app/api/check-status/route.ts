import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    const startTime = performance.now()
    const response = await fetch(url)
    const endTime = performance.now()
    const responseTime = Math.round(endTime - startTime)

    return NextResponse.json({
      status: response.ok ? 'Up' : 'Down',
      statusCode: response.status,
      responseTime: responseTime
    })
  } catch (error) {
    return NextResponse.json({
      status: 'Down',
      statusCode: 0,
      responseTime: 0
    })
  }
}
