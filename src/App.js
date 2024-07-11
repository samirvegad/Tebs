import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://jsonplaceholder.typicode.com/posts'

function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const formattedData = data.slice(0, 5).map(item => ({
        id: item.id,
        company: `Company ${item.userId}`,
        title: `Job Title ${item.id}`,
        dates: `Dates ${item.id}`,
        duties: [item.body]
      }))
      setJobs(formattedData)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className="section text-center my-5">
        <h1>Loading...</h1>
      </section>
    )
  }

  const { company, dates, duties, title } = jobs[value]
  return (
    <section className="section my-5">
      <div className="container">
        <div className="text-center">
          <h2>Experience</h2>
          <div className="underline mb-5"></div>
        </div>
        <div className="row">
          {/* btn container */}
          <div className="col-md-3 mb-4">
            <div className="btn-group-vertical w-100">
              {jobs.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setValue(index)}
                  className={`btn btn-outline-primary ${
                    index === value ? 'active' : ''
                  }`}
                >
                  {item.company}
                </button>
              ))}
            </div>
          </div>
          {/* job info */}
          <div className="col-md-9">
            <article className="job-info">
              <h3>{title}</h3>
              <h4 className="text-muted">{company}</h4>
              <p className="text-primary">{dates}</p>
              {duties.map((duty, index) => (
                <div key={index} className="job-desc mb-3">
                  <FaAngleDoubleRight className="text-primary mr-2" />
                  <p className="d-inline">{duty}</p>
                </div>
              ))}
            </article>
            <button type="button" className="btn btn-info mt-4">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
