// PWA manifest definition
export default function manifest() {
    return {
        name: 'Checkngo',
        short_name: 'Checkngo',
        description: 'Verify Better. Forget forgeting',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/assets/icons/PWAlogo.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'any',
                form_factor: 'wide'  // ✅ Required for desktop
            },
            {
                src: '/assets/icons/PWAlogo.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
                purpose: 'any',
                form_factor: 'narrow'
            },
        ],
        screenshots: [
            {
                src: '/assets/icons/largeScreenshort.png',
                sizes: '1280x620',
                type: 'image/png',
                form_factor: 'wide'  
            },
            {
                src: '/assets/icons/smallScreenshort.png',
                sizes: '193x420',
                type: 'image/png'
            }
        ]
    }
}