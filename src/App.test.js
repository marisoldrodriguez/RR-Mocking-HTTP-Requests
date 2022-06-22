import { render, screen, waitFor } from "@testing-library/react";
import App from './App'

beforeEach(() => {
    // sets everything back to initial state before each test
    fetch.resetMocks();
  })

test("receives GitHub name from GitHub REST API using jest fetch mock", async () => {
    fetch.mockResponseOnce(JSON.stringify({name: 'coder'}))
    render(<App />)
    const gitHubName = await waitFor(() => screen.getByRole('heading', { level: 2 }))
    expect(gitHubName).toHaveTextContent('coder')
})

describe('receives correct URL to GitHub REST API', () => {
    test("receives GitHub URL", async () => {
        fetch.mockResponseOnce(JSON.stringify({html_url: 'https://github.com/learningToCode1234'}))
        render(<App />)
        const gitHubURL = await waitFor(() => screen.getByRole('link'))
        expect(gitHubURL).toHaveAttribute('href', expect.stringContaining('github.com'))
    })
})

// Bonus
describe('receives correct URL image to GitHub REST API', () => {
    test('receives GitHub Image URL', async () => {
        fetch.mockResponseOnce(JSON.stringify({avatar_url: 'https://avatars.githubusercontent.com/u/13458148?v=4'}))
        render(<App />)
        const gitHubImageURL = await waitFor(() => screen.getByAltText('GitHub profile image'))
        expect(gitHubImageURL).toHaveAttribute('src', expect.stringContaining('githubusercontent'))
    })
})

