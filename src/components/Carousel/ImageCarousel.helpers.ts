import { useCallback, useMemo, useState } from 'react'
import { CarouselItem, CarouselNavigation, Direction } from './types'
import { Handler } from 'react-use-gesture/dist/types'

export function useCarouselNavigation(items: CarouselItem[]): CarouselNavigation {
    const [activeIndex, setActiveIndex] = useState(0)
    const [transitionDirection, setTransitionDirection] = useState(Direction.RIGHT)

    const next = useCallback(() => {
        setTransitionDirection(Direction.RIGHT)
        setActiveIndex((index) => (index + 1) % items.length)
    }, [items.length])
    const previous = useCallback(() => {
        setTransitionDirection(Direction.LEFT)
        setActiveIndex((index) => (index > 0 ? index - 1 : items.length - 1))
    }, [items.length])

    return useMemo(() => ({ next, previous, activeIndex, transitionDirection }), [next, previous, activeIndex, transitionDirection])
}

interface CreateDragHandlerArgs {
    onSwipeLeft: () => void
    onSwipeRight: () => void
}

export function createDragHandler({ onSwipeLeft, onSwipeRight }: CreateDragHandlerArgs): Handler<'drag'> {
    return ({ down, direction: [xDir], elapsedTime }) => {
        // check for elapsedTime because a tap will trigger this handler twice.
        // the second trigger would have an elapsedTime of ~0
        if (down || elapsedTime < 2) return
        if (xDir <= 0) {
            onSwipeLeft()
        } else if (xDir > 0) {
            onSwipeRight()
        }
    }
}

export function getTransitionTransformStyle(transitionDirection: Direction, isEntering: boolean): string {
    let sign = ''
    if ((transitionDirection === Direction.LEFT && isEntering) || (transitionDirection === Direction.RIGHT && !isEntering)) {
        sign = '-'
    }
    return `translateX(${sign}100%)`
}
