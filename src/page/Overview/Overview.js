import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Icon, Input, Button, Table, Card, Drawer, Layout, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import 'antd/dist/antd.css';
import { useAuth } from './../../context/auth'
import FormItem from 'antd/lib/form/FormItem'
import { formatCountdown } from 'antd/lib/statistic/utils'
const { Header } = Layout;

const tailLayout = {
    wrapperCol: {
        offset: 21,
        span: 16,
    },
};
const Overview = () => {
    const [form] = Form.useForm();
    const [datatable, setDatatable] = useState([]);
    const [drawerControl, setDrawerControl] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('');
    const [titletext, settitletext] = useState(' ');
    const [descriptiontext, setddescriptiontext] = useState(' ');
    const [modalinvi, setModalinvi] = useState(false);
    const [modaltext, setModaltext] = useState('');
    const [modaltitle, setModaltitle] = useState('');
    const [modaldes, setModaldes] = useState('');
    const [recordlist, setRecord] = useState({})

    
    const [message, setmessage] = useState('');
    const { authTokens, setAuthTokens } = useAuth()
    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            Key: 'title',
            width: '30%',

            render: text => <a>{text}</a>
        }, {
            title: 'description',
            dataIndex: 'description',
            Key: 'description',
            width: '30%',
            render: text => <a>{text}</a>
        }, {
            title: 'Operator',
            dataIndex: 'Operator',
            Key: 'Operator',
            width: '30%',
            render: (text, record) => [
                <Button type='dashed' onClick={() => OnGoUpdate(record)}>Edit</Button>,
                <Button type="danger" onClick={() => OnGoDelete(record)}>Delete</Button>]
        }
    ];
    useEffect(() => {
        const Callfirst = async () => {
            try {
                const result = await axios.get(`https://candidate.neversitup.com/todo/todos/`, {
                    headers: {
                        Authorization: 'Bearer ' + authTokens.token,
                    }
                })

                setDatatable(result.data)
                setDrawerControl(false)
                console.log('datab', result.data)
            } catch (e) {
                console.log(e)


            }
        }
        Callfirst()
    }, [authTokens.token])
    const onCreate = () => {

        setDrawerControl(true)
        setDrawerTitle('Create')

    }
    const onClose = async () => {
        await form.resetFields();
        await setDrawerControl(false)
        await setddescriptiontext("")
        await settitletext("")
        await setRecord({ title: '', description: '' })
        await setmessage('')
    }
    const onDeleteClick = async (data) => {
        console.log('theitem', data)
        try {
            await axios.delete(`https://candidate.neversitup.com/todo/todos/` + recordlist._id,
                {
                    headers: {
                        Authorization: 'Bearer ' + authTokens.token,
                    }
                }
            )
            const Recall = await axios.get(`https://candidate.neversitup.com/todo/todos/`, {
                headers: {
                    Authorization: 'Bearer ' + authTokens.token,

                }
            }
            )
            setModalinvi(false)
            setDatatable(Recall.data)
            setmessage('Record Deleted')
        } catch (e) {
            console.log(e)
        }
    }
   


    const OnGoUpdate = async data => {
        await form.setFieldsValue({ Title:data.title,Description:data.description})
        await setRecord(data)
        await settitletext(data.title)
        await setddescriptiontext(data.description)
        await setDrawerControl(true)
        await setDrawerTitle('Edit')
    }
    const OnGoDelete = async data => {
        await setModalinvi(true)
        await setRecord(data)
        await setModaltext('Confirm Delete ?')
    }
    const OnCloseModal = async () => {
        await setModalinvi(false)
        await setRecord({})
    }
    const onFinish = async values => {
        console.log(values.Title);
        

        if(drawerTitle === 'Edit'){
            try {
                await axios.put(`https://candidate.neversitup.com/todo/todos/` + recordlist._id, {
                    title: values.Title,
                    description: values.Description
                }
                    , {
                        headers: {
                            Authorization: 'Bearer ' + authTokens.token,
                        }
                    })
                const Recall = await axios.get(`https://candidate.neversitup.com/todo/todos/`, {
                    headers: {
                        Authorization: 'Bearer ' + authTokens.token,
    
                    }
                }
                )
    
                setDatatable(Recall.data)
                setDrawerControl(false)
                setmessage('Record Updated')
                await form.resetFields();
            } catch (e) {
                console.log(e)
            }
        }else if(drawerTitle === 'Create'){
            try {
                await axios.post(`https://candidate.neversitup.com/todo/todos`,
                    {
                        title: values.Title,
                        description: values.Description
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + authTokens.token,
                    }
                })
                const Recall = await axios.get(`https://candidate.neversitup.com/todo/todos/`, {
                    headers: {
                        Authorization: 'Bearer ' + authTokens.token,
    
                    }
                }
                )
    
                await setDatatable(Recall.data)
                await setDrawerControl(false)
                await setddescriptiontext(" ")
                await settitletext(" ")
                await setmessage('Todo Created')
    
    
            } catch (e) {
                console.log(e.response.data.message)
    
            }
        }
      };
    return (
        <div>
            <Card style={{widt:700}} >
                <Button type='primary' style={{ marginBottom: '10px' }}
                    onClick={onCreate}><PlusOutlined />Create</Button>
                <Table
                    columns={columns}
                    dataSource={datatable}
                />
                {message}

            </Card>
            <Drawer
                title={drawerTitle}
                placement="right"
                closable={false}
                onClose={onClose}
                width='40%'
                visible={drawerControl}
            >
                <Form form={form} name="Controlform" onFinish={onFinish}
                
                >
                    <Form.Item
                        label="Title"
                        name="Title"
                        validateFirst='true'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Title!',
                            },
                        ]}
                    >
                        <Input
                          
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Desciption!',
                            },
                        ]}
                    >
                        <Input
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        {drawerTitle === 'Create' ?
                            <Button type="primary" htmlType="submit" >
                                Submit 
        </Button>
                            : <Button type="primary" htmlType="submit" >
                                Update
</Button>
                        }
                    </Form.Item>
                </Form>


            </Drawer>
            <Modal title={modaltext}
                visible={modalinvi}
                onOk={e => onDeleteClick(e.record)}
                onCancel={OnCloseModal}
            >
                <p>{recordlist.title}</p>
                <p>{recordlist.description}</p>

            </Modal>
        </div>
    )
}
export default Overview