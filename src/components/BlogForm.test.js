import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('new blog create form', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm />)

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('Create')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})