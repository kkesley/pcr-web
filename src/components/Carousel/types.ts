export interface ICarouselItem {
    name: string
    imageUrl: string
}

export enum Direction {
    LEFT,
    RIGHT,
}

export interface ICarouselNavigation {
    next: () => void
    previous: () => void
    activeIndex: number
    transitionDirection: Direction
}
