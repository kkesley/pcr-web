import React from 'react'
import classnames from 'classnames'
import { ImageCarousel } from '../components/Carousel'
import styles from './RecipeDetail.module.css'
import IngredientPanel from '../components/IngredientPanel'

export default function RecipeDetail(): React.ReactElement {
    return (
        <div className="section">
            <div className={classnames('container', styles.container)}>
                <div>
                    <IngredientPanel />
                </div>
                <div className={styles.bannerContainer}>
                    <div className={styles.bannerInnerContainer}>
                        <ImageCarousel
                            items={[
                                { name: 'Some Name', imageUrl: 'https://picsum.photos/seed/1/1280/720' },
                                { name: 'Some Name', imageUrl: 'https://picsum.photos/seed/2/1280/720' },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
