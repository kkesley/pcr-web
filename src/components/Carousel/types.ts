export interface CarouselItem {
    name: string
    imageUrl: string
}

export enum Direction {
    LEFT,
    RIGHT,
}

export interface CarouselNavigation {
    next: () => void
    previous: () => void
    activeIndex: number
    transitionDirection: Direction
}
