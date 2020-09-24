import React from 'react'
import { Route, Switch } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'
import RecipeList from './pages/RecipeList'

export default function AppRouter() {
    return (
        <Switch>
            <Route path={['/', '/recipes']} exact>
                <RecipeList data-testid="recipe-list" />
            </Route>
            <Route path="/recipes/:recipeId">
                <RecipeDetail />
            </Route>
        </Switch>
    )
}
