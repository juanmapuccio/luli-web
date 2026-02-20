import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export interface CloudinaryImage {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
}

/**
 * Fetch images from a specific Cloudinary folder.
 * Uses the Admin API.
 */
export async function getImagesFromFolder(folderName: string): Promise<CloudinaryImage[]> {
    try {
        // Note: The Admin API is rate-limited. This runs during build time in Astro.
        const result = await cloudinary.search
            // Using quotes around folderName is crucial when it contains hyphens like 'luli-web'
            .expression(`folder:"${folderName}" AND resource_type:image`)
            .sort_by('public_id', 'asc') // Sort by filename alphabetically to maintain order
            .max_results(100)
            .execute();

        // Transform the original URLs to perfectly optimized delivery URLs automatically
        const optimizedImages = result.resources.map((res: any) => {
            // Build optimized URL: format auto, quality auto, width 1200 max.
            const optimizedUrl = cloudinary.url(res.public_id, {
                fetch_format: 'auto',
                quality: 'auto',
                width: 1200,
                crop: 'limit'
            });

            return {
                public_id: res.public_id,
                secure_url: optimizedUrl,
                width: res.width,
                height: res.height,
                format: res.format,
            };
        });

        return optimizedImages;
    } catch (error) {
        console.error(`Error fetching images from Cloudinary folder ${folderName}:`, error);
        return [];
    }
}
