import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.LINKS_COLLECTION_NAME || 'links';
    const links = await db.collection(collectionName).find({}).sort({ order: 1 }).toArray();
    
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.LINKS_COLLECTION_NAME || 'links';
    
    const newLink = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(collectionName).insertOne(newLink);
    
    return NextResponse.json({ ...newLink, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.LINKS_COLLECTION_NAME || 'links';
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date(),
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    return NextResponse.json({ _id, ...updateData });
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.LINKS_COLLECTION_NAME || 'links';
    
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
