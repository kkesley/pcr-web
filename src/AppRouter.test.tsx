import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AppRouter from './AppRouter'

jest.mock('./pages/RecipeList', () => jest.fn(() => <div>recipe-list</div>))
jest.mock('./pages/RecipeDetail', () => jest.fn(() => <div>recipe-detail</div>))

describe('AppRouter', () => {
    describe('Routes', () => {
        const testCases = [
            { route: '/', expectedComponent: 'recipe-list' },
            { route: '/recipes', expectedComponent: 'recipe-list' },
            { route: '/recipes/pizza', expectedComponent: 'recipe-detail' },
        ]
        testCases.forEach(({ route, expectedComponent }) => {
            it(`renders expected component for route: "${route}"`, () => {
                const history = createMemoryHistory()
                history.push(route)
                const { getByText } = render(
                    <Router history={history}>
                        <AppRouter />
                    </Router>
                )
                const recipeDetail = getByText(expectedComponent)
                expect(recipeDetail).toBeInTheDocument()
            })
        })
    })
})
