import React from 'react'
import styles from './IngredientPanel.module.css'

export default function IngredientPanel(): React.ReactElement | null {
    return (
        <div className={styles.container}>
            <h2 className="is-size-3 has-text-weight-bold">Ingredients</h2>
            <div className="content">
                <ul>
                    <li>Hello</li>
                    <li>Hello</li>
                    <li>Hello</li>
                    <li>Hello</li>
                </ul>
            </div>
        </div>
    )
}
