import React, { useState } from 'react';
import {Button,  Comment, Avatar, Form, Input, Popconfirm } from 'antd';
import { useDispatch, useSelector }  from 'react-redux'
import './styleComment.scss'
import {
  replyCommentProduct,
  deleteComment as deleteCommentAction,
  deleteCommentReply as deleteCommentReplyAction
} from '../../../redux/actions/products'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import apiNewComment from '../../../api/apiNewComment'
//import apiUser from '../../../api/userApi'

const { TextArea } = Input;

const CommentProduct = ({dataComment, dataProduct, listUser, data, changeStatus}) => {

  const user = useSelector(store => store.userReducer.user)
  const dispatch = useDispatch()
  const dataLocal = {...dataComment}

  const [valueComment, setValueComment] = useState('')
  const [showInputComment ,setShowInputComment] = useState(false)

  const handleChangeComment = (e) => {
    setValueComment(e.target.value);
  }

  const fetchImg = (id) => {
    let img = ''
    for (let i = 0; i < listUser.length ; i++) {
      if (listUser[i].id === id) {
        img = listUser[i].img;
        break;
      }
    }
    return img;
  }

  const deleteComment = (id) => {
    const newListComment = data.comments.filter(comment => comment.id !== id)
    const newComment = {
      ...data,
      comments: newListComment
    }
    dispatch(deleteCommentAction(newComment))
    changeStatus(id)
  }

  const deleteReplyComment = (id) => {
    const data1 = {...data}
    const newReplyComment = dataLocal.children.filter(comment => comment.id !== id)
    for (let i = 0; i < data1.comments.length; i++) {
      if (data1.comments[i].id === dataLocal.id) {
        data1.comments[i].children = newReplyComment
      }
    }
    dispatch(deleteCommentReplyAction(data1))
    changeStatus(id)
  }

  const handleSubmitComment =  () => {
    if (valueComment) {
      data.comments.forEach((item, index) => {
        if (item.id === dataComment.id) {
          const newDate = new Date()
          const newData = {
            id: uuidv4(),
            idUser: user.id,
            name: user.name,
            comment: valueComment,
            date: newDate
          }
          data.comments[index].children.push(newData);
        }
      })
      const newComment = {
        id : uuidv4(),
        idProduct: data.id,
        idComment: dataLocal.id,
        idUser: user.id,
        date: new Date(),
        name: user.name,
        comment: valueComment
      }
      apiNewComment.addNewComment(newComment)
      dispatch(replyCommentProduct({newData: data, dataProduct: dataProduct.id}))
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

  // const formatDate = (date) => {
  //   return date.slice(0, 10)
  // }

  const cancel = () => {}
  return (
    <>
      <Comment
        className="comment"
        actions={[
          <span onClick={submitReplyComment} key="comment-basic-reply-to">Reply to</span>,
          <Popconfirm
            title="Bạn muốn xoá bình luận này chứ?"
            onConfirm={() => deleteComment(dataLocal.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <span
              key="comment-basic-delete"
              className={dataLocal.idUser !== user.id ? 'display-none' : ''}
            >
              Delete
            </span>
          </Popconfirm>,
          <span key="comment-basic-date"></span>
        ]}
        author={<span>{dataLocal.name}</span>}
        avatar={
          <Avatar
            src={fetchImg(dataComment.idUser) === '' ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' :  fetchImg(dataComment.idUser)}
            alt=""
          />
        }
        content={
          <p>
            {dataLocal.comment}
          </p>
        }
      >
        { dataLocal.children && (
          dataLocal.children.map((item, index) => {
            return (
              <Comment
                key={index}
                actions={[
                  <Popconfirm
                    title="Bạn muốn xoá bình luận này chứ?"
                    onConfirm={() => deleteReplyComment(item.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                  <span
                    key="comment-basic-delete"
                    className={item.idUser !== user.id ? 'display-none' : ''}
                  >
                    Delete
                  </span>
                  </Popconfirm>,
                  <span key="comment-basic-date"></span>
                ]}
                className="comment"
                author={<span>{item.name}</span>}
                avatar={
                  <Avatar
                    src={fetchImg(item.idUser) === '' ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' : fetchImg(item.idUser)}
                    alt=''
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
                  src={user.img === '' ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' : user.img}
                  alt={user.userName}
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
