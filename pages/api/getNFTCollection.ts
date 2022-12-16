import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import type { NextApiRequest, NextApiResponse } from "next";

// const getNFTCollection = async () => {
// 	await Moralis.start({
// 		apiKey: process?.env?.MORALIS_KEY,
// 		// ...and any other configuration
// 	});

// 	const address = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";

// 	const chain = EvmChain.ETHEREUM;

// 	const response = await Moralis.EvmApi.nft.getContractNFTs({
// 		address,
// 		chain,
// 	});

// 	console.log(response.toJSON());
// };

// getNFTCollection();

type ResponseData = {
	message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const { contract } = req.query;
	const getNFTCollection = async () => {
		await Moralis.start({
			apiKey: process?.env?.MORALIS_KEY,
			// ...and any other configuration
		});

		const address = `${contract}`;

		const chain = EvmChain.ETHEREUM;

		const response = await Moralis.EvmApi.nft.getContractNFTs({
			address,
			chain,
		});

		console.log(response.toJSON());
		return response.toJSON();
	};

	getNFTCollection();

	res.status(200).json({ message: "Ok!" });
}
