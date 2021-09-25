import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    repeatedPassword: '',
    errorMessage: '',
    showErrMsg: false,
  }

  navigatingToLoginPage = () => {
    const {history} = this.props
    history.replace('/login')
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeRepeatedPassword = event => {
    this.setState({repeatedPassword: event.target.value})
  }

  setUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  setNewPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="username-input-filed"
          placeholder="Enter Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  setConformPassword = () => {
    const {repeatedPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          CONFORM PASSWORD
        </label>
        <input
          type="password"
          id="conformedPassword"
          className="username-input-filed"
          placeholder="Re-enter Password"
          value={repeatedPassword}
          onChange={this.onChangeRepeatedPassword}
        />
      </>
    )
  }

  onsubmitRegistrationForm = event => {
    event.preventDefault()
    const {repeatedPassword, password, username} = this.state

    if (username === '' || password === '' || repeatedPassword === '') {
      this.setState({
        errorMessage: '* Enter valid input fields',
        showErrMsg: true,
      })
    } else if (password !== repeatedPassword) {
      this.setState({errorMessage: 'Passwords Must be same', showErrMsg: true})
    } else {
      const userDetails = [username, password]
      localStorage.setItem('userDetails', JSON.stringify(userDetails))
      this.setState({errorMessage: '', showErrMsg: false})
    }
  }

  render() {
    const {errorMessage, showErrMsg} = this.state
    const storedUserDetails = localStorage.getItem('userDetails')
    if (storedUserDetails !== null) {
      return <Redirect to="/login" />
    }

    return (
      <div className="register-form-container">
        <h1 className="converter-mobile-header">Currency Converter</h1>
        <img
          src="https://image.freepik.com/free-vector/flat-people-holding-euro-dollar-coins-currency-exchange_88138-568.jpg"
          className="website-image"
          alt="website login"
        />
        <form
          className="registration-form"
          onSubmit={this.onsubmitRegistrationForm}
        >
          <h1 className="converter-desktop-header">Currency Converter</h1>
          <div className="input-container">{this.setUsername()}</div>
          <div className="input-container">{this.setNewPassword()}</div>
          <div className="input-container">{this.setConformPassword()}</div>
          <button type="submit" className="register-button">
            Signup
          </button>
          {showErrMsg && <p className="error-message">{errorMessage}</p>}
          {!showErrMsg && (
            <p className="navigation-tag">
              Already have an account{' '}
              <button
                type="button"
                className="register-navigation-button"
                onClick={this.navigatingToLoginPage}
              >
                click here
              </button>
            </p>
          )}
        </form>
      </div>
    )
  }
}

export default RegisterForm
