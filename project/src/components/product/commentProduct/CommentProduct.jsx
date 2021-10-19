import React, { useState } from 'react';
import {Button,  Comment, Avatar, Form, Input} from 'antd';
import { useDispatch, useSelector }  from 'react-redux'
import './styleComment.scss'
import { replyCommentProduct } from '../../../redux/actions/products'
import { Link } from 'react-router-dom'

const { TextArea } = Input;

const CommentProduct = ({dataComment, dataProduct}) => {

  const user = useSelector(store => store.userReducer.user)
  const dispatch = useDispatch()
  const dataLocal = {...dataComment}
  const [valueComment, setValueComment] = useState('')
  const [showInputComment ,setShowInputComment] = useState(false)

  const handleChangeComment = (e) => {
    setValueComment(e.target.value);
  }

  // xoá rep comment thì truyền thằng index
  const handleSubmitComment =  () => {
    if (valueComment) {
      const newData = {
        idUser: user.id,
        userName: user.name,
        img: user.img,
        comment: valueComment
      }
      dataLocal.replyComment.push(newData);
      dispatch(replyCommentProduct({newData: newData, dataProduct: dataProduct, idComment: dataComment.id}))
      setShowInputComment(false);
      setValueComment('')
    }
  }

  const submitReplyComment = () => {
    setShowInputComment(!showInputComment);
  }

  const  handleCancel =  () => {
    setShowInputComment(false);
  }
  return (
    <>
      <Comment
        className="comment"
        actions={[<span onClick={submitReplyComment} key="comment-nested-reply-to">Reply to</span>]}
        author={<span>{dataLocal.userName}</span>}
        avatar={
          <Avatar
            src={dataLocal.img.length === 0 ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' :  dataLocal.img}
            alt={dataLocal.userName}
          />
        }
        content={
          <p>
            {dataLocal.comment}
          </p>
        }
      >
        { dataLocal.replyComment && (
          dataLocal.replyComment.map((item, index) => {
            return (
              <Comment
                key={index}
                className="comment"
                author={<span>{item.userName}</span>}
                avatar={
                  <Avatar
                    src={item.img.length === 0 ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' : item.img}
                    alt={item.userName}
                  />
                }
                content={
                  <p>
                    {item.comment}
                  </p>
                }
              />
            )
          })
        )}
      </Comment>
      {
        showInputComment && (
          user.id ? (
            <Comment
              className="replyComment"
              avatar={
                <Avatar
                  src={dataLocal.img.length === 0 ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' : dataLocal.img}
                  alt={dataLocal.userName}
                />
              }
              content={
                <div>
                  <Form.Item>
                    <TextArea rows={2} onChange={handleChangeComment} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" onClick={handleSubmitComment} type="primary">
                      reply
                    </Button>
                    <Button onClick={handleCancel} danger >
                      Cancel
                    </Button>
                  </Form.Item>
                </div>
              }
            />
          ) : (
            <div className="notification-login">
              <p>( đăng nhâp để có quyền bình luân <Link to='/login'>Đăng nhập tại đây</Link> )</p>
            </div>
          )
        )
      }
  </>
  );
};

export default CommentProduct
