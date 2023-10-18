import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd'
import { useAuth } from '@/hooks/useAuth'

export default function ArtForm() {
  // 設定路由
  const { auth } = useAuth()
  const router = useRouter()
  const { isReady, query } = router
  const detail_id = query.detail_id
  console.log(router.query.detail_id)

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const { RangePicker } = DatePicker
  const { TextArea } = Input
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const [componentDisabled, setComponentDisabled] = useState(true)
  return (
    <>
      {/* <div className="" style={{ background: 'red', height: '100%' }}>
        2222
      </div> */}
      <div className="container  mb-5  mt-sm-5 mt-3">
        <div className="d-flex justify-content-center">
          {/* 左側欄 */}
          <div className="" style={{ width: 600 }}>
            <div
              className=" border border-1 border-light"
              style={{
                padding: '35px 30px',
                boxShadow: '0 0 0 5px #171717',
              }}
            >
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 600,
                  //   background: 'gray',
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: '分類欄位為必填!',
                    },
                  ]}
                  label="文章分類"
                >
                  <Select>
                    <Select.Option value="cate">開箱文</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: '標題欄位為必填!',
                    },
                  ]}
                  label="標題"
                >
                  <Input
                    placeholder="請輸入文章標題"
                    showCount
                    maxLength={30}
                  />
                </Form.Item>

                <Form.Item
                  label="內容"
                  style={{}}
                  rules={[
                    {
                      required: true,
                      message: '內容欄位為必填!',
                    },
                  ]}
                >
                  <TextArea rows={20} showCount maxLength={1000} />
                </Form.Item>

                <Form.Item
                  label="插入圖片"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        上傳處
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                {/* <Form.Item label="Button">
                  <Button>發佈</Button>
                </Form.Item> */}
              </Form>
              <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary " type="submit">
                  發佈
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}