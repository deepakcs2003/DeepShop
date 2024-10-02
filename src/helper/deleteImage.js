import axios from 'axios';

const handleImageDelete = async (public_id) => {
    try {
        // Cloudinary API endpoint for image deletion
        const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/de2jtctdv/image/destroy`;

        // Making a POST request to Cloudinary API
        const response = await axios.post(cloudinaryDeleteUrl, null, {
            params: {
                // API Key and Public ID
                api_key: '993156951721222',
                public_id: public_id,
                // Optional: Signature (not included here for simplicity)
                timestamp: Math.floor(Date.now() / 1000),
            },
        });

        console.log("Deleted image with public_id:", public_id, response.data);
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
    }
};

export default handleImageDelete;
