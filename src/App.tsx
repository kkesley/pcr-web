import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'
import RecipeList from './pages/RecipeList'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={['/', '/recipes']} exact>
            <RecipeList />
          </Route>
          <Route path="/recipes/:recipeId">
            <RecipeDetail />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
