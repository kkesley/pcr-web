import React from 'react'
import shallow from 'react-test-renderer/shallow'
import App from './App'

it('renders router and routes', () => {
    const renderer = shallow.createRenderer()
    const component = renderer.render(<App />)
    expect(component).toMatchSnapshot()
})
