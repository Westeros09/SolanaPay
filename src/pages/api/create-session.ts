import { CandyPay } from "@candypay/checkout-sdk";
import type { NextApiHandler } from "next";

const sdk = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
  },
  network: "devnet", // use 'mainnet' for prod and 'devnet' for dev environment
  config: {
    collect_shipping_address: false,
  },
});

const handler: NextApiHandler = async (req, res) => {
    try {
      const response = await sdk.session.create({
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`,
        // additional SPL tokens, SOL and USDC are the supported tokens by default
        tokens: ["dust", "samo"],
        items: [
          {
            name: "Solana Shades",
            // price in USD
            price: 0.1,
            image: "https://imgur.com/M0l5SDh.png",
            quantity: 1,
            // optional product size parameter
            size: "9",
          },
        ],
        shipping_fees: 0.5,
      });
  
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error creating session",
      });
    }
  };
  
  export default handler;
