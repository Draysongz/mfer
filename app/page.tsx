import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = 'https://mfer-git-main-brandai.vercel.app';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Claim Airdrop',
      action: "post"
    },

    {
      label: 'support liquidity pool',
      action: 'post_redirect'
    }
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Mfer.xyz',
  description: 'A forcaster token',
  openGraph: {
    title: 'Mfer.xyz',
    description: 'A forcaster token',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
