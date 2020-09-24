import React, { useRef } from 'react'
import classnames from 'classnames'
import { animated, useTransition } from 'react-spring'
import { isMobile } from 'react-device-detect'
import { CarouselItem } from './types'
import { useCarouselNavigation, useSwipe, getTransitionTransformStyle } from './ImageCarousel.helpers'
import styles from './ImageCarousel.module.css'

interface CarouselProps {
    items: CarouselItem[]
}

export default function Carousel({ items }: CarouselProps): React.ReactElement | null {
    const ref = useRef(null)
    const { next, previous, activeIndex, transitionDirection } = useCarouselNavigation(items)
    const bind = useSwipe({ onSwipeLeft: next, onSwipeRight: previous })

    const transitions = useTransition(activeIndex, {
        key: (p) => p,
        from: {
            transform: getTransitionTransformStyle(transitionDirection, true),
        },
        enter: { transform: 'translateX(0%)' },
        leave: {
            transform: getTransitionTransformStyle(transitionDirection, false),
        },
        config: { mass: 1, tension: 120, friction: 14, duration: 750 },
    })
    if ((items || []).length === 0) return null
    return (
        <div className={styles.container} ref={ref}>
            {!isMobile && (
                <animated.button className={styles.navButton} onClick={() => previous()}>
                    <span className="icon is-size-3 is-small">
                        <i className="fas fa-chevron-left" />
                    </span>
                </animated.button>
            )}
            <figure {...bind()} className={classnames(`image is-${isMobile ? '4by5' : '16by9'}`, styles.image)}>
                {transitions((style, item) => (
                    <animated.img style={style as any} src={items[item].imageUrl || ''} alt={`Banner ${activeIndex}`} />
                ))}
                {items.map((carouselItem, index) => (
                    <img className="is-hidden" alt="Hidden Banner" key={`image-${index}`} src={carouselItem.imageUrl} />
                ))}
            </figure>
            {!isMobile && (
                <animated.button className={styles.navButton} onClick={() => next()}>
                    <span className="icon is-size-3 is-small">
                        <i className="fas fa-chevron-right" />
                    </span>
                </animated.button>
            )}
        </div>
    )
}
