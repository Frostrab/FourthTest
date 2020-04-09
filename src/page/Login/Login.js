import React, { useState } from 'react'
import {Link} from "react-router-dom"
import styled, { createGlobalStyle } from 'styled-components'
import { Form, Input, Button, Card } from 'antd'
import { UserOutlined , LockOutlined, LoadingOutlined  } from '@ant-design/icons';
import axios from 'axios'
import { useAuth } from '../../context/auth'
import 'antd/dist/antd.css';
import './Login.css'

// const GlobalStyle = createGlobalStyle`
//   body {
   
//     -webkit-background-size: cover;
//     -moz-background-size: cover;
//     -o-background-size: cover;
//     background-size: cover;
//     display: flex;
//     justify-content: center;
//     align-items: center;
 
    
//   }
// `
const LoginForm = styled.div`
    background-color: #fafafa
    height: auto;
    min-height: 350px
    min-width: 450px
    width: auto
    z-index:2
    border-radius: 8px;
`
const Header = styled.h2`
  padding-top: 25px;
  text-align: center;
`
const LoginFormStyle = styled.div`
  display: flex
  justify-content: center
  margin-top: 50px
`


const Login = props => {
    const [userName, setUserName] = useState()
    const [passWord, setPassWord] = useState()
    const [loading, setLoading] = useState(false)
    const [loginButton, setLoginButton] = useState(false)
    const { setAuthTokens } = useAuth()
    React.useEffect(() => {
        const checkToken = async () => {
            if (!loginButton) {
                if(localStorage.getItem('token')){
                    await setAuthTokens(JSON.parse(localStorage.getItem('token')))
                }
                checkToken();
            }
        }
    }, [
        setAuthTokens,
        loginButton,
    ])

    const Loginprocess = async e => {
        await setLoginButton(true)
        try {
            await setLoading(true)
            const result = await axios.post(`https://candidate.neversitup.com/todo/users/auth`, {
                username: userName,
                password: passWord
            })
            await setAuthTokens(result.data)
            await localStorage.setItem('token',JSON.stringify(result.data))
            console.log('auttoke',result.data)
            await props.history.push('/Overview')
        } catch (e) {
            console.log(e)
          
        }
        await setLoading(false)
    }
    return (
        <span>
            {/* <GlobalStyle /> */}
            <LoginForm>
                <Header>เข้าสู่ระบบ</Header>

                <LoginFormStyle
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Form className="login-form">
                        <Form.Item>
                            <Input
                                prefix={
                                    <UserOutlined
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                        disabled
                                    />
                                }
                                placeholder="Username"
                                size="large"
                                style={{ width: 300 }}
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />

                        </Form.Item>
                        <Form.Item>

                            <Input
                                prefix={
                                    <LockOutlined 
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                        disabled
                                    />
                                }
                                type="password"
                                placeholder="Password"
                                size="large"
                                style={{ width: 300 }}
                                value={passWord}
                                onChange={e => setPassWord(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button
                                onClick={e => Loginprocess(e)}
                                type="primary"
                                width="300px"
                                height="43px"
                            >
                                {loading ? (
                                    <LoadingOutlined 
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 5,
                                            marginRight: 5,
                                        }}
                                    />
                                ) : null}
                    Log in
                  </Button>
                        </Form.Item>
                    </Form>
                </LoginFormStyle>
                
            </LoginForm>
            
           
        </span>


    )
}


export default Login