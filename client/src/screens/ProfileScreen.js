import axios from 'axios'
import { useState, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteReference,
  deleteSkill
} from '../actions/userActions'

const ProfileScreen = ({ match }) => {
  const [userDetails, setUserDetails] = useState(null)
  const { userInfo } = useSelector((state) => state.userLogin)
  const id = Number(match.params.profile)

  const [refresh, setRefresh] = useState(false)

  const dispatch = useDispatch()

  const handleEducationDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteEducation(id))
    setRefresh(!refresh)
  }

  const handleProjectnDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteProject(id))
    setRefresh(!refresh)
  }

  const handleSkillDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteSkill(id))
    setRefresh(!refresh)
  }

  const handleReferenceDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteReference(id))
    setRefresh(!refresh)
  }

  const handleExperienceDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteExperience(id))
    setRefresh(!refresh)
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/users/' + match.params.profile)
        // console.log(data)
        setUserDetails(data)
        // console.log(userInfo?.user?.id)
        // console.log(match.params.profile)
      } catch (error) {
        // console.log(error.response.data.message)
      }
    }
    getUser()
  }, [match.params.profile, refresh])

  return (
    <Col md={12} lg={9} className='px-3'>
      {userDetails && (
        <Container fluid>
          <Row className='card shadow bg-portfolio my-3'>
            <div className='d-flex flex-column-reverse flex-md-row'>
              <Col className='d-flex flex-column justify-content-center align-items-center align-items-md-start my-3 mx-2 mx-md-4'>
                <i className='fas fa-user' style={{ fontSize: '150px' }}></i>
                <h1>{userDetails?.name}</h1>
                <h5 className='text-muted'>{userDetails?.email}</h5>
                <p>Date of birth: {userDetails?.dob}</p>
              </Col>
              {userInfo?.user?.id === id && (
                <div className='ms-auto'>
                  <Link to='/profile/edit'>
                    <i className='fas fa-edit p-2 rounded-circle text-dark'></i>
                  </Link>
                </div>
              )}
            </div>
          </Row>
          <Row className='d-flex justify-content-center align-items-center my-3 py-3 card shadow bg-portfolio flex-row'>
            <div className='d-flex flex-row justify-content-between'>
              <h3 className='px-3'>Education</h3>
              {userInfo?.user?.id === id && (
                <div>
                  <Link to='/profile/educations'>
                    <i className='fas fa-plus p-2 rounded-circle text-dark'></i>
                  </Link>
                </div>
              )}
            </div>
            {userDetails?.educations?.map((education) => (
              <Col
                key={education.id}
                sm={12}
                md={5}
                // lg={4}
                className='d-flex flex-column justify-content-center align-items-start m-1 '>
                <Card
                  className='px-3 py-2 py-md-4 rounded shadow'
                  style={{ width: '100%' }}>
                  <div className='d-flex flex-column-reverse flex-md-row justify-content-between'>
                    <div>
                      <h5>{education.name}</h5>
                      {education.website && <p>{education.website}</p>}
                      <p>
                        From: {education.start_date}-
                        {education.end_date ?? 'Present'}
                      </p>
                    </div>
                    {userInfo?.user?.id === id && (
                      <div className='ms-auto'>
                        <Link to={`/educations/${education.id}`}>
                          <i className='fas fa-edit p-2 rounded-circle text-dark'></i>
                        </Link>
                        <i
                          className='fas fa-trash p-2 rounded-circle text-danger'
                          onClick={(e) =>
                            handleEducationDelete(e, education.id)
                          }></i>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className='d-flex justify-content-center align-items-center my-3 py-3 card shadow bg-portfolio flex-row'>
            <div className='d-flex flex-row justify-content-between'>
              <h3 className='px-3'>Work Experience</h3>
              {userInfo?.user?.id === id && (
                <div>
                  <Link to='/profile/work_experiences'>
                    <i className='fas fa-plus p-2 rounded-circle text-dark'></i>
                  </Link>
                </div>
              )}
            </div>
            {userDetails?.work_experiences?.map((work_experience) => (
              <Col
                key={work_experience.id}
                sm={12}
                md={5}
                // lg={4}
                className='d-flex flex-column justify-content-center align-items-start m-1 '>
                <Card className='p-3 rounded shadow' style={{ width: '100%' }}>
                  <div className='d-flex flex-column-reverse flex-md-row justify-content-between'>
                    <div>
                      <h5>{work_experience.company_name}</h5>
                      {work_experience.website && (
                        <p>{work_experience.website}</p>
                      )}
                      <p className='text-muted fst-italic'>
                        {work_experience.designation}
                      </p>
                      <p className='text-muted'>
                        {work_experience.description}
                      </p>
                      <p>
                        From: {work_experience.start_date}-
                        {work_experience.end_date ?? 'Present'}
                      </p>
                    </div>
                    {userInfo?.user?.id === id && (
                      <div className='ms-auto'>
                        <Link to={`/work_experiences/${work_experience.id}`}>
                          <i className='fas fa-edit p-2 rounded-circle text-dark'></i>
                        </Link>
                        <i
                          className='fas fa-trash p-2 rounded-circle text-danger'
                          onClick={(e) =>
                            handleExperienceDelete(e, work_experience.id)
                          }></i>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className='d-flex justify-content-center align-items-center my-3 py-3 card shadow bg-portfolio flex-row'>
            <div className='d-flex flex-row justify-content-between'>
              <h3 className='px-3'>Skill</h3>
              {userInfo?.user?.id === id && (
                <div>
                  <Link to='/profile/skills'>
                    <i className='fas fa-plus p-2 rounded-circle text-dark'></i>
                  </Link>
                </div>
              )}
            </div>
            {userDetails?.skills?.map((skill) => (
              <Col
                key={skill.id}
                sm={12}
                md={5}
                // lg={4}
                className='d-flex flex-column justify-content-center align-items-start m-1 '>
                <Card className='p-3 rounded shadow' style={{ width: '100%' }}>
                  <div className='d-flex flex-column-reverse flex-md-row justify-content-between'>
                    <div>
                      <h5>{skill.name}</h5>
                      <p>
                        Skill level:{' '}
                        <span className='text-muted fst-italic'>
                          {skill.level}
                        </span>
                      </p>
                      <p>
                        Experience: {skill.experience}
                        {skill.experience > 1 ? ' years' : ' year'}{' '}
                      </p>
                    </div>
                    {userInfo?.user?.id === id && (
                      <div className='ms-auto'>
                        <Link to={`/skills/${skill.id}`}>
                          <i className='fas fa-edit p-2 rounded-circle text-dark'></i>
                        </Link>
                        <i
                          className='fas fa-trash p-2 rounded-circle text-danger'
                          onClick={(e) => handleSkillDelete(e, skill.id)}></i>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className='d-flex justify-content-center align-items-center my-3 py-3 card shadow bg-portfolio flex-row'>
            <div className='d-flex flex-row justify-content-between'>
              <h3 className='px-3'>Reference</h3>
              {userInfo?.user?.id === id && (
                <div>
                  <Link to='/profile/references'>
                    <i className='fas fa-plus p-2 rounded-circle text-dark'></i>
                  </Link>
                </div>
              )}
            </div>
            {userDetails?.references?.map((reference) => (
              <Col
                key={reference.id}
                sm={12}
                md={5}
                // lg={4}
                className='d-flex flex-column justify-content-center align-items-start m-1 '>
                <Card className='p-3 rounded shadow' style={{ width: '100%' }}>
                  <div className='d-flex flex-column-reverse flex-md-row justify-content-between'>
                    <div>
                      <h5>{reference.name}</h5>
                      {reference.portfolio_link && (
                        <p>{reference.portfolio_link}</p>
                      )}
                      <p className='fw-bold fst-italic'>
                        {reference.description}
                      </p>
                      <p className='text-muted'>{reference.date}</p>
                    </div>
                    {userInfo?.user?.id === id && (
                      <div className='ms-auto'>
                        <Link to={`/references/${reference.id}`}>
                          <i className='fas fa-edit p-2 rounded-circle text-dark'></i>
                        </Link>
                        <i
                          className='fas fa-trash p-2 rounded-circle text-danger'
                          onClick={(e) =>
                            handleReferenceDelete(e, reference.id)
                          }></i>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className='d-flex justify-content-center align-items-center my-3 py-3 card shadow bg-portfolio flex-row'>
            <div className='d-flex flex-row justify-content-between'>
              <h3 className='px-3'>Project</h3>
              {userInfo?.user?.id === id && (
                <div>
                  <Link to='/profile/projects'>
                    <i className='fas fa-plus p-2 rounded-circle text-dark'></i>
                  </Link>
                </div>
              )}
            </div>
            {userDetails?.projects?.map((project) => (
              <Col
                key={project.id}
                sm={12}
                md={5}
                // lg={4}
                className='d-flex flex-column justify-content-center align-items-start m-1 '>
                <Card className='p-3 rounded shadow' style={{ width: '100%' }}>
                  <div className='d-flex flex-column-reverse flex-md-row justify-content-between'>
                    <div>
                      <h5>{project.name}</h5>
                      {project.project_link && (
                        <a
                          href={project.project_link}
                          className='text-decoration-none text-dark cursor-pointer fw-bold'
                          target='_blank'
                          rel='noreferrer'>
                          Project Link
                        </a>
                      )}
                      <p className='fw-bold fst-italic'>
                        {project.description}
                      </p>
                      <p>
                        From: {project.start_date}-
                        {project.end_date ?? 'Present'}
                      </p>
                    </div>
                    {userInfo?.user?.id === id && (
                      <div className='ms-auto'>
                        <Link to={`/projects/${project.id}`}>
                          <i className='fas fa-edit p-2 rounded-circle text-dark'></i>
                        </Link>
                        <i
                          className='fas fa-trash p-2 rounded-circle text-danger'
                          onClick={(e) =>
                            handleProjectnDelete(e, project.id)
                          }></i>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Col>
  )
}

export default ProfileScreen
