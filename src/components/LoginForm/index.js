import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  navigatingToRegisterPage = () => {
    const {history} = this.props
    localStorage.clear()

    history.replace('/')
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const storageObj = localStorage.getItem('userDetails')
    const storageList = JSON.parse(storageObj)

    if (username === '' || password === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: '*Required fields not empty',
      })
    } else if (storageObj === null) {
      this.setState({
        showSubmitError: true,
        errorMsg: '*Account is not invalid',
      })
    } else if (username !== storageList[0]) {
      this.setState({showSubmitError: true, errorMsg: '*Username is invalid'})
    } else if (password !== storageList[1]) {
      this.setState({showSubmitError: true, errorMsg: '*Password is invalid'})
    } else {
      this.setState({showSubmitError: false, errorMsg: ''}, this.goToHomePage)
    }
  }

  goToHomePage = () => {
    const {history} = this.props
    history.replace('/home')
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
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
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <h1 className="converter-mobile-header">Currency Converter</h1>
        <img
          src="https://image.freepik.com/free-vector/flat-people-holding-euro-dollar-coins-currency-exchange_88138-568.jpg"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="converter-desktop-header">Currency Converter</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>

          <button type="button" className="reset-password-btn">
            Forget Password
          </button>

          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}

          <p className="navigation-tag">
            Not have an account{' '}
            <button
              type="button"
              className="register-navigation-button"
              onClick={this.navigatingToRegisterPage}
            >
              click here
            </button>
          </p>
        </form>
      </div>
    )
  }
}

export default LoginForm
