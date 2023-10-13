import React from 'react'
import { Rate, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function CommentItem({
  user_account,
  avatar_img,
  star,
  created_time,
  comment,
  style,
}) {
  style = JSON.parse(style)
  return (
    <div className="py-2 row w-100 bg-white">
      <div className="col-auto">
        <Avatar src={avatar_img} icon={<UserOutlined />} />
      </div>
      <div className="col d-flex flex-column gap-4">
        <div className="d-flex justify-content-between w-100">
          <div className="vstack gap-2">
            <h5 className="fw-bold text-primary mb-0">
              {/* // 只保留 account 第一個與最後一個字母，中間每個字母替換成 *，有幾個字母就替換幾次 */}
              {user_account}
            </h5>
            <Rate value={star} disabled style={{ fontSize: '14px' }} />
            <div className="d-flex gap-2 text-secondary">
              {style.map((style, index) => (
                <span key={index}>{style}</span>
              ))}
            </div>
          </div>
          <h6 className="text-secondary">{created_time}</h6>
        </div>
        <div
          className="text-dark fs-6 fw-semibold lh-base"
          style={{ wordBreak: 'break-all' }}
        >
          {comment}
        </div>
      </div>
    </div>
  )
}
