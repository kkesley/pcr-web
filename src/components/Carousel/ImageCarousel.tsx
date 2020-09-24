import React, { useRef } from 'react'
import { animated, useTransition, useSpring } from 'react-spring'
import { useHoverDirty } from 'react-use'
import { isMobile } from 'react-device-detect'
import { CarouselItem } from './types'
import { useCarouselNavigation, useSwipe, getTransitionTransformStyle } from './ImageCarousel.helpers'

interface CarouselProps {
    items: CarouselItem[]
}

export default function Carousel({ items }: CarouselProps): React.ReactElement | null {
    const ref = useRef(null)
    const isHovering = useHoverDirty(ref)
    const { next, previous, activeIndex, transitionDirection } = useCarouselNavigation(items)
    const bind = useSwipe({ onSwipeLeft: next, onSwipeRight: previous })

    const transitions = useTransition(activeIndex, {
        key: (p) => p,
        from: {
            opacity: 0,
            transform: getTransitionTransformStyle(transitionDirection, true),
        },
        enter: { opacity: 1, transform: 'translateX(0)' },
        leave: {
            opacity: 0,
            transform: getTransitionTransformStyle(transitionDirection, false),
        },
        config: { mass: 1, tension: 120, friction: 14, duration: 750 },
    })
    const buttonStyle = useSpring({ opacity: isHovering ? 1 : 0 })
    if ((items || []).length === 0) return null
    return (
        <div ref={ref}>
            {!isMobile && (
                <animated.button onClick={() => previous()} style={buttonStyle as any}>
                    <span className="icon is-size-3 is-small">
                        <i className="fas fa-chevron-left" />
                    </span>
                </animated.button>
            )}
            <figure {...bind()} className={`image is-${isMobile ? '4by5' : '16by9'}`}>
                {transitions((style, item) => (
                    <animated.img style={style as any} src={items[item].imageUrl || ''} alt={`Banner ${activeIndex}`} />
                ))}
            </figure>
            <div className="is-hidden">
                {items.map((carouselItem, index) => (
                    <img alt="Hidden Banner" key={`image-${index}`} src={carouselItem.imageUrl} />
                ))}
            </div>
            {!isMobile && (
                <animated.button onClick={() => next()} style={buttonStyle as any}>
                    <span className="icon is-size-3 is-small">
                        <i className="fas fa-chevron-right" />
                    </span>
                </animated.button>
            )}
        </div>
    )
}
