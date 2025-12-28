import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    
    const downloadStream = bucket.openDownloadStream(new ObjectId(id));
    
    const chunks: Uint8Array[] = [];
    
    return new Promise((resolve) => {
      downloadStream.on('data', (chunk: Uint8Array) => {
        chunks.push(chunk);
      });
      
      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        // Get file info for content type
        bucket.find({ _id: new ObjectId(id) }).toArray().then((files) => {
          const file = files[0];
          const contentType = (file?.metadata as any)?.contentType || 'application/octet-stream';
          
          resolve(new NextResponse(buffer as any, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          }));
        });
      });
      
      downloadStream.on('error', (error) => {
        console.error('Download error:', error);
        resolve(NextResponse.json({ error: 'File not found' }, { status: 404 }));
      });
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
