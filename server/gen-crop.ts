'use server'

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { actionClient } from '@/lib/safe-action'
import z from 'zod'

cloudinary.config({
	cloud_name: 'dzarpz5i8',
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})

const genFillSchema = z.object({
	activeVideo: z.string(),
	aspect: z.string(),
	height: z.string(),
})

async function checkImageProcessing(url: string) {
	try {
		const response = await fetch(url)
		if (response.ok) {
			return true
		}
		return false
	} catch (error) {
		return false
	}
}

export const genCrop = actionClient
	.schema(genFillSchema)
	.action(async ({ parsedInput: { activeVideo, aspect, height } }) => {
		const parts = activeVideo.split('/upload/')
		const fillUrl = `${parts[0]}/upload/ar_${aspect},c_fill,g_auto,h_${height}/${parts[1]}`
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
			return { error: 'Video processing failed' }
		}
		return { success: fillUrl }
	})
