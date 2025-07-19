// 1. Define Swahilipot's geographical coordinates (latitude & longitude)
const swahilipotLat = -4.0672883;
const swahilipotLong = 39.682765;


function isWithinRadius(
    userLat: number,
    userLong: number,
    centerLat: number,
    centerLong: number,
    radiusInMeters: number
) : boolean {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180)

    const R = 6371000; // Earth's radius in meters

    // Calculate the differences in latitude and longitude (in radians)
    const dLat = toRadians(centerLat - userLat)
    const dLong = toRadians(centerLong - userLong)

    // Haversine formula to calculate the arc between two points on a sphere
    const a = 
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(userLat)) *
            Math.cos(toRadians(centerLat)) *
            Math.sin(dLong / 2) ** 2

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Angular distance in radians
    const distance = R * c // Convert to meters

    return distance <= radiusInMeters; // Return true if within allowed radius else false
}

// Function to get the user's current GPS coordinates
export function checkUserAtSwahilipot(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // Ensure the browser supports the Geolocation API
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by your browser")
            return resolve(false);
        }

        // Fetch user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLong = position.coords.longitude;
    
                // Compare user's coordinates agains Swahilipot(with a 200m allowance)
                const isInSwahilipot = isWithinRadius(
                    userLat,
                    userLong,
                    swahilipotLat,
                    swahilipotLong,
                    20000000
                );
    
                resolve(isInSwahilipot);
            },
            (error) => {
                // Handle any geolocation errors (denied permission, timeout, etc)
                console.error("Error getting location:", error.message);
                resolve(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    })
}