import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const { contract } = req.query;
	try {
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
	} catch (error) {
		res.status(404).json({ message: "Error!" });
	}
}
