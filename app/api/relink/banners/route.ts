import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.BANNERS_COLLECTION_NAME || 'banners';
    const banners = await db.collection(collectionName).find({}).sort({ order: 1 }).toArray();
    
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.BANNERS_COLLECTION_NAME || 'banners';
    
    const newBanner = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(collectionName).insertOne(newBanner);
    
    return NextResponse.json({ ...newBanner, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json({ error: 'Banner ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.BANNERS_COLLECTION_NAME || 'banners';
    
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
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ _id, ...updateData });
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Banner ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('Relink');
    const collectionName = process.env.BANNERS_COLLECTION_NAME || 'banners';
    
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
