import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Counter from './counter'

describe('<Counter />', () => {
  it('properly increments and decrements the counter', () => {
    const { getByText } = render(<Counter />)
    const counter = getByText('0')
    const incrementButton = getByText('+')
    const decrementButton = getByText('-')

    fireEvent.click(incrementButton)
    expect(counter.textContent).toEqual('1')

    fireEvent.click(decrementButton)
    expect(counter.textContent).toEqual('0')
  })
})