import { renderHook, act } from '@testing-library/react-hooks'
import { FullGestureState } from 'react-use-gesture/dist/types'
import { createDragHandler, getTransitionTransformStyle, useCarouselNavigation } from './ImageCarousel.helpers'
import { CarouselItem, Direction } from './types'

describe('ImageCarouselHelpers', () => {
    describe('getTransitionTransformStyle', () => {
        describe('Going to Right Direction', () => {
            it('should move from right when entering', () => {
                expect(getTransitionTransformStyle(Direction.RIGHT, true)).toEqual('translateX(100%)')
            })
            it('should move to left when leaving', () => {
                expect(getTransitionTransformStyle(Direction.RIGHT, false)).toEqual('translateX(-100%)')
            })
        })
        describe('Going to Left Direction', () => {
            it('should move from left when entering', () => {
                expect(getTransitionTransformStyle(Direction.LEFT, true)).toEqual('translateX(-100%)')
            })
            it('should move to right when leaving', () => {
                expect(getTransitionTransformStyle(Direction.LEFT, false)).toEqual('translateX(100%)')
            })
        })
    })

    describe('useCarouselNavigation', () => {
        function createMockItems(n: number): CarouselItem[] {
            return Array.from({ length: n }).map((_, index) => ({ name: `${index}`, imageUrl: `${index}` }))
        }
        describe('activeIndex', () => {
            test('calling next should modify activeIndex', () => {
                const { result } = renderHook(() => useCarouselNavigation(createMockItems(3)))

                // First item
                expect(result.current.activeIndex).toEqual(0)

                act(() => {
                    result.current.next()
                })

                // Slide to second item
                expect(result.current.activeIndex).toEqual(1)

                act(() => {
                    result.current.next()
                })

                // Slide to third item
                expect(result.current.activeIndex).toEqual(2)

                act(() => {
                    result.current.next()
                })

                // Slide to first item again
                expect(result.current.activeIndex).toEqual(0)
            })
            test('calling previous should modify activeIndex', () => {
                const { result } = renderHook(() => useCarouselNavigation(createMockItems(3)))

                // First item
                expect(result.current.activeIndex).toEqual(0)

                act(() => {
                    result.current.previous()
                })

                // Slide to third item
                expect(result.current.activeIndex).toEqual(2)

                act(() => {
                    result.current.previous()
                })

                // Slide to second item
                expect(result.current.activeIndex).toEqual(1)
            })
        })

        describe('Direction', () => {
            test('calling next should set transitionDirection to RIGHT', () => {
                const { result } = renderHook(() => useCarouselNavigation(createMockItems(3)))

                act(() => {
                    result.current.next()
                })
                expect(result.current.transitionDirection).toEqual(Direction.RIGHT)
            })
            test('calling previous should set transitionDirection to LEFT', () => {
                const { result } = renderHook(() => useCarouselNavigation(createMockItems(3)))

                act(() => {
                    result.current.previous()
                })
                expect(result.current.transitionDirection).toEqual(Direction.LEFT)
            })
            test('transitionDirection should change based on next / previous', () => {
                const { result } = renderHook(() => useCarouselNavigation(createMockItems(3)))

                act(() => {
                    result.current.previous()
                })
                expect(result.current.transitionDirection).toEqual(Direction.LEFT)

                act(() => {
                    result.current.next()
                })
                expect(result.current.transitionDirection).toEqual(Direction.RIGHT)
            })
        })
    })

    describe('dragHandler', () => {
        const onSwipeLeft = jest.fn()
        const onSwipeRight = jest.fn()
        const handler = createDragHandler({ onSwipeLeft, onSwipeRight })
        afterEach(() => {
            jest.clearAllMocks()
        })
        test('swiping left', () => {
            handler({ down: false, direction: [-10, 0], elapsedTime: 10 } as FullGestureState<'drag'>)
            expect(onSwipeLeft).toBeCalledTimes(1)
            expect(onSwipeRight).not.toBeCalled()
        })
        test('swiping right', () => {
            handler({ down: false, direction: [10, 0], elapsedTime: 10 } as FullGestureState<'drag'>)
            expect(onSwipeLeft).not.toBeCalled()
            expect(onSwipeRight).toBeCalledTimes(1)
        })
        test('tapping', () => {
            handler({ down: false, direction: [0, 0], elapsedTime: 10 } as FullGestureState<'drag'>)
            expect(onSwipeLeft).toBeCalledTimes(1)
            expect(onSwipeRight).not.toBeCalled()
        })
        test('tapping', () => {
            handler({ down: false, direction: [0, 0], elapsedTime: 10 } as FullGestureState<'drag'>)
            expect(onSwipeLeft).toBeCalledTimes(1)
            expect(onSwipeRight).not.toBeCalled()
        })
        test('ignoring double tap', () => {
            handler({ down: false, direction: [0, 0], elapsedTime: 1 } as FullGestureState<'drag'>)
            expect(onSwipeLeft).not.toBeCalled()
            expect(onSwipeRight).not.toBeCalled()
        })
        test('ignoring long press', () => {
            handler({ down: true, direction: [0, 0], elapsedTime: 10 } as FullGestureState<'drag'>)
            expect(onSwipeLeft).not.toBeCalled()
            expect(onSwipeRight).not.toBeCalled()
        })
    })
})
