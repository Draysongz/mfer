import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const NEXT_PUBLIC_URL = 'https://mfer-flame.vercel.app/';

const sdk = ThirdwebSDK.fromPrivateKey("de802f340d595282df750e755365ea735f711e61da76c4e57e0c59f2dfdfd07d", "base",{
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

 const contract = await sdk.getContract('0x617De5c8DB69bBa93456e08a28A3D527185d9cA5')

 const token= await contract.erc20.balanceOf("0x89e535919088697495431f57B09951bb8dc7F8Fe")
 
let response;
 if(parseFloat(token.displayValue) > 200000000){
  const mintToWallet = await contract.erc20.transfer(accountAddress, 1000000)
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
