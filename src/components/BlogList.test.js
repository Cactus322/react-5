import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'

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
