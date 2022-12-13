import { request } from 'src/libs/request'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from 'src/store/user'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const toLogin = () => {
    navigate('/landing/login')
  }

  const doLogout = () => {
    request.delete('/user/authenticate').then(res => {
      dispatch(removeUser())
    })
  }

  return (
    <header>
      {
        user.id
        ? (
          <div>
            <span>{ user.nick }님 안녕하세요</span>
            <button onClick={doLogout}>로그아웃</button>
          </div>
        )
        : (
          <button onClick={toLogin}>로그인</button>
        )
      }
      
    </header>
  )
}

export default Header