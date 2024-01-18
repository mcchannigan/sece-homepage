import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('renders the main element', () => {
    render(<Home />)
 
    const main = screen.getByRole('main', {
      id: "main-container",
    })

    const studentHeading = screen.getByRole('heading', {
        name: "Students"
    })
 
    expect(main).toBeInTheDocument()
    expect(studentHeading).toBeInTheDocument()
  })

  it('renders the link sections', () => {
    //render
  })
})