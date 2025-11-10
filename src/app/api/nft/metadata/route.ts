import { createAlchemy } from '~/lib/alchemy';

import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractAddress = searchParams.get('contractAddress');
    const tokenId = searchParams.get('tokenId');
    const chainId = parseInt(searchParams.get('chainId') || '1');

    if (!contractAddress || !tokenId) {
      return NextResponse.json(
        { error: 'Contract address and token ID are required' },
        { status: 400 },
      );
    }

    // Initialize Alchemy SDK
    const alchemy = createAlchemy(chainId);

    // Fetch NFT metadata
    const nftMetadata = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
    );

    return NextResponse.json({
      metadata: nftMetadata,
      contractAddress,
      tokenId,
      chainId,
    });
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch NFT metadata',
        metadata: null,
      },
      { status: 500 },
    );
  }
}
