import React from 'react'
import { ImageCarousel } from '../components/Carousel'

export default function RecipeDetail(): React.ReactElement {
    return (
        <div style={{ width: 200 }}>
            <ImageCarousel
                items={[
                    { name: 'Some Name', imageUrl: 'https://picsum.photos/seed/1/1280/720' },
                    { name: 'Some Name', imageUrl: 'https://picsum.photos/seed/2/1280/720' },
                ]}
            />
        </div>
    )
}
