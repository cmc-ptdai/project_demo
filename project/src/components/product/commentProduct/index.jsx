import React, { useState } from 'react';
import CommentProduct from './CommentProduct';
import { useDispatch, useSelector }  from 'react-redux'
import { Button,  Comment,Avatar,Form, Input } from 'antd';
import { commentProduct } from '../../../redux/actions/products'
import { v4 as createId } from 'uuid';
import './styleComment.scss'
import { Link } from 'react-router-dom'

const { TextArea } = Input;

const ShowComment = ({data}) => {

  const dispatch = useDispatch()

  const user = useSelector(store => store.userReducer.user)
  const [valueComment, setValueComment] = useState('')

  const handleChangeComment = (e) => {
    setValueComment(e.target.value)
  }

  const handleSubmitComment = () => {
    if (valueComment) {
      const newData = {
        id: createId(),
        idUser: user.id,
        userName: user.name,
        img: user.img,
        comment: valueComment,
        replyComment: []
      }
      data.comments.push(newData)
      dispatch(commentProduct({newData: newData, dataProduct: data}))
      setValueComment('')
    }
  }
  return (
    <>
      {
        data &&
        data.comments.map((item, index) => {
          return <CommentProduct dataComment={item} dataProduct={data} key={index}/>
        })
      }
      <Comment
        avatar={
          user.id && <Avatar
          src={data.img ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' : data.img}
          alt={data.userName}
        />
        }
        content={
          <>
            {
              user.id ? (
                <div>
                  <Form.Item>
                    <TextArea rows={3} onChange={handleChangeComment} value={valueComment}/>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" onClick={handleSubmitComment} type="primary">
                      Add Comment
                    </Button>
                  </Form.Item>
                </div>
              ) : (
                <div className="notification-login">
                  <p>( đăng nhâp để có quyền bình luân <Link to='/login'>Đăng nhập tại đây</Link>)</p>
                </div>
              )
            }
          </>
        }
      />
    </>
  )
}

export default ShowComment;
