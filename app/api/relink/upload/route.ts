import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        contentType: file.type,
      }
    });
    
    uploadStream.end(buffer);
    
    return new Promise((resolve) => {
      uploadStream.on('finish', () => {
        resolve(NextResponse.json({ 
          fileId: uploadStream.id.toString(),
          filename: file.name,
          url: `/api/relink/upload/${uploadStream.id.toString()}`
        }, { status: 201 }));
      });
      
      uploadStream.on('error', (error) => {
        console.error('Upload error:', error);
        resolve(NextResponse.json({ error: 'Failed to upload file' }, { status: 500 }));
      });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const fileId = pathParts[pathParts.length - 1];
    
    if (!fileId || fileId === 'upload') {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    
    const chunks: Uint8Array[] = [];
    
    return new Promise((resolve) => {
      downloadStream.on('data', (chunk: Uint8Array) => {
        chunks.push(chunk);
      });
      
      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        // Get file info for content type
        bucket.find({ _id: new ObjectId(fileId) }).toArray().then((files) => {
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
