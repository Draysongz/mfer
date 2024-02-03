import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const NEXT_PUBLIC_URL = 'https://mfer-flame.vercel.app/';

const sdk = ThirdwebSDK.fromPrivateKey("30dde51d5d1f88add6e85935eb8f090fd89d8dc79faca2d00f196cdbfea82524", "base-sepolia-testnet",{
  secretKey:'w2JAM9-9TKVKS5e3OTl6GF2OjO_jzBsxVgP7UfnQxa1uUQCe6JOpm7Sdd3U2Dil87lVbXjYTRRv9hdzAYRB2Ng'
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

 const contract = await sdk.getContract('0xD5F14F5cF40a1e3372A7BA47Eb384BF61A9aaA74')

 const token= await contract.erc20.totalSupply()
 
let response;
 if(parseFloat(token.displayValue) > 0){
  const mintToWallet = await contract.erc20.mintTo(accountAddress, 1000000)
  if(mintToWallet){
    response = 'claimed 1m tokens'
  }else{
    response = 'error'
  }
 }
 


 

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Text:  ${response}`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/mfer.jpg`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
