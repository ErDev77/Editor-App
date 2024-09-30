'use server'

import { checkImageProcessing } from '@/lib/check-processing'
import { actionClient } from '@/lib/safe-action'
import { v2 as cloudinary } from 'cloudinary'
import z from 'zod'

cloudinary.config({
	cloud_name: 'dzarpz5i8',
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINERY_SECRET,
})

const genFillSchema = z.object({
	activeImage: z.string(),
	aspect: z.string(),
	width: z.number(),
	height: z.number(),
})

export const genFill = actionClient
	.schema(genFillSchema)
	.action(async ({ parsedInput: { activeImage, aspect, width, height } }) => {
		const parts = activeImage.split('/upload/')
		const fillUrl = `${parts[0]}/upload/ar_${aspect},b_gen_fill,c_pad,w__${width},h_${height}/${parts[1]}`

		let isProcessed = false
		const maxAttempts = 20
		const delay = 1000
		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			isProcessed = await checkImageProcessing(fillUrl)
			if (isProcessed) {
				break
			}
			await new Promise(resolve => setTimeout(resolve, delay))
		}

		if (!isProcessed) {
			throw new Error('image processing timed out')
		}
		return { success: fillUrl }
	})
