import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../BlogForm'

test('new blog create form', async () => {
	const createBlog = jest.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={createBlog} />)

	const title = screen.getByPlaceholderText('write blog title here')
    const author = screen.getByPlaceholderText('write blog author here')
    const url = screen.getByPlaceholderText('write blog url here')
	const sendButton = screen.getByText('Create')

	await user.type(title, 'testing a title...')
    await user.type(author, 'testing an author...')
	await user.type(url, 'testing an url...')
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('testing a title...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing an author...')
	expect(createBlog.mock.calls[0][0].url).toBe('testing an url...')
})
