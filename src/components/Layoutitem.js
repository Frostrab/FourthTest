import React, { useState } from 'react';
import Styled from 'styled-components';
import { useAuth } from '../context/auth'
import 'antd/dist/antd.css';
import { LogoutOutlined, ProfileOutlined  } from '@ant-design/icons'
import { Layout, Menu, Modal ,PageHeader } from 'antd';

const { Header, Content, Footer } = Layout;
const UserLogin = Styled.div`
  margin-right:5px
`;
const styleForAnt = {
    header: {
        background: '#8ea9fa',
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
    },
    icon: {
        marginTop: 20,
        marginLeft: 5,
        fontSize: '20px',
        pointer: 'cursor',
        marginLeft: 20,
        right: {
            fontSize: '20px',
            pointer: 'cursor',
        },
    },
};

const LayoutItem = props => {
    const { authTokens, setAuthTokens } = useAuth()
    const [modinvi, setModinvi] = useState(false);





    const OnOpenLogout = () => {
        setModinvi(true)

    }
    const OnLogout = () => {
        localStorage.clear();
        localStorage.setItem('logout', true)
        setAuthTokens();
    }
    const OnCloseLogout = () => {
        setModinvi(false)
    }
    return (
        <Layout>
            <Header style={styleForAnt.header} >
                <ProfileOutlined style={styleForAnt.icon} />
                <UserLogin>
                   
                    <LogoutOutlined style={styleForAnt.icon.right}

                        onClick={() => OnOpenLogout()}
                    />
                </UserLogin>
            </Header>
            <Content>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {props.children}
                </div>
                <Modal title='Logout'
                    visible={modinvi}
                    onOk={e => OnLogout()}
                    onCancel={OnCloseLogout}
                >
                    <p>Logout Confirm</p>
                </Modal>
            </Content>
        </Layout>
    )
}

export default LayoutItem