import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogList from '../BlogList'

test('renders content', () => {
    const blog = {
        title: 'Go To 12 Considered Harmful Edsger',
        author: 'W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }

    render(<BlogList blog={blog} />)

    const element = screen.getByText('Go To 12 Considered Harmful Edsger W. Dijkstra')
    const url = screen.queryByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    const likes = screen.queryByText(5)
    expect(element).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
})

test('clicking on the button opens the blog description', async () => {
    const blog = {
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }

    render(<BlogList blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const url = screen.getByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    const likes = screen.getByText(5)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test('double clicking on the like button', async () => {
    const blog = {
        title: 'Go To 12 Considered Harmful Edsger',
        author: 'W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }

    const mockHandler = jest.fn()

    render(<BlogList blog={blog} checkLikeClick={mockHandler}/>)

    const user = userEvent.setup()
    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const likesButton = screen.getByText('likes')
    await user.dblClick(likesButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})