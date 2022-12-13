import { request } from 'src/libs/request'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'src/store/user'
import Page from 'src/components/Page'

const LoginPage = (props) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  if (user.id) {
    navigate('/')
  }
  
  const doLogin = () => {
    const email = document.getElementById('user-login-email').value
    const password = document.getElementById('user-login-password').value

    request.post('/user/authenticate', {
      email: email,
      password: password
    }).then(res => {
      dispatch(setUser(res.data.user))
    })
  }

  return (
    <Page>
      <div>
        <label htmlFor="user-login-email">이메일</label>
        <input id="user-login-email" type="email" placeholder="이메일을 입력하시오" />
      </div>
      <div>
        <label htmlFor="user-login-password">암호</label>
        <input id="user-login-password" type="password" placeholder="암호를 입력하시오" />
      </div>
      <div>
        <button onClick={doLogin}>로그인</button>
      </div>
    </Page>
  )
} 

export default LoginPage